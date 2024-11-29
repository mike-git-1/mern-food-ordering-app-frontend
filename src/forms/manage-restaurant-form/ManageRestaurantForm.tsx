import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import DetailsSection from "./DetailsSection"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import CuisinesSection from "./CuisinesSection"
import MenuSection from "./MenuSection"
import ImageSection from "./ImageSection"
import { Button } from "@/components/ui/button"
import LoadingButton from "@/components/LoadingButton"
import { Restaurant } from "@/types"
import { useEffect } from "react"

// Defining front end validation using zod by defining a schema for our data
// You can validate any object structure, whether it comes from a form, an API request, or some other data source.
const formSchema = z
  .object({
    // min 1 character (no empty strings or spaces)
    restaurantName: z.string({
      required_error: "Restaurant name is required",
    }),
    city: z.string({
      required_error: "City is required",
    }),
    country: z.string({
      required_error: "Country is required",
    }),
    // coerce fn converts string value we get for delivery price into a number
    deliveryPrice: z.coerce.number({
      required_error: "Delivery price is required",
      invalid_type_error: "must be a valid number",
    }),
    // coerce fn converts string value we get for delivery time into a number
    estimatedDeliveryTime: z.coerce.number({
      required_error: "Estimated delivery time is required",
      invalid_type_error: "must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "Please select at least one item",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "Name is required"),
        price: z.coerce.number().min(1, "price is required"),
      })
    ),
    // not a form field, but a property from our restaurant object returned by our API
    imageUrl: z.string().optional(),
    // ensures imageFile has a file in it
    imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
  })
  // refine() method is used to create custom validation logic that goes beyond the built-in validators. It allows you to run a function and perform more complex validations.
  // data= our Schema, automatically passed
  // the validator: checks if either the imageUrl or imageFile field is provided.
  .refine((data) => data.imageUrl || data.imageFile, {
    // error message that will be displayed if the custom validation fails.
    message: "Either image URL or image File must be provided",
    //specifies which field to highlight in case of validation failure
    path: ["imaegFile"],
  })

// define the typescript type
// using zod framework to automatically infer/determine the typescript type based on form schema
// basically it will detect that all our form inputs should be of the type as per our schema.
// (hover over restaurantFormData)
type RestaurantFormData = z.infer<typeof formSchema>

type Props = {
  // of type FormData (multipart form data format)
  onSave: (restaurantFormData: FormData) => void
  isLoading: boolean
  // restaurant optional since a restaurant may not have been created yet
  // of type 'Restaurant' defined in types.js
  restaurant?: Restaurant
}

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
  // initialize a form using useForm hook from react-hook
  // this form will be of type restaurantFormData which has all the fields we want to capture
  const form = useForm<RestaurantFormData>({
    // passing in options: zodResolver for validations.
    // basically connecting our react-hook-form with our zod validations
    resolver: zodResolver(formSchema),
    // an array field in React Hook Form is initialized as undefined. This can lead to issues with validation, rendering, and form interaction.
    // provide default values for the arrays
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  })

  // runs on first load and everytime we get a new restaurant from the props
  // prepopulates the fields
  // When we sent data back to the backedn, our prices were converted into cents. Now we convert it back to dollars to display properly
  useEffect(() => {
    // case when a user hasnt created a restaurant yet
    if (!restaurant) {
      return
    }

    // convert delivery price to $dollars
    const deliveryPriceFormatted = parseInt(
      (restaurant.deliveryPrice / 100).toFixed(2)
    )

    // updating the prices inside the menuItems array
    // returns a new array, that copies the same object properties on each iteration but overrides the price property
    // to be in dollar format
    const menuItemsFormatted = restaurant.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }))

    // update the restaurant object with the formatted prices
    // creating a new object by copying the old values but overriding the deliverprice and menuitems
    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    }
    // resets the form with the updated restaurant values
    form.reset(updatedRestaurant)
    // useEffect runs every time restaurant updates
  }, [form, restaurant])

  // convert the javascript formdata obj to multiform FormData obj to send to backend
  // usually we convert to JSON, but here we use FormData format instead
  // FormData is useful for multipart form data, where fields contain different types of data (files, text, etc.).
  // You can append both regular fields and file inputs to FormData, making it ideal for handling form submissions that involve files.
  // react-hook handleSubmit automatically provides the form data to onSubmit
  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData()
    // add each key value pairs to formData
    // convert everything to strings if not already as http requests only handles strings
    formData.append("restaurantName", formDataJson.restaurantName)
    formData.append("city", formDataJson.city)
    formData.append("country", formDataJson.country)
    // converting price to cents because it makes it easier to send values to stripe + maintain consistency
    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    )
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    )
    // for arrays, must append each element individually
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine)
    })
    // for arrays of objects, must append each element individually
    // e.g: menuItem[i][name] : italian
    // e.g: menuItem[i][price] : 100
    formDataJson.menuItems.forEach((menuItem, index) => {
      // for menuItem name
      formData.append(`menuItems[${index}][name]`, menuItem.name)
      // for menuItem price
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      )
    })

    // since imageFile is optional, it can be undefined and typescript will complain. Check first before appending.
    if (formDataJson.imageFile) {
      formData.append("imageFile", formDataJson.imageFile)
    }

    //send to backend
    onSave(formData)
  }

  return (
    // shadcn form wrapper. Spread and Pass in 'form' to tie shadcn with react-hook-form
    <Form {...form}>
      {/* 'handleSubmit' provided by react-hook-form. When form is submitted, 'handleSubmit will validate our data.
      if data passes validation, it will call onSubmit fn which wll handle the submission logic */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        // spacing between form inputs
        className="space-y-8 bg-gray-50 rounded-lg p-10"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {/* isLoading obtained from the API request. If loading, render the isLoading button, otherwise, render a submit button */}
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  )
}

export default ManageRestaurantForm

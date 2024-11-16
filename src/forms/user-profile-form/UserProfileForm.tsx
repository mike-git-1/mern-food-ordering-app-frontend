import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import LoadingButton from "@/components/LoadingButton"
import { User } from "@/types"
import { useEffect } from "react"

// defining front end form validation using zod by defining a schema for our form inputs
// matches the 'name' attribute of the form input
const formSchema = z.object({
  // optional because email field will be read-only and should not be included in any validation
  email: z.string().optional(),
  // min 1 character (no empty strings or spaces)
  name: z.string().min(1, "Name is required"),
  addressLine1: z.string().min(1, "Address Line 1 is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country Line 1 is required"),
})

// define the typescript type
// using zod framework to automatically infer/determine the typescript type based on form schema
// basically it will detect that all our form inputs should be a string as per our schema.
// (hover over UserFormData)
type UserFormData = z.infer<typeof formSchema>

// definining the prop types
type Props = {
  // for preppopulating fields
  currentUser: User
  // pass an onsave function that accepts 'userProfileData' (of type UserFormData)
  // returns void
  onSave: (userProfileData: UserFormData) => void
  isLoading: boolean
}

const UserProfileForm = ({ onSave, isLoading, currentUser }: Props) => {
  // initialize a form using useForm hook from react-hook
  // this form will be of type UserFormData which has all the fields we want to capture
  // passing in options: zodResolver for validations.
  // basically connecting our react-hook-form with our zod validations
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    // how we pre populate the fields. Assigning the default values of the inputs to be whatever is defined in the 'currentUser' object when the form loads
    // currentUser conforms to the form schema
    defaultValues: currentUser,
  })

  // reset() from react-hook. Resets the form (re-render) whenever 'currentUser' or 'form' changes
  // will update the form fields with the latest do'currentUser' values
  useEffect(() => {
    form.reset(currentUser)
  }, [currentUser, form])

  return (
    // passing our react-hook form properties to the shadcn form component, linking them together
    <Form {...form}>
      {/* 'handleSubmit' provided by react-hook-form. When form is submitted, 'handleSubmit will validate our data.
      if data passes validation, it will call onSave fn which wll handle the submission logic */}
      <form
        onSubmit={form.handleSubmit(onSave)}
        // spacing between form inputs
        className="space-y-4 bg-gray-50 rounded-lg md:p-10"
      >
        <div>
          <h2 className="text-2xl font-bold">User Profile Form</h2>
          {/* from shadcn */}
          <FormDescription>
            View and change your profile information here
          </FormDescription>
        </div>
        {/* from shadcn */}
        <FormField
          // control prop from react-hook-form. specifying that this form input is connected to our react-hook-form we defined
          control={form.control}
          // the key where this form data will be stored
          name="email"
          // render prop from react-hook-form is a function that automatically receives an object containing the 'field' property,
          // which is used to connect form inputs with our react-hook-form state
          // has all the necessary props to integrate the form field with React Hook Form.
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                {/* Field property includes: field.name, field.value, field.onChange....etc.. */}
                {/* By spreading {...field} onto the Input component, you automatically bind all of these props to the input field. 
                 Allows React Hook Form to control the value of this input and track its changes.*/}
                {/* disabled since email field should be readonly */}
                <Input {...field} disabled className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          // control prop from react-hook-form. specifying that this form input is connected to our react-hook-form we defined
          control={form.control}
          // the key where this form data will be stored
          name="name"
          // render prop from react-hook-form is a function that automatically receives an object containing the 'field' property,
          // which is used to connect form inputs with our react-hook-form state
          // has all the necessary props to integrate the form field with React Hook Form.
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                {/* Field property allows React Hook Form to control the value of this input and track its changes.*/}
                <Input {...field} className="bg-white" />
              </FormControl>
              {/* displays any mssages contained in 'field' property. E.g If in error state, it will display the errpr message defined in our zod schema
              this is shadcn, zod, and react-hook-form working together */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* column layout on mobile */}
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            // control prop from react-hook-form. specifying that this form input is connected to our react-hook-form we defined
            control={form.control}
            // the key where this form data will be stored
            name="addressLine1"
            // render prop from react-hook-form is a function that automatically receives an object containing the 'field' property,
            // which is used to connect form inputs with our react-hook-form state
            // has all the necessary props to integrate the form field with React Hook Form.
            render={({ field }) => (
              // take up available space
              <FormItem className="flex-1">
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  {/* Field property allows React Hook Form to control the value of this input and track its changes.*/}
                  <Input {...field} className="bg-white" />
                </FormControl>
                {/* displays any mssages contained in 'field' property. E.g If in error state, it will display the errpr message defined in our zod schema
              this is shadcn, zod, and react-hook-form working together */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            // control prop from react-hook-form. specifying that this form input is connected to our react-hook-form we defined
            control={form.control}
            // the key where this form data will be stored
            name="city"
            // render prop from react-hook-form is a function that automatically receives an object containing the 'field' property,
            // which is used to connect form inputs with our react-hook-form state
            // has all the necessary props to integrate the form field with React Hook Form.
            render={({ field }) => (
              // take up available space
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  {/* Field property allows React Hook Form to control the value of this input and track its changes.*/}
                  <Input {...field} className="bg-white" />
                </FormControl>
                {/* displays any mssages contained in 'field' property. E.g If in error state, it will display the errpr message defined in our zod schema
              this is shadcn, zod, and react-hook-form working together */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            // control prop from react-hook-form. specifying that this form input is connected to our react-hook-form we defined
            control={form.control}
            // the key where this form data will be stored
            name="country"
            // render prop from react-hook-form is a function that automatically receives an object containing the 'field' property,
            // which is used to connect form inputs with our react-hook-form state
            // has all the necessary props to integrate the form field with React Hook Form.
            render={({ field }) => (
              // take up available space
              <FormItem className="flex-1">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  {/* Field property allows React Hook Form to control the value of this input and track its changes.*/}
                  <Input {...field} className="bg-white" />
                </FormControl>
                {/* displays any mssages contained in 'field' property. E.g If in error state, it will display the errpr message defined in our zod schema
              this is shadcn, zod, and react-hook-form working together */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* if loading, then load the loading button, otherwise, load a regular button */}
        {/* isLoading from props */}
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="bg-orange-500">
            Submit
          </Button>
        )}
      </form>
    </Form>
  )
}

export default UserProfileForm

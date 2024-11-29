import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

const DetailsSection = () => {
  // this component will be nested in the parent component ManageRestaurantForm.tsx
  // so this hook allows this child component to access the control object from the parent where useForm was initially created.
  // useful because we dont need to pass the control prop down.
  const { control } = useFormContext()

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Details</h2>
        <FormDescription>
          Enter the details about your restaurant
        </FormDescription>
      </div>
      {/* control attribute links this component to the react-hook-form */}
      <FormField
        control={control}
        name="restaurantName"
        // What you want to render
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              {/* registers the input with the react-hook-form library */}
              <Input {...field} className="bg-white" />
            </FormControl>
            {/* displays any mssages contained in 'field' property. E.g If in error state, it will display the errpr message defined in our zod schema
              this is shadcn, zod, and react-hook-form working together */}
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex flex-col md:flex-row gap-4">
        <FormField
          control={control}
          name="city"
          // What you want to render
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>City</FormLabel>
              <FormControl>
                {/* registers the input with the react-hook-form library */}
                <Input {...field} className="bg-white" />
              </FormControl>
              {/* displays any mssages contained in 'field' property. E.g If in error state, it will display the errpr message defined in our zod schema
              this is shadcn, zod, and react-hook-form working together */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="country"
          // What you want to render
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Country</FormLabel>
              <FormControl>
                {/* registers the input with the react-hook-form library */}
                <Input {...field} className="bg-white" />
              </FormControl>
              {/* displays any mssages contained in 'field' property. E.g If in error state, it will display the errpr message defined in our zod schema
              this is shadcn, zod, and react-hook-form working together */}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name="deliveryPrice"
        // What you want to render
        render={({ field }) => (
          // input will be smaller - take 25% of width
          <FormItem className="max-w-[25%]">
            <FormLabel>Delivery price ($)</FormLabel>
            <FormControl>
              {/* registers the input with the react-hook-form library */}
              <Input {...field} className="bg-white" placeholder="1.50" />
            </FormControl>
            {/* displays any mssages contained in 'field' property. E.g If in error state, it will display the errpr message defined in our zod schema
              this is shadcn, zod, and react-hook-form working together */}
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="estimatedDeliveryTime"
        // What you want to render
        render={({ field }) => (
          // input will be smaller - take 25% of width
          <FormItem className="max-w-[25%]">
            <FormLabel>Estimated delivery time (minutes)</FormLabel>
            <FormControl>
              {/* registers the input with the react-hook-form library */}
              <Input {...field} className="bg-white" placeholder="30" />
            </FormControl>
            {/* displays any mssages contained in 'field' property. E.g If in error state, it will display the errpr message defined in our zod schema
              this is shadcn, zod, and react-hook-form working together */}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default DetailsSection

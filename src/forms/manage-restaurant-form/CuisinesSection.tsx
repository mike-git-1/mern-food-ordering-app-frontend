import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import { cuisineList } from "@/config/restaurant-options-config"
import { useFormContext } from "react-hook-form"
import CuisineCheckbox from "./CuisineCheckbox"

const CuisinesSection = () => {
  // this component will be nested in the parent component ManageRestaurantForm.tsx
  // so this hook allows this child component to access the control object from the parent where useForm was initially created.
  // useful because we dont need to pass the control prop down.
  const { control } = useFormContext()

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <FormDescription>
          Select the cuisines that your restaurant serves
        </FormDescription>
      </div>
      <FormField
        // links this component with react-hook-form
        control={control}
        name="cuisines"
        // What you want to render
        render={({ field }) => (
          // main FormItem (contains all the checkboxes)
          <FormItem>
            {/* checkboxes arranged in 5 col grid on larger screens */}
            <div className="grid md:grid-cols-5 gap-1">
              {/* map through each option and render a custom checkbox component */}
              {cuisineList.map((cuisineItem) => (
                // pass the field as a prop so we can register the checkbox inputs to the rest of the form
                <CuisineCheckbox cuisine={cuisineItem} field={field} />
              ))}
            </div>
            {/* displays any mssages contained in 'field' property. E.g If in error state, it will display the errpr message defined in our zod schema
              this is shadcn, zod, and react-hook-form working together */}
            {/* Form message applied to the main FormItem section  */}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default CuisinesSection

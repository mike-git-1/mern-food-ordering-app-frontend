import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

// typescripting props
type Props = {
  index: number
  removeMenuItem: () => void
}

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  // this component will be nested in the parent component ManageRestaurantForm.tsx
  // so this hook allows this child component to access the control object from the parent where useForm was initially created.
  // useful because we dont need to pass the control prop down.
  const { control } = useFormContext()

  return (
    <div className="flex flex-row items-end gap-2">
      <FormField
        // links this component with react-hook-form
        control={control}
        // give it a dynamic name using the index, so reacthook knows which one to delete
        name={`menuItems.${index}.name`}
        // What you want to render
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Name
              {/* if any errors, displays it next to the label. It will display the errpr message defined in our zod schema*/}
              <FormMessage />
            </FormLabel>
            <FormControl>
              {/* links this input with the component */}
              <Input
                {...field}
                placeholder="Cheese Pizza"
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        // links this component with react-hook-form
        control={control}
        // give it a dynamic name using the index, so reacthook knows which one to delete
        name={`menuItems.${index}.price`}
        // What you want to render
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Price ($)
              {/* if any errors, displays it next to the label. It will display the errpr message defined in our zod schema*/}
              <FormMessage />
            </FormLabel>
            <FormControl>
              {/* links this input with the component which links to react-hook-form*/}
              <Input {...field} placeholder="8.00" className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />
      {/* when clicked, it will remove this item in the field array which will cause a re-render and remove the item from the form */}
      <Button
        type="button"
        onClick={removeMenuItem}
        className="bg-red-500 max-h-fit"
      >
        Remove
      </Button>
    </div>
  )
}

export default MenuItemInput

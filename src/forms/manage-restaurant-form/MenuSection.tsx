import { Button } from "@/components/ui/button"
import { FormDescription, FormField, FormItem } from "@/components/ui/form"
import { useFieldArray } from "react-hook-form"
import { useFormContext } from "react-hook-form"
import MenuItemInput from "./MenuItemInput"

const MenuSection = () => {
  // this component will be nested in the parent component ManageRestaurantForm.tsx
  // so this hook allows this child component to access the control object from the parent where useForm was initially created.
  // useful because we dont need to pass the control prop down.
  const { control } = useFormContext()

  // useFieldArray from react-hook-form allows you to easily add, remove, and manipulate array-like form data.
  // field = cuurent state of menuitem array
  // append = method that allows you to add a new item to the field array
  // remove = method that allows you to remove an item from field array
  const { fields, append, remove } = useFieldArray({
    control,
    // the key that will hold the array
    name: "menuItems",
  })

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Menu</h2>
        <FormDescription>
          Create your menu and give each item a name and a price
        </FormDescription>
      </div>
      <FormField
        // links this component with react-hook-form
        control={control}
        name="menuItems"
        // what you want ot render
        render={() => (
          <FormItem className="flex flex-col gap-2">
            {/* render each menu item component. We're not interacting with each specific element in the array, only using the index  */}
            {fields.map((item, index) => (
              <MenuItemInput
                key={item.id}
                index={index}
                // removes item @ current index
                removeMenuItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />
      {/* when clicked, it will add blank fields to the field array which will re-render the form with new blank fields that the user can fill out */}
      <Button type="button" onClick={() => append({ name: "", price: "" })}>
        Add Menu Item
      </Button>
    </div>
  )
}

export default MenuSection

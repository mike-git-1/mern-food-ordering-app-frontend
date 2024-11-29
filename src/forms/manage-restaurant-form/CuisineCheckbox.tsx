import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormItem, FormLabel } from "@/components/ui/form"
import { ControllerRenderProps, FieldValues } from "react-hook-form"

type Props = {
  cuisine: string
  // field is of this type from react-hook-form
  field: ControllerRenderProps<FieldValues, "cuisines">
}

const CuisineCheckbox = ({ cuisine, field }: Props) => {
  return (
    // each checkbox will be inside an individual FormItem component
    // so that eaach checbox can trigger validation
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        {/* from shadcn */}
        <Checkbox
          className="bg-white"
          // 'checked' provided by shadcn.
          // field.value will contain an array of all the items that the user has checked so far
          // if this current checkbox is included in that array, then have it be 'checked'
          checked={field.value.includes(cuisine)}
          // onCheckedChange is a handler provided by ShadCN checkbox component
          // runs whenever the checkbox state changes - accepts boolean as arg

          // NOTE: 'checked' and 'isChecked' are not always the same because change is asychrnous!
          //  'isChecked' is based on the current (LIVE) user interaction,
          //  'checked' checks the old state

          // 1. Check a box: field.onChange is triggered which updates the state. The state update is asynchronous, meaning React doesn't immediately reflect the new state
          //    during the same render cycle.
          // 2. checked={field.value.includes(cuisine)} evaluates to false since its still using the old state
          // 3. When React updates the state, it triggers a re-render of the component,
          // 4. checked={field.value.includes(cuisine)} now evaluates to true since state has been udpated. The checkbox now reflects the latest value in field.value
          onCheckedChange={(isChecked) => {
            // if checked, add the current cuisine to the field.value array using the field.onChange fn from react-hook
            if (isChecked) {
              field.onChange([...field.value, cuisine])
              // if unchecked, filter out the current cuisine form the field.value array
            } else {
              field.onChange(
                field.value.filter((value: string) => value !== cuisine)
              )
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  )
}

export default CuisineCheckbox

import { cuisineList } from "@/config/restaurant-options-config"
import { Label } from "./ui/label"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { ChangeEvent } from "react"
import { Button } from "./ui/button"

type Props = {
  onChange: (cuisines: string[]) => void
  selectedCuisines: string[]
  isExpanded: boolean
  onExpandedClick: () => void
}

const CuisineFilter = ({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandedClick,
}: Props) => {
  // automatically pass the event obj of type ChangeEvent<HTMLInputElement> (from react) for checkboxes
  //
  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    // get the value of the clicked checkbox, which we defined as the name of the cuisine
    const clickedCuisine = event.target.value
    // checks if this checkbox is checked or not
    const isChecked = event.target.checked

    // if this checkbox is checked, create a new selectedCuisines array including this cuisine that was checked
    // otherwise, remove it from the array
    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine)

    // pass newCuisinesList to the parent to be updated by passing it to onChange prop
    onChange(newCuisinesList)
  }

  // when Reset Filters is clicked, update cuisines to an empty array to indicate no cuisines have been selected
  const handleCuisinesReset = () => onChange([])

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semi-bold mb-2">Filter by Cuisines</div>
        <div
          onClick={handleCuisinesReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset Filters
        </div>
      </div>
      {/* cuisineList from our config file containing our complete list of cuisines */}
      <div className="space-y-2 flex flex-col">
        {cuisineList
          // slices the cuisineList depending on whether "View more" was clicked or not.
          // if expanded, show the full listm 0--> cuisineList.length
          // if not, show only the first 0-->7 results
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine) => {
            // checking if the cuisines that were selected by the user (selectedCuisines) includes this current cuisine
            const isSelected = selectedCuisines.includes(cuisine)
            return (
              // render each cuisines a a checkbox
              <div className="flex">
                <input
                  // unqiue id tied to label
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  // hide the default checkbox because we are styling our own checkbox
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisinesChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  // styling our label as a checkbox.
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? // if this label/checkbox is selected, style a green border, otherwise, slate
                        "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {/* if this label/checkbox is selected, show a checkmark component from lucide */}
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            )
          })}
        {/* the button to expand/collapse the cuisines filter */}
        <Button
          // updates the isExpanded state
          onClick={onExpandedClick}
          // styled to look like a link
          variant="link"
          className="mt-4 flex-1"
        >
          {/* if expanded, show option to view less */}
          {isExpanded ? (
            <span className="flex flex-row items-center">
              View Less <ChevronUp />
            </span>
          ) : (
            // if not xpanded, show option to view more
            <span className="flex flex-row items-center">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  )
}

export default CuisineFilter

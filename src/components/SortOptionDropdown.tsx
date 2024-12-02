import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"

type Props = {
  onChange: (value: string) => void
  // the currently selected option
  sortOption: string
}

const SORT_OPTIONS = [
  {
    // what the user sees
    label: "Best match",
    // what we store
    value: "bestMatch",
  },
  {
    // what the user sees
    label: "Delivery Price",
    // what we store in the backend
    value: "deliveryPrice",
  },
  {
    // what the user sees
    label: "Estimated delivery time",
    // what we store in the backend
    value: "estimatedDeliveryTime",
  },
]

const SortOptionDropdown = ({ onChange, sortOption }: Props) => {
  // used to get the correponding label for sortOption from the SORT_OPTIONS array for displaying on the button.
  // if for whatever reason cannot find a match, default to the first label (realistically should never occur but typescript will complain)
  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
    SORT_OPTIONS[0].label

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        {/* buttons displays the currently selected sort option */}
        <Button variant="outline" className="w-full">
          Sort by: {selectedSortLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            className="cursor-pointer"
            // updates the state on the parent
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SortOptionDropdown

import { MenuItem } from "../types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

type Props = {
  menuItem: MenuItem
  addToCart: () => void
}

const MenuItemCard = ({ menuItem, addToCart }: Props) => {
  return (
    <Card onClick={addToCart} className="cursor-pointer">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {menuItem.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        {/* price stored as cents, convert to dollars */}$
        {(menuItem.price / 100).toFixed(2)}
      </CardContent>
    </Card>
  )
}

export default MenuItemCard

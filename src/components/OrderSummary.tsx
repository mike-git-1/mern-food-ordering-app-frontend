import { CartItem } from "@/pages/DetailPage"
import { Restaurant } from "@/types"
import { CardHeader, CardTitle, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { Trash } from "lucide-react"

type Props = {
  restaurant: Restaurant
  cartItems: CartItem[]
  removeFromCart: (cartItem: CartItem) => void
}

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
  // calculates the total cost of the user's cart order
  // reduce takes the result of the fn, and uses it as 'total' for the next iteration. The end result is whats returned, Essentially summing results
  // 0 is initial value of result  - start @ 0
  const getTotalCost = () => {
    const totalInDollars = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    )
    const totalWithDelivery = totalInDollars + restaurant.deliveryPrice
    // convert to dollars
    return (totalWithDelivery / 100).toFixed(2)
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          {/* calculates the total cost of the order */}
          <span>${getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {/* renders each cart item */}
        {cartItems.map((item) => (
          <div className="flex justify-between">
            <span>
              {/* the quantity of the item in a badge component */}
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {/* item name */}
              {item.name}
            </span>
            {/* the price */}
            <span className="flex items-center gap-1">
              <Trash
                className="cursor-pointer"
                color="red"
                size={20}
                // removes this cart item from state which re-renders the UI
                onClick={() => removeFromCart(item)}
              />
              {/* calculate the total price, convert to dollars */}$
              {((item.price * item.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          {/* price stored as cents, convert to dollars */}
          <span>${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  )
}

export default OrderSummary

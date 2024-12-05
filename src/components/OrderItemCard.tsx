import { Order, OrderStatus } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Separator } from "./ui/separator"
import { Badge } from "./ui/badge"
import { Label } from "./ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { ORDER_STATUS } from "@/config/order-status-config"
import { useUpdateMyRestaurantOrder } from "@/api/MyRestaurantApi"
import { useEffect, useState } from "react"

type Props = {
  order: Order
}

const OrderItemCard = ({ order }: Props) => {
  // CUSTOM hook used to update the order status after choosing an option from teh dropdown
  const { updateRestaurantStatus, isLoading } = useUpdateMyRestaurantOrder()

  //store status in state
  // whenever this component receives the order prop, it will initialize the usestate hook with the status in that order on first load
  // used to sync the change in status with the UI
  const [status, setStatus] = useState<OrderStatus>(order.status)

  //  everytime this component receives a new order prop, re-render UI with new status in the dropdown
  useEffect(() => {
    setStatus(order.status)
  }, [order.status])

  // fn for calling our hook
  const handleStatusChange = async (newStatus: OrderStatus) => {
    await updateRestaurantStatus({
      orderId: order._id as string,
      status: newStatus,
    })
    // update state, re-render UI with new status in the dropdown when dropdown changes
    setStatus(newStatus)
  }

  const getTime = () => {
    const orderDateTime = new Date(order.createdAt)
    const date = orderDateTime.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    const hours = orderDateTime.getHours()
    const minutes = orderDateTime.getMinutes()
    // if minutes is less than 10, then prefix with a '0'
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes

    return `${date} ${hours}:${paddedMinutes}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          {" "}
          <div>
            Customer Name:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div>
            Delivery address:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </span>
          </div>
          <div>
            Time:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>
          <div>
            Total Cost:
            {/* convert cents to dollars */}
            <span className="ml-2 font-normal">
              ${(order.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((cartItem) => (
            <span>
              <Badge variant="outline" className="mr-2">
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col space-y-1 5">
          <Label htmlFor="status">What is the status of this order?</Label>
          {/* onValueChange shadcn prop handles the event when the value of the select dropdown changes. The value represents the new selected value and is automatically passed. */}
          {/* disable the dropdown while its loading */}
          <Select
            // used to keep the value of the state in sync with the value of dropdown
            value={status}
            disabled={isLoading}
            onValueChange={(value) => handleStatusChange(value as OrderStatus)}
          >
            {/* id links this select input with the label */}
            {/* placeholder is the default value */}
            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            {/* popper just means dynamically position the dropdown items to ensure it opens correctly below the trigger */}
            <SelectContent position="popper">
              {/* using ORDER_STATUS from our config file to populate the dropdown items */}
              {ORDER_STATUS.map((status) => (
                <SelectItem value={status.value}>{status.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}

export default OrderItemCard

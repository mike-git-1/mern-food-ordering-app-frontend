import { Order } from "@/types"
import { Progress } from "./ui/progress"
import { ORDER_STATUS } from "@/config/order-status-config"

type Props = {
  order: Order
}

const OrderStatusHeader = ({ order }: Props) => {
  // fn to get expected delivery time by adding the date the order was created at + the estiamted delivery time
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt)
    const date = created.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    // modiyfing the minutes for the date
    created.setMinutes(
      // getting the minutes portion of the date and adding the delivery time.
      // e.g. if created= 2024-12-04 10:30 AM and estimatedDeliveryTime = 45mins. Then created.setMinutes(30 + 45)
      // Since 75 minutes is more than 60, the Date object will automatically adjust the time.
      // The new time will be 11:15 AM (the 75 minutes will add 1 hour and 15 minutes to the original 10:30 AM).
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    )

    // converting date into a string that we can display
    const hours = created.getHours()
    const minutes = created.getMinutes()
    // if minutes is less than 10, then prefix with a '0'
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes

    return `${date} ${hours}:${paddedMinutes}`
  }

  // ORDER_STATUS: List of the different order statues and their corresponding prrogressbar values defined in config file
  // getting the corresponding config object of the specificed status so that we can dynamically display the correct label and progressbar in the UI
  const getOrderStatusInfo = () => {
    return ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
  }

  return (
    <>
      {/* col layout on mobile, row on desktop */}
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <span className="">Order Status: {getOrderStatusInfo().label}</span>
        <span>Expected by: {getExpectedDelivery()}</span>
      </h1>
      {/* add a pulsing effect to progress bar */}
      <Progress
        className="animate-pulse"
        value={getOrderStatusInfo().progressValue}
      />
    </>
  )
}

export default OrderStatusHeader

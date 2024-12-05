import { useGetMyOrders } from "@/api/OrderApi"
import OrderStatusDetail from "@/components/OrderStatusDetail"
import OrderStatusHeader from "@/components/OrderStatusHeader"
import { AspectRatio } from "@/components/ui/aspect-ratio"

const OrderStatusPage = () => {
  // our custom hook used to getch the orders for the logged in user
  const { orders, isLoading } = useGetMyOrders()

  if (isLoading) {
    return <span>Loading...</span>
  }

  // checking if orders is undefined or empty
  if (!orders || orders.length === 0) {
    return <span>No orders found...</span>
  }

  return (
    <div className="space-y-10">
      {orders.map((order) => (
        <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order} />
            {/* ensures image stays a consistent size (16/5) no matter the size of img */}
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                className="rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderStatusPage

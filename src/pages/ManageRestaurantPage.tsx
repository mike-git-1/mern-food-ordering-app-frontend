import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi"
import OrderItemCard from "@/components/OrderItemCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"

const ManageRestaurantPage = () => {
  // our custom hook for creating a new restaurant. Renaming isLoading
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant()
  // our custom hook for getting a users restaurant for prepopulating fields
  const { restaurant } = useGetMyRestaurant()
  // our custom hook for updating a new restaurant. Renaming is Loading
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant()
  // our custom hook for updating a new restaurant. Renaming is Loading
  const { orders } = useGetMyRestaurantOrders()

  // double !! used to convert value into a boolean
  // if isEditing is true, it mean a restaurant already exists (true) which means this request is for updating a restaurant
  // otherwise, a restaarant doesn't exist (undefined) which means this request is for creating a new restaurant
  // used to condiionally pass the onSave prop
  const isEditing = !!restaurant

  return (
    // creating two tabs using shadcn
    // default to the orders tab when the page loads
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      {/* value of tabstrigger must match tabscontent so that when the trigger (tab) is clicked, it will open the correspnding content */}
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 pg-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      {/* value of tabstrigger must match tabscontent so that when the trigger (tab) is clicked, it will open the correspnding content */}
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          restaurant={restaurant}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          // logical OR operator: returns true if at least one of the conditions is true.
          // simpler way to set the isLoading prop
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  )
}

export default ManageRestaurantPage

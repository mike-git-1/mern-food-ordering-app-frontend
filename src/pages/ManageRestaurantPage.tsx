import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi"
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

  // double !! used to convert value into a boolean
  // if isEditing is true, it mean a restaurant already exists (true) which means this request is for updating a restaurant
  // otherwise, a restaarant doesn't exist (undefined) which means this request is for creating a new restaurant
  // used to condiionally pass the onSave prop
  const isEditing = !!restaurant

  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={isEditing ? updateRestaurant : createRestaurant}
      // logical OR operator: returns true if at least one of the conditions is true.
      // simpler way to set the isLoading prop
      isLoading={isCreateLoading || isUpdateLoading}
    />
  )
}

export default ManageRestaurantPage

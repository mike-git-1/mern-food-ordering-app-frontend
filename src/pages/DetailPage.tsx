import { useGetRestaurant } from "@/api/RestaurantApi"
import MenuItemCard from "@/components/MenuItemCard"
import OrderSummary from "@/components/OrderSummary"
import RestaurantInfo from "@/components/RestaurantInfo"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardFooter } from "@/components/ui/card"
import { useState } from "react"
import { MenuItem } from "../types"
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm"
import { useParams } from "react-router-dom"
import CheckoutButton from "@/components/CheckoutButton"
import { useCreateCheckoutSession } from "@/api/OrderApi"

export type CartItem = {
  _id: string
  name: string
  price: number
  quantity: number
}

const DetailPage = () => {
  // get the parameters from the url (:restaurantId) defined in AppRoutes.tsx
  const { restaurantId } = useParams()
  // our custom hook for getting a users restaurant for prepopulating fields
  const { restaurant, isLoading } = useGetRestaurant(restaurantId)
  // our custom hook for getting the checkout session from stripe for the user
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession()

  // store cartItems to state, uses initializer fn to either populate state on re-load with the cartItems stored in sessionStorage, OR, an empty array if none stored in session
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`)
    return storedCartItems ? JSON.parse(storedCartItems) : []
  })

  // used to add to cart and update the state (when user clicks on a  menu item to add to cart)
  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prev) => {
      // check if item is already in cart by checking matches for ids between the previous cart and the menuitem that was clicked on
      // if theres a match, store it in existingCartItem
      const existingCartItem = prev.find(
        (cartItem) => cartItem._id === menuItem._id
      )

      let updatedCartItems

      // if yes, update quantity for that specific item
      if (existingCartItem) {
        updatedCartItems = prev.map((cartItem) =>
          cartItem._id === menuItem._id
            ? // return the item with the udpated qty
              { ...cartItem, quantity: cartItem.quantity + 1 }
            : // return the same untouched item for the rest
              cartItem
        )
      } else {
        // if not in the cart already, add it as a new item
        updatedCartItems = [
          ...prev,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ]
      }

      // also save it to sessionStorage under the key `cartItems-${restaurantId}`
      // since after logging in, when the user is redirected back to the page, they will lose all of their menuItems that was saved in state.
      // use sessionStorage to re-add them back. Once the tab is closed, the data is cleared (vs localStorage where data persists after closing the tab)
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      )

      // new state
      return updatedCartItems
    })
  }

  // remove from cart (when a user clicks on trash can icon next to an item)
  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prev) => {
      // return the same array except with the specified cartItem removed
      const updatedCartItems = prev.filter((item) => cartItem._id !== item._id)

      // also save cartItems to sessionStorage under the key `cartItems-${restaurantId}`
      // since after logging in, when the user is redirected back to the page, they will lose all of their menuItems that was saved in state.
      // use sessionStorage to re-add them back. Once the tab is closed, the data is cleared (vs localStorage where data persists after closing the tab)
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      )
      return updatedCartItems
    })
  }

  const onCheckout = async (userFormData: UserFormData) => {
    // unlikely, but typescript will complain since restaurant can be undefiend
    if (!restaurant) {
      return
    }

    // construct the data that will be sent to backend
    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        // explicitly cast as string since email was optional in our validations
        email: userFormData.email as string,
      },
    }

    const data = await createCheckoutSession(checkoutData)
    // after API request resolves, it returns the url
    // send the user to this URL which is the checkout page hosted on stripe
    window.location.href = data.url
  }

  // if still loading and waiting for the restaurant object to populate, display loading text
  if (isLoading || !restaurant) {
    return <span>Loading...</span>
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        {/* allow cropping */}
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      {/* two col grid on medium screens, 1st col takes up 4/6 of the space and 2nd col takes 2/6 */}
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32 ">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {/* render each menu item card */}
          {restaurant.menuItems.map((menuItem) => (
            <MenuItemCard
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DetailPage

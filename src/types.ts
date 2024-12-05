// properties that we expect to get back when we make a getMyUserRequest
// export these typescritps types so that we can use them in our components and typescript doesnt get confused about what type 'User' is

import { string } from "zod"

// key note: mongo _id is of type ObjectId on the backend, but when it gets to the front end, its going to be a string
export type User = {
  _id: string
  email: string
  name: string
  addressLine1: string
  city: string
}

// properties that we expect to get back when we make a createMyRestaurantRequest
// export these typescritps types so that we can use them in our components and typescript doesnt get confused about what type 'Restaurant' is
// key note: mongo _id is of type ObjectId on the backend, but when it gets to the front end, its going to be a string
export type Restaurant = {
  _id: string
  user: string
  restaurantName: string
  city: string
  country: string
  deliveryPrice: number
  estimatedDeliveryTime: number
  cuisines: string[]
  // menuItems is a complex object made with type: [menuItemSchema] in the schema
  // so we must define a type for MenuItem
  menuItems: MenuItem[]
  imageUrl: string
  // date objects are returned as strings from the backend. Need to convert back to a date obj manually
  lastUpdate: string
}

export type MenuItem = {
  _id: string
  name: string
  price: number
}

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered"

// properties that we expect to get back when we make a createSeachRequest
export type Order = {
  _id: string
  // data will be an array of type 'Restaurant' (defined above)
  restaurant: Restaurant
  // data will be an array of type 'User' (defined above)
  user: User
  cartItems: {
    menuItemId: string
    name: string
    quantity: string
  }[] // indicates cartItems is an array
  deliveryDetails: {
    name: string
    addressLine1: string
    city: string
    email: string
  }
  totalAmount: number
  // data will be a definitive list of strings (defined above)
  // reccall that status was defined in the order model using  enum: ["placed", "paid", "inProgress", "outForDelivery", "delivered"],
  status: OrderStatus
  // date objects are returned as strings from the backend. Need to convert back to a date obj manually
  createdAt: string
  restaurantId: string
}

// properties that we expect to get back when we make a getMyOrdersRequest
export type RestaurantSearchResponse = {
  // data will be an array of type 'Restaurant' (defined above)
  data: Restaurant[]
  pagination: {
    total: number
    page: number
    pages: number
  }
}

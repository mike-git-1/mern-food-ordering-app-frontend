// properties that we expect to get back when we make a getMyUserRequest
// export these typescritps types so that we can use them in our components and typescript doesnt get confused about what type 'User' is
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

// properties that we expect to get back when we make a createSeachRequest
export type RestaurantSearchResponse = {
  // data will be an array of type 'Restaurant' (defined above)
  data: Restaurant[]
  pagination: {
    total: number
    page: number
    pages: number
  }
}

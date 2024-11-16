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

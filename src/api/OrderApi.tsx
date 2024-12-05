import { Order } from "@/types"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

// what we expect to get in the checkout sessin request passed to this API, an object. define the types
type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string
    name: string
    quantity: string
  }[] // indicates that cartItems that we received from req.body is going to be in an array
  deliveryDetails: {
    email: string
    name: string
    addressLine1: string
    city: string
  }
  restaurantId: string
}

// base api url from env variable e.g. for development http://localhost:7000 (our server)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// creating a custom hook that our components can use to call to get a logged in users orders
export const useGetMyOrders = () => {
  // allows frontend to get the auth0 token from the auth0 server
  const { getAccessTokenSilently } = useAuth0()

  // when the response is returned (returns a javascript obj), we have to define the type or typescript will get confused
  // here we are specifying that this async function will return a promise which resolves to an array of 'Order' objects
  // this uses typescript type checking to enforce that the data returned by the async will be of type 'Order' which we defined in types.ts file.
  const getMyOrdersRequest = async (): Promise<Order[]> => {
    // get the token from auth0
    const accessToken = await getAccessTokenSilently()
    // 2nd parameter is an object of options
    // sending a GET request to our /api/order endpint.
    const response = await fetch(`${API_BASE_URL}/api/order`, {
      method: "GET",
      // specifies to server what type to expect in the body of the response
      headers: {
        // send token to backend for authorization
        Authorization: `Bearer ${accessToken}`,
      },
    })

    // if the response failed, throw an error
    if (!response.ok) {
      throw new Error("Failed to get orders")
    }

    // if success, parse response into javascript obj. (Our API returns response as JSON)
    // (note: json() behaves differently on server vs client-side. On server, it parses data into JSON, on client-side it parases into a javascript obj)
    return response.json()
  }
  //extract data property and rename as 'orders'. 'data' holds the result from our fetch call, getMyOrdersRequest
  const { data: orders, isLoading } = useQuery(
    "fetchMyOrders",
    getMyOrdersRequest,
    // this query will run every 5s, causing a re-render of the component
    // this is so that the customer is periodically updated with the status of their delivery without having to refresh the page
    { refetchInterval: 5000 }
  )

  return {
    orders,
    isLoading,
  }
}

// creating a custom hook that our components can call to go to stripe checkout page
export const useCreateCheckoutSession = () => {
  // allows frontend to get the auth0 token from the auth0 server
  const { getAccessTokenSilently } = useAuth0()

  // when the response is returned (returns a javascript obj), we have to define the type or typescript will get confused
  // here we are specifying that this async function will return a promise which resolves to a 'Restaurant' object
  // this uses typescript type checking to enforce that the data returned by the async will be of type 'Restaurant' which we defined in types.ts file.
  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    // get the token
    const accessToken = await getAccessTokenSilently()
    // 2nd parameter is an object of options
    // sending a POST request to the stripe endpoint
    const response = await fetch(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        // specifies to server what type to expect in the body of the response
        headers: {
          // send token to backend for authorization
          Authorization: `Bearer ${accessToken}`,
          // tells server what type to expect in the body
          "Content-Type": "application/json",
        },
        // pass the JSON body to the request.
        body: JSON.stringify(checkoutSessionRequest),
      }
    )

    // if the response failed, throw an error
    if (!response.ok) {
      throw new Error("Unable to create checkout session")
    }

    // if success, parse response into javascript obj. (Our API returns response as JSON)
    // (note: json() behaves differently on server vs client-side. On server, it parses data into JSON, on client-side it parases into a javascript obj)
    // contains our session url
    return response.json()
  }

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest)

  //if mutation hook returns error, it will call a success toast component (from main.tsx). (from shadcn sonner library).
  if (error) {
    toast.error(error.toString())
    // after toast triggers, error is reset so its not constantly triggering
    reset()
  }

  return {
    createCheckoutSession,
    isLoading,
  }
}

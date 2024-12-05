import { useAuth0 } from "@auth0/auth0-react"
import { useMutation } from "react-query"
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

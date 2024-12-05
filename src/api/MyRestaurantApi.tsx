// for interacting with our backend

import { Order, Restaurant } from "@/types"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

// NOTE: Unlike useQuery, which is used for fetching data (GET), useMutation is used when you want to send data to the server or trigger an action
// (like creating, updating, or deleting a resource e.g. PUT, POST, DELETE requests).)

// base api url from env variable e.g. for development http://localhost:7000 (our server)
//(prefixed with VITE_, indicating they are being used in a Vite project).
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// creating a custom hook that our components can use to call this endpoint to get a users restaurant
export const useGetMyRestaurant = () => {
  // allows frontend to get the auth0 token from the auth0 server
  const { getAccessTokenSilently } = useAuth0()

  // when the response is returned (returns a javascript obj), we have to define the type or typescript will get confused
  // here we are specifying that this async function will return a promise which resolves to a 'Restaurant' object
  // this uses typescript type checking to enforce that the data returned by the async will be of type 'Restaurant' which we defined in types.ts file.
  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    // get the token from auth0
    const accessToken = await getAccessTokenSilently()
    // 2nd parameter is an object of options
    // sending a GET request to our /api/my/user endpint
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      // specifies to server what type to expect in the body of the response
      headers: {
        // typical way of including an authorization token in the headers of an HTTP request to authenticate the user when making API calls.
        // sent to backend to prove that the request is coming from an authenticated user and is authorized to access this API
        Authorization: `Bearer ${accessToken}`,
      },
    })

    // if the response failed, throw an error
    if (!response.ok) {
      throw new Error("Failed to get restaurant")
    }

    // if success, parse response into javascript obj. (Our API returns response as JSON)
    // (note: json() behaves differently on server vs client-side. On server, it parses data into JSON, on client-side it parases into a javascript obj)
    return response.json()
  }

  // from react query
  // passing fetch request to the useQuery hook which will mangage things like loading, errors, data
  // extracting the properties using destructuring
  const {
    data: restaurant, //extract data property and rename as 'restaurant'. 'data' holds the result from our fetch call, getMyRestaurantRequest
    isLoading,
  } = useQuery("fetchMyRestaurant", getMyRestaurantRequest) // giving our query a name "fetchMyRestaurant"

  // allow components to use
  return {
    restaurant,
    isLoading,
  }
}

// creating a custom hook that our components can use to call this endpoint to create a new restaurant
export const useCreateMyRestaurant = () => {
  // allows frontend to get the auth0 token from the auth0 server
  const { getAccessTokenSilently } = useAuth0()

  // when the response is returned (returns a javascript obj), we have to define the type or typescript will get confused
  // here we are specifying that this async function will return a promise which resolves to a 'Restaurant' object
  // this uses typescript type checking to enforce that the data returned by the async will be of type 'Restaurant' which we defined in types.ts file.
  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    // get the token
    const accessToken = await getAccessTokenSilently()
    // 2nd parameter is an object of options
    // sending a POST request to our /api/my/user endpint
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/`, {
      method: "POST",
      // specifies to server what type to expect in the body of the response
      headers: {
        // typical way of including an authorization token in the headers of an HTTP request to authenticate the user when making API calls.
        // sent to backend to prove that the request is coming from an authenticated user and is authorized to access this API
        Authorization: `Bearer ${accessToken}`,
      },
      // pass the body to the request. request body will already be in the correct format (multipart FormData)
      body: restaurantFormData,
    })

    // if the response failed, throw an error
    if (!response.ok) {
      throw new Error("Failed to create restaurant")
    }

    // if success, parse response into javascript obj. (Our API returns response as JSON)
    // (note: json() behaves differently on server vs client-side. On server, it parses data into JSON, on client-side it parases into a javascript obj)
    return response.json()
  }

  // from react query
  // passing fetch request to the useMutation hook which will mangage things like loading, errors, success states
  // extracting the properties using destructuring
  // mutate is simply the method provided by the useMutation hook to trigger/call the mutation function, in this case, createMyUserRequest.
  // (mutate and mutateAsync are similar, the only difference is that mutateAsync returns a promise)
  // we renamed it to 'createRestaurant'
  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurantRequest)

  //if mutation hook returns isSuccess, it will call a success toast component (from main.tsx). (from shadcn sonner library).
  if (isSuccess) {
    toast.success("Restaurant Created!")
  }

  // if mutation hooks returns error, call an error toast component (from main.tsx). (error provided by mutation hook - not one we defined)
  if (error) {
    toast.error("Unable to create restaurant")
  }
  // allow components to use
  return { createRestaurant, isLoading }
}

// creating a custom hook that our components can use to call this endpoint to update a restaurant
export const useUpdateMyRestaurant = () => {
  // allows frontend to get the auth0 token from the auth0 server
  const { getAccessTokenSilently } = useAuth0()

  // when the response is returned (returns a javascript obj), we have to define the type or typescript will get confused
  // here we are specifying that this async function will return a promise which resolves to a 'Restaurant' object
  // this uses typescript type checking to enforce that the data returned by the async will be of type 'Restaurant' which we defined in types.ts file.
  const updateMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    // get the token
    const accessToken = await getAccessTokenSilently()
    // 2nd parameter is an object of options
    // sending a PUT request to our /api/my/user endpint
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/`, {
      method: "PUT",
      // specifies to server what type to expect in the body of the response
      headers: {
        // typical way of including an authorization token in the headers of an HTTP request to authenticate the user when making API calls.
        // sent to backend to prove that the request is coming from an authenticated user and is authorized to access this API
        Authorization: `Bearer ${accessToken}`,
      },
      // pass the body to the request. request body will already be in the correct format (multipart FormData)
      body: restaurantFormData,
    })

    // if the response failed, throw an error
    if (!response.ok) {
      throw new Error("Failed to update restaurant")
    }

    // if success, parse response into javascript obj. (Our API returns response as JSON)
    // (note: json() behaves differently on server vs client-side. On server, it parses data into JSON, on client-side it parases into a javascript obj)
    return response.json()
  }

  // from react query
  // passing fetch request to the useMutation hook which will mangage things like loading, errors, success states
  // extracting the properties using destructuring
  // mutate is simply the method provided by the useMutation hook to trigger/call the mutation function, in this case, createMyUserRequest.
  // (mutate and mutateAsync are similar, the only difference is that mutateAsync returns a promise)
  // we renamed it to 'createRestaurant'
  const {
    mutate: updateRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(updateMyRestaurantRequest)

  //if mutation hook returns isSuccess, it will call a success toast component (from main.tsx). (from shadcn sonner library).
  if (isSuccess) {
    toast.success("Restaurant Updated!")
  }

  // if mutation hooks returns error, call an error toast component (from main.tsx). (error provided by mutation hook - not one we defined)
  if (error) {
    toast.error("Unable to update restaurant")
  }

  // allow components to use
  return { updateRestaurant, isLoading }
}

// creating a custom hook that our components can use to get a logged in users orders for their restaurant
export const useGetMyRestaurantOrders = () => {
  // allows frontend to get the auth0 token from the auth0 server
  const { getAccessTokenSilently } = useAuth0()

  // when the response is returned (returns a javascript obj), we have to define the type or typescript will get confused
  // here we are specifying that this async function will return a promise which resolves to an array 'Order' objects
  // this uses typescript type checking to enforce that the data returned by the async will be of type 'Order' which we defined in types.ts file.
  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    // get the token from auth0
    const accessToken = await getAccessTokenSilently()
    // 2nd parameter is an object of options
    // sending a GET request to our /api/my/restaurant/order` endpint
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
      method: "GET",
      // specifies to server what type to expect in the body of the response
      headers: {
        // tsend auth token to backend for authorization
        Authorization: `Bearer ${accessToken}`,
        // tells server what type to expect in the body
        "Content-Type": "application/json",
      },
    })

    // if the response failed, throw an error
    if (!response.ok) {
      throw new Error("Failed to get fetch orders")
    }

    // if success, parse response into javascript obj. (Our API returns response as JSON)
    // (note: json() behaves differently on server vs client-side. On server, it parses data into JSON, on client-side it parases into a javascript obj)
    return response.json()
  }

  const {
    data: orders, //extract data property and rename as 'orders'. 'data' holds the result from our fetch call, getMyRestaurantOrdersRequest
    isLoading,
  } = useQuery("fetchMyRestaurantOrders", getMyRestaurantOrdersRequest) // giving our query a name "fetchMyRestaurantOrders"

  // allow components to use
  return {
    orders,
    isLoading,
  }
}

// what we expect the component to pass to this request
type UpdateOrderStatusRequest = {
  orderId: string
  status: string
}

// creating a custom hook that our components can use to update the status of an order as an owner of a restaurant
export const useUpdateMyRestaurantOrder = () => {
  // allows frontend to get the auth0 token from the auth0 server
  const { getAccessTokenSilently } = useAuth0()

  const updateMyRestaurantOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    // get the token
    const accessToken = await getAccessTokenSilently()
    // 2nd parameter is an object of options
    // sending a PATCH request to our /api/my/user endpint
    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        // specifies to server what type to expect in the body of the response
        headers: {
          // send auth token to backend for authorization
          Authorization: `Bearer ${accessToken}`,
          // tells server what type to expect in the body
          "Content-Type": "application/json",
        },
        // pass the body to the request. request body will already be in the correct format (multipart FormData)
        body: JSON.stringify({ status: updateStatusOrderRequest.status }),
      }
    )

    // if the response failed, throw an error
    if (!response.ok) {
      throw new Error("Failed to update status")
    }

    // if success, parse response into javascript obj. (Our API returns response as JSON)
    // (note: json() behaves differently on server vs client-side. On server, it parses data into JSON, on client-side it parases into a javascript obj)
    return response.json()
  }

  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyRestaurantOrder)

  //if mutation hook returns isSuccess, it will call a success toast component (from main.tsx). (from shadcn sonner library).
  if (isSuccess) {
    toast.success("Order Updated!")
  }

  // if mutation hooks returns error, call an error toast component (from main.tsx). (error provided by mutation hook - not one we defined)
  // reset error state so that the error doesnt appear for every re-render of the page
  if (error) {
    toast.error("Unable to update order")
    reset()
  }

  // allow components to use
  return { updateRestaurantStatus, isLoading }
}

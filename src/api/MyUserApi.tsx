// for interacting with our backend

import { User } from "@/types"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

// NOTE: Unlike useQuery, which is used for fetching data (GET), useMutation is used when you want to send data to the server or trigger an action
// (like creating, updating, or deleting a resource e.g. PUT, POST, DELETE requests).)

// base api url from env variable e.g. for development http://localhost:7000 (our server)
//(prefixed with VITE_, indicating they are being used in a Vite project).
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// creating a custom hook that our components can use to call this endpoint to get current user
export const useGetMyUser = () => {
  // allows frontend to get the auth0 token from the auth0 server
  const { getAccessTokenSilently } = useAuth0()

  // when the response is returned (returns a javascript obj), we have to define the type or typescript will get confused
  // here we are specifying that this async function will return a promise which resolves to a 'User' object
  // this uses typescript type checking to enforce that the data returned by the async will be of type 'User' which we defined in types.ts file.
  const getMyUserRequest = async (): Promise<User> => {
    // get the token from auth0
    const accessToken = await getAccessTokenSilently()
    // 2nd parameter is an object of options
    // sending a GET request to our /api/my/user endpint
    const response = await fetch(`${API_BASE_URL}/api/my/user/`, {
      method: "GET",
      // specifies to server what type to expect in the body of the response
      headers: {
        // typical way of including an authorization token in the headers of an HTTP request to authenticate the user when making API calls.
        // sent to backend to prove that the request is coming from an authenticated user and is authorized to access this API
        Authorization: `Bearer ${accessToken}`,
        // content type often not necessary for get request since the request does not include body
        "Content-Type": "application/json",
      },
    })

    // if the response failed, throw an error
    if (!response.ok) {
      throw new Error("Failed to fetch user")
    }

    // if success, parse response into javascript obj. (Our API returns response as JSON)
    // (note: json() behaves differently on server vs client-side. On server, it parses data into JSON, on client-side it parases into a javascript obj)
    return response.json()
  }

  // from react query
  // passing fetch request to the useQuery hook which will mangage things like loading, errors, data
  // extracting the properties using destructuring
  const {
    data: currentUser, //extract data property and rename as 'currentUser'. 'data' holds the result from our fetch call, "getMyUserRequest"
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest) // giving our query a name "fetchCurrentUser"

  // if query hook returns error, call an error toast component (from main.tsx). (error provided by query hook - not one we defined)
  if (error) {
    toast.error(error.toString())
  }

  // allow components to use
  return {
    currentUser,
    isLoading,
  }
}

// define custom type using typescript
// defines the structure of the 'user' reqeust object
// with two properties: auth0Id and email
type CreateUserRequest = {
  auth0Id: string
  email: string
}

// creating a custom hook that our components can use to call this endpoint to create new user
export const useCreateMyUser = () => {
  // allows frontend to get the auth0 token from the auth0 server
  const { getAccessTokenSilently } = useAuth0()

  const createMyUserRequest = async (user: CreateUserRequest) => {
    // get the token from auth0
    const accessToken = await getAccessTokenSilently()
    // 2nd parameter is an object of options
    // sending a POST request to our /api/my/user endpint
    const response = await fetch(`${API_BASE_URL}/api/my/user/`, {
      method: "POST",
      // specifies to server what type to expect in the body of the request
      headers: {
        // typical way of including an authorization token in the headers of an HTTP request to authenticate the user when making API calls.
        // sent to backend to prove that the request is coming from an authenticated user and is authorized to access this API
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      // pass the body to the request. Must be JSON as defined in the 'content-type'
      // recall stringify converts a JavaScript object into a JSON string
      body: JSON.stringify(user),
    })

    // if the response failed, throw an error
    if (!response.ok) {
      throw new Error("Failed to create user")
    }
  }

  // from react query
  // passing fetch request to the useMutation hook which will mangage things like loading, errors, success states
  // extracting the properties using destructuring
  // mutateAsync is simply the method provided by the useMutation hook to trigger/call the mutation function, in this case, createMyUserRequest.
  // we renamed it to 'createUser'
  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest)

  // allow components to use
  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  }
}

// define custom type using typescript
// defines the structure of the 'formData' reqeust object
type UpdateMyUserRequest = {
  name: string
  addressLine1: string
  city: string
  country: string
}

// creating a custom hook that our components can use to update user and display a toast
export const useUpdateMyUser = () => {
  // allows frontend to get the auth0 token from the auth0 server
  const { getAccessTokenSilently } = useAuth0()

  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    // get the token from auth0
    const accessToken = await getAccessTokenSilently()
    // 2nd parameter is an object of options
    // sending a PUT request to our /api/my/user endpoint
    const response = await fetch(`${API_BASE_URL}/api/my/user/`, {
      method: "PUT",
      // specifies to server what type to expect in the body of the request
      headers: {
        // typical way of including an authorization token in the headers of an HTTP request to authenticate the user when making API calls.
        // sent to backend to prove that the request is coming from an authenticated user and is authorized to access this API
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      // pass the body to the request. Must be JSON as defined in the 'content-type'
      // recall stringify converts a JavaScript object into a JSON string
      body: JSON.stringify(formData),
    })

    // if the response failed, throw an error
    if (!response.ok) {
      throw new Error("Failed to update user")
    }

    return response.json()
  }
  // from react query
  // passing fetch request to the useMutation hook which will mangage things like loading, errors, success states
  // extracting the properties using destructuring
  // mutateAsync is simply the method provided by the useMutation hook to trigger/call the mutation function, in this case, createMyUserRequest.
  // we renamed it to 'updateUser'
  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest)

  //handle toasts within this hook. why? anytime user makes a request to update their profile, this hook can handle success/failures easily.
  // The component doesnt need to handle the logic - more clean

  //if mutation hook returns isSuccess, it will call a success toast component (from main.tsx). (from shadcn sonner library).
  if (isSuccess) {
    toast.success("User profile updated!")
  }

  // if mutation hooks returns error, call an error toast component (from main.tsx). (error provided by mutation hook - not one we defined)
  if (error) {
    toast.error(error.toString())
    reset() //clears the error state from request so that it doesnt appear every time the component re-renders for whatever reason
  }

  // allow components to use
  return {
    updateUser,
    isLoading,
    // isSuccess,
    // isError,
    // error,
    // reset
  }
}

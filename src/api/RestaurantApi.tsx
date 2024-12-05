import { SearchState } from "@/pages/SearchPage"
import { Restaurant, RestaurantSearchResponse } from "@/types"
import { useQuery } from "react-query"

// base api url from env variable e.g. for development http://localhost:7000 (our server)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// to get specific restaurant for displaying details page
// will accept the restaurantId string from the params. Make optional because whenever the hooks load for the first, the useParams hook might not have the params yet and return undefined
export const useGetRestaurant = (restaurantId?: string) => {
  // when the response is returned (returns a javascript obj), we have to define the type or typescript will get confused
  // here we are specifying that this async function will return a promise which resolves to a 'Restaurant' object
  // this uses typescript type checking to enforce that the data returned by the async will be of type 'Restaurant' which we defined in types.ts file.
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    // 2nd parameter of options not required since, we dont need authorization token to access this endpoint, and is GET by default
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`
    )

    // if the response failed, throw an error
    if (!response.ok) {
      throw new Error("Failed to get restaurant")
    }

    return response.json()
  }

  // from react query
  // passing fetch request to the useQuery hook which will mangage things like loading, errors, data
  // extracting the properties using destructuring
  const {
    data: restaurant, // 'data' holds the result from our fetch call 'getRestaurantByIdRequest'
    isLoading,
  } = useQuery("fetchRestaurant", getRestaurantByIdRequest, {
    // options object, this query wont run if 'restaurantId' is undefined. Prevents this query from being triggered on first render when restauratnId from useParams may be undefiend
    enabled: !!restaurantId,
  })

  return {
    restaurant,
    isLoading,
  }
}

// will accept the city string from the params. Make optional because whenever the hooks load for the first, the useParams hook is going to return undefined.
export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  // when the response is returned (returns a javascript obj), we have to define the type or typescript will get confused
  // here we are specifying that this async function will return a promise which resolves to a 'RestaurantSearchResponse' object
  // this uses typescript type checking to enforce that the data returned by the async will be of type 'RestaurantSearchResponse' which we defined in types.ts file.
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    // The URLSearchParams object is a helpful tool for constructing query parameters strings for a URL
    const params = new URLSearchParams()
    params.set("searchQuery", searchState.searchQuery)
    // convert page to string from number
    params.set("page", searchState.page.toString())
    // convert selectedCuisines[] to a comma separated string
    params.set("selectedCuisines", searchState.selectedCuisines.join(","))
    params.set("sortOption", searchState.sortOption)

    // 2nd parameter of options not required since, we dont need authorization token to access this endpoint, and is GET by default
    const response = await fetch(
      // append the query params to the URL
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    )

    // if the response failed, throw an error
    if (!response.ok) {
      throw new Error("Failed to get restaurant")
    }

    return response.json()
  }

  // from react query
  // passing fetch request to the useQuery hook which will mangage things like loading, errors, data
  // extracting the properties using destructuring
  const {
    data: results, // 'data' holds the result from our fetch call, createSearchRequest
    isLoading,
    // Query Key: When searchState changes, the query will automatically re-run.
    // e.g. whenever searchState changes, React Query automatically triggers a new API request, ensuring your component has the latest data.
  } = useQuery(["searchRestaurants", searchState], createSearchRequest, {
    // options object, this query wont run if 'city' is undefined.  Prevents this query from being triggered on first render when city from useParams may be undefiend
    enabled: !!city,
  })

  return {
    results,
    isLoading,
  }
}

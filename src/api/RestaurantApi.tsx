import { SearchState } from "@/pages/SearchPage"
import { RestaurantSearchResponse } from "@/types"
import { useQuery } from "react-query"

// base api url from env variable e.g. for development http://localhost:7000 (our server)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

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
    // sending a GET request to our /api/my/user endpint
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
    // options object, this query wont run if 'city' is undefined
    enabled: !!city,
  })

  return {
    results,
    isLoading,
  }
}

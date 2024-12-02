import { useSearchRestaurants } from "@/api/RestaurantApi"
import CuisineFilter from "@/components/CuisineFilter"
import PaginationSelector from "@/components/PaginationSelector"
import SearchBar, { SearchForm } from "@/components/SearchBar"
import SearchResultCard from "@/components/SearchResultCard"
import SearchResultInfo from "@/components/SearchResultInfo"
import SortOptionDropdown from "@/components/SortOptionDropdown"
import { useState } from "react"
import { useParams } from "react-router-dom"

// typescript type
export type SearchState = {
  // user input in search bar
  searchQuery: string
  page: number
  selectedCuisines: string[]
  sortOption: string
}

const SearchPage = () => {
  // get the parameters from the url (:city) defined inAappRoutes.tsx
  const { city } = useParams()
  // store searchQuery in state. Of type 'SearchState'. Default value of "" when page loads
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  })

  // store isExpanded in state
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  // our custom hook for getting the filtered restaurants
  const { results, isLoading } = useSearchRestaurants(searchState, city)

  // updates the state with the new sortOPtion (when user selects a sort option from the dropdown)
  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }))
  }

  // updates the state with the new selectedCuisines (when user checks off cuisines to filter)
  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }))
  }

  // updates the state with the new current page (when user navigates between pages)
  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }))
  }

  // onSubmit prop. Accepts searchFormData: SearchForm as defined per the SearchBar component
  // when user makes a search, state will update (searchState).
  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      // whenever a user makes a new search, returns the user to the first page
      page: 1,
    }))
  }

  // onReset prop.
  // when user clicks reset/clear, state will update (searchState).
  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }))
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  // if no data in the results, display no results founds
  // normally we should always have a city param because its defined in AppRoutes but jsut to be safe, we check.
  if (!results?.data || !city) {
    return <span>No results found</span>
  }

  return (
    // single col grid on mobile screens, 2 column grid on larger with 1st col 250px and 2nd col taking remaining space.
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          // toggles the isExpandedstate whenn clicking 'show more filter'
          onExpandedClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          onSubmit={setSearchQuery}
          placeHolder="Search by Cuisine or Restaurant Name"
          onReset={resetSearch}
          searchQuery={searchState.searchQuery}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>
        {/* render each restaurant in a restaurant card component */}
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}

export default SearchPage

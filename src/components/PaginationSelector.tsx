import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination"

// defining props for this component
type Props = {
  page: number
  pages: number
  onPageChange: (page: number) => void
}

const PaginationSelector = ({ page, pages, onPageChange }: Props) => {
  const pageNumbers = []
  // generating an array of pageNumbers
  // e.g if pages =3, pageNumbers = [1,2,3]
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i)
  }

  return (
    // shadcn pagination component
    <Pagination>
      <PaginationContent>
        {/*  if current page is NOT the first page, render the PREV btn */}
        {page !== 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              // when prev btn is clicked, updates the current page number.
              onClick={() => onPageChange(page - 1)}
            />
          </PaginationItem>
        )}

        {/* rendering the navigation page numbers */}
        {pageNumbers.map((number) => (
          <PaginationItem>
            {/* for each nav page number, when clicked, will update the current page number */}
            <PaginationLink
              href="#"
              onClick={() => onPageChange(number)}
              // styling the active state when a page number is clicked
              isActive={page === number}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        {/* if current page is NOT the last page, render the NEXT btn */}
        {page !== pageNumbers.length && (
          <PaginationItem>
            {/* when next btn is clicked, updates the current page number. */}
            <PaginationNext href="#" onClick={() => onPageChange(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationSelector

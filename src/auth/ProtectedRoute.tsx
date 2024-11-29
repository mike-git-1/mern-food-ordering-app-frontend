import { useAuth0 } from "@auth0/auth0-react"
import { Navigate, Outlet } from "react-router-dom"

// responsible for checking if a user is logged in. If so, will allow them through the protected route
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0()

  // first check if app is stil loading, if true, return null
  // if isLoading changes (e.g. finishes loading) to false, it will re-render the component
  // important to check this first since useAuth is asynchronous and will check isAuthenticated before app has a chance to load
  // optionally can return a loader compoennt rather than just null (a blank screen)
  if (isLoading) {
    return null
  }

  // outlet from react-router-dom renders all the child routes of this component
  // works the same way as the 'children' prop
  if (isAuthenticated) {
    return <Outlet />
  }

  // navigate also from react-router-form. if not logged, redirect back to home page.
  // Replace the URL of the page the user was on in the history stack.
  // This means when the user is redirected, the browser's back button will not bring them back to the page they were trying to access
  return <Navigate to="/" replace />
}
export default ProtectedRoute

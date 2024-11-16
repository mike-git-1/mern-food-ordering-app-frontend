import { useAuth0 } from "@auth0/auth0-react"
import { Navigate, Outlet } from "react-router-dom"

// responsible for checking if a user is logged in. If so, will allow them through the protected route
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth0()

  // outlet from react-router-dom renders all the child routes of this component
  // works the same way as the 'children' prop
  // navigate also from react-router-form. if not logged, redirect back to home page.
  // Replace the URL of the page the user was on in the history stack.
  // This means when the user is redirected, the browser's back button will not bring them back to the page they were trying to access
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />
}

export default ProtectedRoute

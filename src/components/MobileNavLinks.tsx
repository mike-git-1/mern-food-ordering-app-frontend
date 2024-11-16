import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"

// the nav links on mobile devices for a logged in user.
const MobileNavLinks = () => {
  const { logout } = useAuth0()

  return (
    <>
      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold
      hover:text-orange-500"
      >
        User Profile
      </Link>
      <Button
        // when clicked, calls auth0 to logout the user
        // isAuthenticated will then change to false, and the mobile nav menu will update
        onClick={() => {
          logout()
        }}
        //button with display:flex inside flex-col container: button's width will default to 'auto' and will stretch to the full width of the parent container
        className="flex items-center px-3 font-bold hover:bg-gray-500"
      >
        Log Out
      </Button>
    </>
  )
}

export default MobileNavLinks

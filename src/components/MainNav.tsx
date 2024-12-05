import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./ui/button"
import UsernameMenu from "./UsernameMenu"
import { Link } from "react-router-dom"

const MainNav = () => {
  // loginWithRedirect: auth0 hook which allows us to send the user to the hosted login page on Auth0
  // isAuthenticated: tells us if user is logged in (true/false)
  const { loginWithRedirect, isAuthenticated } = useAuth0()

  return (
    // adds spacing between navlinks - centered
    <span className="flex space-x-2 items-center">
      {/* if logged in, display the nav component: UsernameMenu */}
      {isAuthenticated ? (
        <>
          <Link to="order-status" className="font-bold hover:text-orange-500">
            Order Status
          </Link>
          <UsernameMenu />
        </>
      ) : (
        // otherwise, display the login button
        <Button
          // shadcn provides 'variant' property to customize appearance
          // 'ghost' strips the styles so it looks invisble
          variant="ghost"
          className="font-bold hover:text-orange-500 hover:bg-white"
          // how we connect button to auth0. Now when a user clicks the login button, they'll be taken to auth0 login page
          onClick={async () => await loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </span>
  )
}

export default MainNav

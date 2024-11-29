import { CircleUserRound } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"

// the nav links on non-mobile devices for a logged in user.
const UsernameMenu = () => {
  // user object contains information about our logged in user provided by auth0
  // logout will log user out of auth0
  const { user, logout } = useAuth0()

  return (
    // shadcn dropdown
    <DropdownMenu>
      {/* trigger represents what element will trigger the dropdown to appear (the avator icon + username)*/}
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2">
        {/* user avatar icon (from lucide-react) */}
        <CircleUserRound className="text-orange-500" />
        {/* Render the users email. '?' ensures it doesnt attempt to render the email if user is udefined, otherwise it will throw an error. */}
        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* shadcnd dropdownmenuitem helps create padding between dropdown items */}
        <DropdownMenuItem>
          <Link
            to="/manage-restaurant"
            className="font-bold hover:text-orange-500"
          >
            Manage Restaurant
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/user-profile" className="font-bold hover:text-orange-500">
            User Profile
          </Link>
        </DropdownMenuItem>
        {/* ui divider */}
        <Separator />
        {/* logout button */}
        <DropdownMenuItem>
          <Button
            className="flex flex-1 font-bold bg-orange-500"
            // when clicked, calls auth0 will logout the user
            // isAuthenticated will then change to false, and the navbar will update
            onClick={() => logout()}
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UsernameMenu

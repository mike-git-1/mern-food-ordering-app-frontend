import { CircleUserRound, Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"
import MobileNavLinks from "./MobileNavLinks"

const MobileNav = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0()
  return (
    // sheet component from shadcn. (The mobile menu)
    <Sheet>
      {/* insert trigger here (the orange hambuger icon) that will behave as a button to trigger the menu to appear */}
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      {/* insert menu content here */}
      {/* adds vertical spacing between each child element in this container*/}
      <SheetContent className="space-y-3">
        <SheetTitle>
          {/* if logged in, display their email, otherwise, display a generic welcome message */}
          {isAuthenticated ? (
            <span className="flex items-center font-bold gap-2">
              {/* the avatar icon */}
              <CircleUserRound className="text-orange-500" />
              {/* Render the users email. '?' ensures it doesnt attempt to render the email if user is udefined, otherwise it will throw an error. */}
              {user?.email}
            </span>
          ) : (
            <span>Welcome to MernEats.com!</span>
          )}
        </SheetTitle>
        {/* dividing line */}
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          {/* if logged in, display the nav links for mobile, otherwise, display the login button*/}
          {isAuthenticated ? (
            <MobileNavLinks />
          ) : (
            // flex-1: button will take full width of container
            // how we connect button to auth0. Now when a user clicks the login button, they'll be taken to auth0 login page
            <Button
              onClick={() => loginWithRedirect()}
              className="flex-1 font-bold bg-orange-500"
            >
              Log In
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav

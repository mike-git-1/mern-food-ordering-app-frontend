import { useAuth0 } from "@auth0/auth0-react"
import { useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import LoadingButton from "./LoadingButton"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm"
import { useGetMyUser } from "@/api/MyUserApi"

type Props = {
  // user form data that we send on the dialog window will be sent to parent
  onCheckout: (userFormData: UserFormData) => void
  // to decide whether or not to diable checkout btn (e.g. empty cart)
  disabled: boolean
  isLoading: boolean
}
// checkout button
const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
  // for checking if user is logged in before payment
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0()

  // for telling auth0 where to redirect the user after logging in
  const { pathname } = useLocation()

  // our custom hook for getting current logged in user and prepopulating form
  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser()

  const onLogin = async () => {
    // triggers the login process with auth0 and provides a redirect after successful login
    await loginWithRedirect({
      appState: {
        // saving: /detail/49324328424
        returnTo: pathname,
      },
    })
  }

  // if user is not logged in, show log in button
  if (!isAuthenticated) {
    return (
      <Button className="bg-orange-500 flex-1" onClick={onLogin}>
        Log in to check out
      </Button>
    )
  }

  // if still loading the checkout page or still authetnicating user login, load a loading btn
  //  typescript complains that currentUser might be undefined as the API requests happens behind the scenes to fetch the user- so check this too
  if (isAuthLoading || !currentUser || isLoading) {
    return <LoadingButton />
  }

  return (
    <Dialog>
      {/* Any children inside this trigger (the btn), will open up the dialog component */}
      <DialogTrigger asChild>
        {/* pass disabled prop */}
        <Button disabled={disabled} className="bg-orange-500 flex-1">
          Go to checkout
        </Button>
      </DialogTrigger>
      {/* the popup dialog window which displays their user information. Specifying wdths for different screensizes */}
      <DialogContent className="max-w-[42px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          title="Confirm Delivery Details"
          buttonText="Continue to payment"
        />
      </DialogContent>
    </Dialog>
  )
}

export default CheckoutButton

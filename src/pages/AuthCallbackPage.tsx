import { useCreateMyUser } from "@/api/MyUserApi"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

// this page is where we will redirect users to after signing in. Its only responsible for making the call to create and add the user to our db
const AuthCallbackPage = () => {
  const navigate = useNavigate()
  // to access current user
  const { user } = useAuth0()
  // our custom hook
  const { createUser } = useCreateMyUser()

  // useRef stores a state value (false) but unlike useState, it does not trigger a re-render when the state changes.
  const hasCreatedUser = useRef(false)

  // after a user signs in and gets redirected to this page,
  // initialize a call to our backend to create the user in our db by passing in the user obj
  // runs once immediately once this component loads
  useEffect(() => {
    // '.current' is how we access the actual value of the useRef
    // if user has not been created, then go ahead and create the user (ensuring that the useEffect only fires one time)
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email })
      // update value to true so that this useEffect does not run again.
      // this just ensures that the useEffect only fires one time
      hasCreatedUser.current = true
    }
    // immediately redirect to home page after creating user
    navigate("/")
  }, [createUser, navigate, user])

  // return some loading text fragment - in reality, this will happen so quickly that users will not see this page
  return <>Loading...</>
}

export default AuthCallbackPage

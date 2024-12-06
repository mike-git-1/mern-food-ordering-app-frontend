// where we'll connect to our Auth0 account

import { AppState, Auth0Provider } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"

type Props = {
  children: React.ReactNode
}

// auth provider from the sdk
const Auth0ProviderWithNavigate = ({ children }: Props) => {
  //navigate function from React Router, which can be used to navigate to different routes programmatically.
  const navigate = useNavigate()

  // Environment Variables - The things we need to initialize the auth sdk
  // (prefixed with VITE_, indicating they are being used in a Vite project).
  //The domain of your Auth0 instance
  const domain = import.meta.env.VITE_AUTH0_DOMAIN
  //  Your Auth0 application's client ID.
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
  // The URL to redirect to after the authentication process is complete. (e.g. http://localhost:5173)
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL
  // The audience for your API (backend was configured to only accept access tokens from this 'audience'. So we add this to our token )
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE

  // checking if undefined, if so, throw an error that auth couldnt be initialized
  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error("unable to initialise auth")
  }

  // callback used to handle what happens when the authentication process is completed and the user is redirected back to the app.
  // in this case, redirect them to the original page they were on (or default /auth-callback)
  // appstate is optional - of type AppState. It holds custom data passed during the authentication process (e.g., a return URL to send the user back to after logging in).
  const onRedirectCallback = (appState?: AppState) => {
    // used to navigate to a specific page the user was originally trying to access (returnTo) before being redirected to Auth0 for authentication.
    // If returnTo is not provided, the default redirect URL will be to the /auth-callback path which is our AuthCallbackPage .
    // returnTo is a variable that we manually define and set (e.g. set during the checkout process), not set by Auth0
    navigate(appState?.returnTo || "/auth-callback")
  }

  // wraps our components (the children) inside auth0 so that they can access/use the auth0 hooks
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      // when user signs in on auth0 page, autho will redirect user to this redirectUri after login (e.g http://localhost:5173/ if in dev environemnt)
      authorizationParams={{
        redirect_uri: redirectUri,
        audience,
      }}
      // callback that we can define to perform some additional actions when a user is rediercted back to our app (redirect them to the original page they were on)
      // passes any app state we defined
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}
export default Auth0ProviderWithNavigate

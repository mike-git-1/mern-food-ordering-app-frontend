import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"
import HomePage from "./pages/HomePage"
import AuthCallbackPage from "./pages/AuthCallbackPage"
import UserProfilePage from "./pages/UserProfilePage"
import ProtectedRoute from "./auth/ProtectedRoute"

const AppRoutes = () => {
  return (
    // Routes component is used to wrap your Route components.
    <Routes>
      {/* Each Route component defines a path and the component that should be rendered when that path is matched. */}
      <Route
        path="/"
        element={
          // pass showHero prop (=true) which will display the Hero section when on the homepage
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      {/* wrap profile page in a ProtectedRoute - means this route can only be accesed by a logged in user */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes

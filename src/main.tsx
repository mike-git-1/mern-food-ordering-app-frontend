//main entry point to our frontend

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./global.css"
import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from "./AppRoutes"
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate"
import { QueryClient, QueryClientProvider } from "react-query"
import { Toaster } from "./components/ui/sonner"

// React Query is a library for fetching, caching, synchronizing, and updating server data in your React applications.
// It helps to simplify data fetching, state management, and caching in your app by providing hooks to manage these tasks.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // false means that React Query will not automatically refetch queries when the user comes back to the application after switching tabs or windows.
      // This is useful for develop when you don't want to overload your API with requests or if your data doesn’t need to be updated frequently when the user focuses back on the window.
      // e.g. when we are going back and forth between dev tools and browser window...
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Router is wrapped around the application to enable routing. Inside it, you can define different Route components to map paths */}
    <Router>
      {/* now entire app has access to the query hooks */}
      <QueryClientProvider client={queryClient}>
        {/* nest auth0 inside Router. If you placed Auth0ProviderWithNavigate outside the <Router>, it would not have access to React Router's routing context 
      (i.e., it would not have access to 'navigate' which it needs). */}
        <Auth0ProviderWithNavigate>
          {/* nest AppRoutes inside auth provider which will allow all our components access the auth0 hooks */}
          <AppRoutes />
          {/* toast message - from shadcn. The reason we put it here @ the top level in main.tsx is because we want it to appear above
          everything else, ensure it is not hidden behind any other component. We call it from the component using the hooks*/}
          <Toaster visibleToasts={1} position="top-right" richColors />
        </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </Router>
  </StrictMode>
)

import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"

// creating a loading button - taken from shadcn docs - combines lucide-react loader2
const LoadingButton = () => {
  return (
    // disable since this is for when the submission is in process and we dont want users to interact with the button while its loading
    <Button disabled>
      {/* loading spinner component. animate-spin is a tailwind class for spinning animation */}
      <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
      Loading
    </Button>
  )
}

export default LoadingButton

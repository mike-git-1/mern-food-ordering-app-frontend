import { Link } from "react-router-dom"
import MobileNav from "./MobileNav"
import MainNav from "./MainNav"

const Header = () => {
  return (
    <div className="border-b-2 border-b-orange-500 py-6">
      {/* responsive container centered on page - contains the nav links*/}
      <div className="container mx-auto flex justify-between items-center">
        {/* the logo */}
        <Link
          rel="stylesheet"
          to="/"
          // tracking-tight = moves letters closer together
          className="text-3xl font-bold tracking-tight text-orange-500"
        >
          MernEats.com
        </Link>
        {/* mobile nav menu only visible on mobile screens */}
        <div className="md:hidden">
          <MobileNav />
        </div>
        {/* main nav hidden on mobile, visible on larger screens */}
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  )
}

export default Header

import { Restaurant } from "@/types"
import { Link } from "react-router-dom"
import { AspectRatio } from "./ui/aspect-ratio"
import { Banknote, Clock, Dot } from "lucide-react"

type Props = {
  restaurant: Restaurant
}

const SearchResultsCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      // on larger screens, left column will 2/5 and right will take 3/5 of grid
      // group property used to add hover effect to child components if user hovers over this parent component
      // 1st column holds hte image, 2nd col holds the info
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      {/* show image inside aspect ratio component to maintain 16/9 aspect ratio */}
      {/* 1st col */}
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          // allow cropping
          className="rounded-md w-full object-cover"
        />
      </AspectRatio>
      <div>
        {/* the title. WHenever the parent is hovered over, it will trigger these hover styles*/}
        <h3 className="text-2xl font-bold tracking-tight md-2 group-hover:underline">
          {restaurant.restaurantName}
        </h3>
        {/* 2nd col. Also split into a grid.  */}
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          {/* wraps to new line if overflow */}
          {/* 1st col: showing the cuisines it belongs to separated by a dot. */}
          <div className="flex flex-row flex-wrap">
            {restaurant.cuisines.map((item, index) => (
              <span className="flex">
                <span>{item}</span>
                {/* Adding dot from lucide-react. Only adds a dot if the item is not the last item in the restaurants cuisines array */}
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </div>
          {/* 2nd col: showing the estiamted delivery time and price  */}
          <div className="flex gap-2 flex-col">
            <div className="flex items-center gap-1 text-green-600">
              {/* clock icon from lucide */}
              <Clock className="text-green-600" />
              {restaurant.estimatedDeliveryTime} mins
            </div>
            <div className="flex items-center gap-1">
              {/* banknote icon from lucide */}
              <Banknote />
              {/* deliveryPrice was stored in cents (lowest denomination) so convert to dollars Delivery, to 2 decimal places*/}
              Delivery from ${(restaurant.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SearchResultsCard

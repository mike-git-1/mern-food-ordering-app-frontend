import hero from "../assets/hero.png"

const Hero = () => {
  return (
    <div className="">
      {/* img will also take full width of container (responsive). Will not exceed 600px tall. Keep aspect ratio - allows cropping if needed*/}
      <img src={hero} className="w-full max-h-[600px] object-cover" />
    </div>
  )
}

export default Hero

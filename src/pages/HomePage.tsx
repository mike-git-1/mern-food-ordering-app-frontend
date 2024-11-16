import landingImage from "../assets/landing.png"
import appDownloadImage from "../assets/appDownload.png"

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      {/* the white card. negative margin to push the element up to create overlapping effect */}
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takeaway today
        </h1>
        <span className="text-xl">Food is just a click away!</span>
      </div>
      {/* single col grid on smaller screens, 2 col grid on larger screens. */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* first column  */}
        {/* We are ok with default aspect ratio of the img in this case. Grid styles will take care of re-sizing the img.  */}
        <img src={landingImage} />
        {/* second column  */}
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster!
          </span>
          <span>
            Download the MernEats App for faster ordering and personalised
            recommendations
          </span>
          {/* We are ok with default aspect ratio of the img in this case. Grid styles will take care of re-sizing the img.  */}
          <img src={appDownloadImage} />
        </div>
      </div>
    </div>
  )
}

export default HomePage

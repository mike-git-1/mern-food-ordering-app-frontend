const Footer = () => {
  return (
    // orange container
    <div className="bg-orange-500 py-10">
      {/* content wrapper. Responsive container centered on page. Column layout on smaller screens, row layout on larger */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* logo */}
        <span className="text-3xl text-white font-bold tracking-tight">
          MernEats.com
        </span>
        {/* links */}
        <span className="text-white font-bold tracking-tight flex gap-4">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </span>
      </div>
    </div>
  )
}

export default Footer

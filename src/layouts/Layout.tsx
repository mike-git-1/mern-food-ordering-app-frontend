import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import React from "react"

type Props = {
  // children will contain all components nested inside layout
  children: React.ReactNode
  // optional prop
  showHero?: boolean
}

// destrucuring props to extract children.
// represnts base layout
// designed to dislay the child elements/components passed/nested under it
// if showHero not passed, make false by default (e.g. do not show the Hero component)
const Layout = ({ children, showHero = false }: Props) => {
  //minimum height to be 100% of the viewport height,
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* if showHero true, display the Hero section */}
      {showHero && <Hero />}
      {/* responsive container centered horizontally - contains the main content 
      flex-1 to take up available space on screen vertically (since flex-col) */}
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout

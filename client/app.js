import React from 'react'

import Routes from './routes'
import Navbar from './components/navbar'
import HeroImage from './components/HeroImage'
// import FeaturedProducts from './components/FeaturedProducts'
// import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Navbar />
      <HeroImage />
      {/* <FeaturedProducts />
      <Footer /> */}
      <Routes />
    </div>
  )
}

export default App

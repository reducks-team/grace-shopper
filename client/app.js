import React from 'react'

import Routes from './routes'
import Navbar from './components/navbar'
import {UserHome} from './components/user-home'
import Footer from './components/footer'
// import FeaturedProducts from './components/FeaturedProducts'
// import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Navbar />
      <UserHome />
      {/* <FeaturedProducts /> */}
      <Footer />
      <Routes />
    </div>
  )
}

export default App

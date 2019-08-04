import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/ToolBar'
import TypoGraphy from '@material-ui/core/Typography'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import Routes from './routes'
import Navbar2 from './components/NavBar2'
import {UserHome} from './components/user-home'
import Footer from './components/Footer'
// import FeaturedProducts from './components/FeaturedProducts'
// import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <AppBar color="primary" position="static">
        <Toolbar>
          <TypoGraphy variant="title" color="inherit">
            <Link to="/HomePage">
              <h1> REDUCKS </h1>
            </Link>
          </TypoGraphy>
          <Navbar2 />
        </Toolbar>
      </AppBar>
      <Routes />
      <Footer />
    </div>
  )
}

export default App

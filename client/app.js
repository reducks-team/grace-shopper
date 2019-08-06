import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import Routes from './routes'
import Navbar2 from './components/NavBar2'
import {UserHome} from './components/user-home'
import Footer from './components/Footer'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#00BCD4'
  }
}))

function App() {
  const classes = useStyles()

  return (
    <div>
      <AppBar color="secondary" position="static">
        <Toolbar className={classes.root}>
          <TypoGraphy variant="title" color="secondary">
            <Link to="/home">
              <h1 className="logo"> REDUCKS </h1>
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

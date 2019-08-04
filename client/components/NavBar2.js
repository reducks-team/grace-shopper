import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {auth, getProducts, getProduct, logout} from '../store'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import TypoGraphy from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'

const Navbar2 = ({isLoggedIn, clickLogout}) => (
  <div>
    {isLoggedIn ? (
      <List component="nav">
        <ListItem component="div">
          <ListItemText inset>
            <TypoGraphy color="inherit" variant="title">
              <Link to="/products">Products</Link>
            </TypoGraphy>
          </ListItemText>

          <ListItemText inset>
            <TypoGraphy color="inherit" variant="title">
              <Link to="/account">Account</Link>
            </TypoGraphy>
          </ListItemText>

          <ListItemText inset>
            <TypoGraphy color="inherit" variant="title">
              <Link to="/cart">Cart</Link>
            </TypoGraphy>
          </ListItemText>

          <ListItemText inset>
            <TypoGraphy color="inherit" variant="title">
              <Link to="/HomePage" onClick={clickLogout}>
                Logout
              </Link>
            </TypoGraphy>
          </ListItemText>
        </ListItem>
      </List>
    ) : (
      <List component="nav">
        <ListItem component="div">
          <ListItemText inset>
            <TypoGraphy color="inherit" variant="title">
              <Link to="/HomePage">Home</Link>
            </TypoGraphy>
          </ListItemText>

          <ListItemText inset>
            <TypoGraphy color="inherit" variant="title">
              <Link to="/products">Products</Link>
            </TypoGraphy>
          </ListItemText>

          <ListItemText inset>
            <TypoGraphy color="inherit" variant="title">
              <Link to="/about">About</Link>
            </TypoGraphy>
          </ListItemText>

          <ListItemText inset>
            <TypoGraphy color="inherit" variant="title">
              <Link to="/cart">Cart</Link>
            </TypoGraphy>
          </ListItemText>

          <ListItemText inset>
            <TypoGraphy color="inherit" variant="title">
              <Link to="/signin">Sign In</Link>
            </TypoGraphy>
          </ListItemText>
        </ListItem>
      </List>
    )}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.singleUser.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick: () => dispatch(),
    clickProducts: () => dispatch(getProducts()),

    //clickProduct and clickSignin are hardcoded for now for testing purposes
    //Eventually they will need to dynamically receive parameters
    clickLogout: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(Navbar2)

Navbar2.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {auth, getProducts, getProduct} from '../store'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
// import About from './About'
import AllProducts from './AllProducts'
// import SignIn from './SignIn'
// import Cart from './Cart'
// import Account from './Account'
// import image from '../../images/cart.png'

const Navbar = ({clickProducts, clickProduct, clickSignin, isLoggedIn}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/about">About</Link>
          <Link to="/products">Products</Link>
          <Link to="/account">Account</Link>
          <a href="#">Logout</a>
          <Link to="/cart">Cart</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/about">About</Link>
          <Link to="/products/1" onClick={clickProduct}>
            Product 1
          </Link>
          <Link to="/products">Products</Link>
          <Link to="/signin">Sign In</Link>
          <Link to="/cart">Cart</Link>
          {/* <Route exact path="/about" component={About} />
          <Route exact path="/products" component={AllProducts} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/account" component={Account} /> */}
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick: () => dispatch(),
    clickProducts: () => dispatch(getProducts()),

    //clickProduct and clickSignin are hardcoded for now for testing purposes
    //Eventually they will need to dynamically receive parameters
    clickProduct: () => dispatch(getProduct(1)),
    clickSignin: () => dispatch(auth('dmrusyniak@gmail.com', '12345', 'login'))
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

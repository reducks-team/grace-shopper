// import React from 'react'
// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
// import {auth, getProducts, getProduct, logout} from '../store'
// import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
// // import About from './About'
// import AllProducts from './AllProducts'
// // import SignIn from './SignIn'
// // import Cart from './Cart'
// // import Account from './Account'
// // import image from '../../images/cart.png'

// const Navbar = ({
//   clickProducts,
//   clickProduct,
//   clickSignin,
//   isLoggedIn,
//   clickLogout
// }) => (
//   <div>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           <Link to="/about">About</Link>
//           <Link to="/products">Products</Link>
//           <Link to="/account">Account</Link>
//           <Link to="/HomePage" onClick={clickLogout}>
//             Logout
//           </Link>
//           {/* <a href="#">Logout</a> */}
//           <Link to="/cart">Cart</Link>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/Home">About</Link>
//           <Link to="/about">About</Link>
//           <Link to="/products">Products</Link>
//           <Link to="/signin">Sign In</Link>
//           <Link to="/cart">Cart</Link>
//           {/* <Route exact path="/about" component={About} />
//           <Route exact path="/products" component={AllProducts} />
//           <Route exact path="/signin" component={SignIn} />
//           <Route exact path="/cart" component={Cart} />
//           <Route exact path="/account" component={Account} /> */}
//         </div>
//       )}
//     </nav>
//   </div>
// )

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     isLoggedIn: !!state.user.singleUser.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleClick: () => dispatch(),
//     clickProducts: () => dispatch(getProducts()),

//     //clickProduct and clickSignin are hardcoded for now for testing purposes
//     //Eventually they will need to dynamically receive parameters
//     clickProduct: () => dispatch(getProduct(1)),
//     clickSignin: () => dispatch(auth('dmrusyniak@gmail.com', '12345', 'login')),
//     clickLogout: () => dispatch(logout())
//   }
// }

// export default connect(mapState, mapDispatch)(Navbar)

// /**
//  * PROP TYPES
//  */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }

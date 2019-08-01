// import React, {Component} from 'react'
// import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
// import {connect} from 'react-redux'
// //import {getAllProducts} from '../productReducer'

// export class AllStudents extends Component {
//   componentDidMount() {
//     this.props.getAllProducts()
//   }

//   render() {
//     return (
//       <div className="allProducts">
//         <h3>Products</h3>

//         {this.props.AllProducts.map(product => (
//           <div className="product.id" key={product.id}>
//             <Link to={`/products/${product.id}`}>{product.name}</Link>
//           </div>
//         ))}
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => {
//   return {
//     AllProducts: state.products.allProducts
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     getAllProducts: () => dispatch(getAllProducts())
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProduct} from '../store'

class SingleProduct extends Component {
  componentDidMount() {
    try {
      this.props.getProduct(this.props.match.params.productId)
    } catch (error) {
      console.trace(error)
    }
  }

  render() {
    return (
      <div>
        <img src={this.props.singleProduct.imageUrl} height={300} width={300} />
        <h1>{this.props.singleProduct.name}</h1>
        <p>{this.props.singleProduct.description}</p>
        <h2>${this.props.singleProduct.price / 100}</h2>
        <button onClick={this.props.addToCart}>Add To Cart</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.product.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: productId => dispatch(getProduct(productId)),
    addToCart: () => dispatch({})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

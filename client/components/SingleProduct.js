import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProduct, addToCart} from '../store'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    try {
      this.props.getProduct(this.props.match.params.productId)
    } catch (error) {
      console.trace(error)
    }
  }

  handleClick(userId, productId, price) {
    if (!userId) {
      alert('Please log in to add an item to the cart')
    } else {
      this.props.addToCart(userId, productId, price)
    }
  }

  render() {
    if (!this.props.singleProduct.id) {
      return <div />
    } else {
      return (
        <div>
          <img
            src={this.props.singleProduct.imageUrl}
            height={300}
            width={300}
          />
          <h1>{this.props.singleProduct.name}</h1>
          <p>{this.props.singleProduct.description}</p>
          <h2>${this.props.singleProduct.price / 100}</h2>
          <button
            onClick={() =>
              this.handleClick(
                this.props.singleUser.id,
                this.props.match.params.productId,
                this.props.singleProduct.price
              )
            }
          >
            Add To Cart
          </button>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.product.singleProduct,
    singleUser: state.user.singleUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: productId => dispatch(getProduct(productId)),
    addToCart: (userId, productId, productCost) =>
      dispatch(addToCart(userId, productId, productCost))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

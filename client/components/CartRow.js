import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProduct, addToCart, getCart, updateCart} from '../store'

class CartRow extends Component {
  constructor(props) {
    super(props)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
  }

  componentDidUpdate(prevProps) {
    //In cartRow, we have to explicitly check every element of the cart to see if the quantity has changed.  This is the only way to make the field that allows you to enter in a number for your quantity work under the current structure.  With more time a more refined solution would probably be possible - Luke

    if (prevProps.singleUser.cart && this.props.singleUser.cart.data.length) {
      for (let i = 0; i < prevProps.singleUser.cart.data.length; i++) {
        if (
          prevProps.singleUser.cart.data[i].quantity !==
          this.props.singleUser.cart.data[i].quantity
        ) {
          this.props.getActiveCart(this.props.singleUser.id)
        }
      }
    }
  }

  handleQuantityChange = event => {
    if (!event.target.value) event.target.value = 0

    //call the thunk from here
    this.props.updateCart(
      this.props.singleUser.id,
      this.props.product.id,
      this.props.singleProduct.price,
      event.target.value
    )
  }

  render() {
    if (this.props.product && this.props.cart.data) {
      let target = this.props.cart.data.filter(
        product => product.product.id === this.props.product.id
      )

      if (target.length) {
        return (
          <div className="cart-row">
            <img
              src={this.props.product.imageUrl}
              width={115}
              height={100}
              mode="fit"
              alt="Logo"
            />

            <h4>{this.props.product.name}</h4>
            <h4>${(this.props.product.price / 100).toFixed(2)}</h4>
            <h4> quantity: </h4>

            <input
              className="quantity-input"
              type="number"
              value={target[0].quantity}
              onChange={this.handleQuantityChange}
            />
            <h4>
              ${(this.props.product.price * target[0].quantity / 100).toFixed(
                2
              )}
            </h4>
          </div>
        )
      } else return <div />
    } else return <div />
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
      dispatch(addToCart(userId, productId, productCost)),
    getActiveCart: userId => dispatch(getCart(userId)),
    updateCart: (userId, productId, productCost, quantity) =>
      dispatch(updateCart(userId, productId, productCost, quantity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartRow)

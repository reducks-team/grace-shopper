import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProduct, addToCart, getCart} from '../store'

class CartRow extends Component {
  constructor(props) {
    super(props)
    this.state = {prevProps: this.props.singleUser.cart}
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
  }

  componentDidMount() {}

  // componentDidUpdate() {
  //   if (!this.props.product) {
  //     if (this.props.singleUser !== this.props.singleUser.cart)
  //       this.setState({
  //         prevProps: this.props.singleUser.art
  //       })
  //     this.props.getActiveCart(this.props.singleUser.id)
  //   }
  // }

  handleQuantityChange = event => {
    //call the thunk from here
    this.props.addToCart(
      this.props.singleUser.id,
      this.props.product.id,
      this.props.singleProduct.price
    )

    console.log('quanity has changed!')
  }

  render() {
    if (this.props.product && this.props.cart.data) {
      //   console.log(this.props.cart.data[this.props.product.id])
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
            <h4>${this.props.product.price / 100}</h4>
            <h4> quantity: </h4>

            <h4>{target[0].quantity}</h4>

            <input
              className="quantity-input"
              type="number"
              value={target[0].quantity}
              onChange={this.handleQuantityChange}
            />
            <h4>${this.props.product.price / 100 * target[0].quantity}</h4>
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
    getActiveCart: userId => dispatch(getCart(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartRow)

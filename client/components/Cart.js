import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart, checkout} from '../store'
import {CartRow} from '.'
import Button from '@material-ui/core/Button'

class Cart extends Component {
  componentDidMount() {
    if (this.props.singleUser.id) {
      this.props.getActiveCart(this.props.singleUser.id)
    }
  }

  componentDidUpdate(prevProps) {
    if (
      !this.props.activeCart.data.length &&
      prevProps.activeCart.data.length !== this.props.activeCart.data.length
    ) {
      this.props.getActiveCart(this.props.singleUser.id)
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    this.props.checkout(this.props.singleUser.id)
  }

  render() {
    if (this.props.activeCart.data.length) {
      const totalPrice = this.props.activeCart.data
        .map(element => element.itemCost * element.quantity)
        .reduce((a, b) => a + b, 0)
      return (
        <div>
          <h1>{this.props.singleUser.firstName}'s Cart</h1>
          <CartRow singleUser={this.props.singleUser} />
          {this.props.activeCart.data.map(product => (
            <CartRow
              key={product.product.id}
              product={product.product}
              cart={this.props.activeCart}
            />
          ))}

          <h4 className="total">SubTotal: ${totalPrice / 100}</h4>
          <h4 className="shipping">Shipping: FREE</h4>
          <h4 className="tax">
            Estimated Tax: ${Math.round(totalPrice / 100 * 0.06 * 100) / 100}
          </h4>
          <h2 className="grandTotal">
            Total: ${Math.round(totalPrice / 100 * 1.06 * 100) / 100}
          </h2>
          <Button
            onClick={this.handleSubmit}
            fullWidth
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      )
    } else
      return (
        <div>
          <h1>Your Cart</h1>
          <CartRow singleUser={this.props.singleUser} />
          {this.props.activeCart.data.map(product => (
            <CartRow
              key={product.product.id}
              product={product.product}
              cart={this.props.activeCart}
            />
          ))}
          <h3>Your cart is empty :/</h3>
        </div>
      )
  }
}

const mapStateToProps = state => {
  return {
    singleUser: state.user.singleUser,
    activeCart: state.user.singleUser.cart || {data: []}
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getActiveCart: userId => dispatch(getCart(userId)),
    checkout: userId => dispatch(checkout(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

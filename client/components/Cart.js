import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart, checkout} from '../store'
import {CartRow} from '.'
import Button from '@material-ui/core/Button'
import {Redirect} from 'react-router-dom'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.initialDataFlag = false
  }

  componentDidMount() {
    if (this.props.singleUser.id) {
      this.props.getActiveCart(this.props.singleUser.id)
    }
  }

  componentDidUpdate(prevProps) {
    //Right now the componentDidUpdate hook is required because the component renders initially without any data, then the data is put on state by the componentDidMount hook, and the component is failing to rerender automatically.  I think the Redux store design is largely to blame but at this point it's too late in the game to make structural changes - Luke

    //Essentially we have to check whether the list of items in the cart has a length, and if not, we need to update to check whether there's data we haven't grabbed yet.  But we can't just update every time the length is zero, or this will infinitely loop.  So we have to check whether this is the initial check of the data or not.  If it's not the initial check of the data, we can skip to checking to see if the list of items in the cart has changed between the last state and the current state.  If it has changed, we want to update the component.  If it hasn't changed, we don't want to do anything, again to avoid infinite loops
    if (
      this.props.activeCart.data.length === 0 &&
      this.initialDataFlag === false
    ) {
      this.props.getActiveCart(this.props.singleUser.id)
      this.initialDataFlag = true
    } else if (
      this.props.activeCart.data.length !== prevProps.activeCart.data.length
    ) {
      this.props.getActiveCart(this.props.singleUser.id)
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    if (this.props.singleUser.billingCity) {
      this.props.checkout(this.props.singleUser.id)
    } else {
      this.setState({
        redirect: true
      })
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/account" />
    }
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

          <h4 className="total">SubTotal: ${(totalPrice / 100).toFixed(2)}</h4>
          <h4 className="shipping">Shipping: FREE</h4>
          <h4 className="tax">
            Estimated Tax: ${(
              Math.round(totalPrice / 100 * 0.06 * 100) / 100
            ).toFixed(2)}
          </h4>
          <h2 className="grandTotal">
            Total: ${(Math.round(totalPrice / 100 * 1.06 * 100) / 100).toFixed(
              2
            )}
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
    //activeCartLength: state.user.singleUser.cart ? state.user.singleUser.cart.data.length : [],
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

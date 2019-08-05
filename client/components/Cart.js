import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart, checkout} from '../store'
import {CartRow} from '.'
import Button from '@material-ui/core/Button'

class Cart extends Component {
  componentDidMount() {
    if (this.props.singleUser.id) {
      this.props.getActiveCart(this.props.singleUser.id)
      console.log(this.props.singleUser)
    }
  }

  componentDidUpdate() {
    if (!this.props.activeCart.data.length) {
      this.props.getActiveCart(this.props.singleUser.id)
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    this.props.checkout(this.props.singleUser.id)
  }

  render() {
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

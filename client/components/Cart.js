import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart} from '../store'

class Cart extends Component {
  componentDidMount() {
    this.props.getActiveCart(this.props.singleUser.id)
  }

  //This seems to be working as a sort of hacky solution to the cart items not rendering if you refresh the cart page --- LUKE
  componentDidUpdate(prevProps) {
    if (prevProps.singleUser.id !== this.props.singleUser.id) {
      this.props.getActiveCart(this.props.singleUser.id)
    }
  }

  render() {
    return (
      <div>
        <h1>Your Cart</h1>
        {this.props.activeCart.data.map(product => product.product.name)}
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
    getActiveCart: userId => dispatch(getCart(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

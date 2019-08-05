import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart} from '../store'

class Cart extends Component {
  componentDidMount() {
    if (this.props.singleUser.id) {
      this.props.getActiveCart(this.props.singleUser.id)
    }
  }

  componentDidUpdate() {
    if (!this.props.activeCart.data.length) {
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

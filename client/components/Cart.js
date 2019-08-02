import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ProductThumbnail} from './'
import {getCart} from '../store'

class Cart extends Component {
  componentDidMount() {
    this.props.getActiveCart(this.props.singleUser.id)
  }

  render() {
    console.log(this.props.activeCart.data)
    return (
      <div>
        <h1>Your Cart</h1>
        {this.props.activeCart.data.map(product => product.productId)}
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

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ProductThumbnail} from './'
import {getCart} from '../store'

class Cart extends Component {
  componentDidMount() {
    this.props.getActiveCart(Number(this.props.userId))
    console.log('userId: ', this.props.userId)
    console.log('activeCart: ', this.props.activeCart)
  }

  render() {
    return (
      <div>
        <h1>Your Cart</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.singleUser.id,
    activeCart: state.user.singleUser.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getActiveCart: () => dispatch(getCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

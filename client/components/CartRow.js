import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProduct, addToCart} from '../store'

export default class SingleProduct extends Component {
  componentDidMount() {
    console.log('CartRow Mounted')
    // console.log(this.props.cart.data)
  }

  render() {
    if (this.props.product && this.props.cart.data[this.props.product.id]) {
      //   console.log(this.props.cart.data[this.props.product.id])
      return (
        <div className="cart-row">
          <img
            src={this.props.product.imageUrl}
            width={125}
            height={100}
            mode="fit"
            alt="Logo"
          />
          <h4>{this.props.product.name}</h4>

          <h4> quantity </h4>

          <h4>{this.props.cart.data[this.props.product.id].quantity}</h4>
        </div>
      )
    } else return <div />
  }
}

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProduct, addToCart} from '../store'

export default class SingleProduct extends Component {
  componentDidMount() {
    console.log('this.props.cart', this.props.cart)
    console.log('this.props.prouct', this.props.product)
  }

  handleQuantityChange = event => {
    //call the thunk from here
    event.preventDefault()
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

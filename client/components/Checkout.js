import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProduct, addToCart} from '../store'

export default class Checkout extends Component {
  componentDidMount() {}

  render() {
    return <h2>Thank you for your order!</h2>
  }
}

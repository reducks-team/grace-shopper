import React, {Component} from 'react'

export default class OrderRow extends Component {
  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  render() {
    const totalPrice = this.props.orderDetails.productOrders
      .map(element => element.itemCost * element.quantity)
      .reduce((a, b) => a + b, 0)
    return (
      <div className="order-row">
        <h3>{this.props.orderDetails.id}</h3>
        <h3>{this.props.orderDetails.updatedAt}</h3>
        <h3>{totalPrice / 100}</h3>
      </div>
    )
  }
}

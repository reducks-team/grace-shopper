import React, {Component} from 'react'

export default class UnconnectedAllProducts extends Component {
  render() {
    return (
      <div>
        <img src={this.props.product.imageUrl} height={150} width={150} />
        <h1>{this.props.product.name}</h1>
        <h2>${this.props.product.price / 100}</h2>
      </div>
    )
  }
}

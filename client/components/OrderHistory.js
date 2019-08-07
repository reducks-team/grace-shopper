import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart, getOrderHistory} from '../store'
import {OrderRow} from '.'

class OrderHistory extends Component {
  componentDidUpdate() {
    if (!this.props.singleUser.orderHistory) {
      this.props.getOrderHistory(this.props.singleUser.id)
    }
  }

  render() {
    if (!this.props.singleUser.orderHistory) {
      return <div />
    } else {
      return (
        <div>
          <h1>Order History</h1>
          {this.props.singleUser.orderHistory.data.map(el => (
            <OrderRow key={el.id} orderDetails={el} />
          ))}
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    singleUser: state.user.singleUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrderHistory: userId => dispatch(getOrderHistory(userId)),
    getActiveCart: userId => dispatch(getCart(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)

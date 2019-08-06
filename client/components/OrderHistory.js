import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart, checkout, getOrderHistory} from '../store'
import {OrderRow} from '.'
import Button from '@material-ui/core/Button'
import {Redirect} from 'react-router-dom'

class OrderHistory extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (!this.props.singleUser.orderHistory) {
      this.props.getOrderHistory(this.props.singleUser.id)
    }
    console.log(this.props.singleUser)
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

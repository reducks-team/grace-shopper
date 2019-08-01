import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ProductThumbnail} from './'

const mapStateToProps = state => {
  return {
    userId: state.user.singleUser.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getActiveProducts: () => dispatch(thunk())
  }
}

class Cart extends Component {
  componentDidMount() {
    console.log(this.props.userId)
  }

  render() {
    return (
      <div>
        <h1>Your Cart</h1>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

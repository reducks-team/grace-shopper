import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ProductThumbnail} from './'

class Cart extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>Your Cart</h1>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getActiveProducts: () => dispatch(thunk())
  }
}

export default connect(null, mapDispatchToProps)(Cart)

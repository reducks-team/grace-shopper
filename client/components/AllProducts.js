import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProducts} from '../store'
import {ProductThumbnail} from './'

class AllProducts extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    return (
      <div>
        {this.props.allProducts.map(product => (
          <div key={product.id}>
            <ProductThumbnail product={product} />
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.product.allProducts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)

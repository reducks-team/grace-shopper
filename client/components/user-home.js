import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import HeroImage from './HeroImage'
import FeaturedProducts from './FeaturedProducts'
// import Footer from './Footer'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <HeroImage />
      <FeaturedProducts />
      {/* <Footer /> */}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

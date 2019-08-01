import React from 'react'
import HeroImage from './HeroImage'
import FeaturedProducts from './FeaturedProducts'

class HomePage extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>This is HomePage</h1>
        <HeroImage />
        <FeaturedProducts />
      </div>
    )
  }
}

export {HomePage}

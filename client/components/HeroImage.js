import React from 'react'
//import heroImg from '/images/heroImg.jpg'

const HeroImage = () => {
  return (
    <div>
      <img
        className="heroImg"
        src="/images/heroImg.jpg"
        height={400}
        width={500}
        // mode="fit"
        justify="center"
      />
    </div>
  )
}
export default HeroImage

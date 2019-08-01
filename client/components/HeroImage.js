import React from 'react'
//import heroImg from '/images/heroImg.jpg'

const HeroImage = () => {
  return (
    <div>
      <h1>Title</h1>
      <img
        className="heroImg"
        src="/images/heroImg.jpg"
        height={500}
        width={600}
        mode="fit"
      />
      <p>Slogan</p>
    </div>
  )
}
export default HeroImage

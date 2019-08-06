import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import {Grid, Paper, Typography} from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {getOrderHistory} from '../store'
import {ProductThumbnail} from './'
import {createBrotliCompress} from 'zlib'

class Recommendations extends Component {
  componentDidMount() {
    //let orderHistory = this.props.getOrderHistory(this.props.userId)

    //map over FV and increment every time you hit a relevant tag
    //divide FV by total length of objects
    //gives you a FV that represents the user
    //(check against local storage in here somewhere)

    //getProducts
    //for each product in allproducts, push to an array the id and the FV

    //check that this works, and then instead of making a huge seed, just create a large randomly generated array of FVs and ids that don't correspond to anything

    //Helper function for generating random numbers
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max))
    }

    //Helper function for checking array equality
    function compareEqualLengthArrays(a, b) {
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
          return false
        }
      }
      return true
    }

    //Helper function for calculating euclidian distance
    function FiveDimEuclidianDistance(p, q) {
      return Math.sqrt(
        Math.pow(p[0] - q[0], 2) +
          Math.pow(p[1] - q[1], 2) +
          Math.pow(p[2] - q[2], 2) +
          Math.pow(p[3] - q[3], 2) +
          Math.pow(p[4] - q[4], 2)
      )
    }

    //This just generates a big array of products with random feature vectors so I don't have to make an enormous seed
    const randomProductArr = []
    const origin = [0, 0, 0, 0, 0]
    for (let i = 0; i < 30; i++) {
      const holiday = getRandomInt(2)
      const occupation = getRandomInt(2)
      const gender = getRandomInt(2)
      const complexity = Math.round(Math.random() * 10) / 10
      const sport = getRandomInt(2)
      const FV = [holiday, occupation, gender, complexity, sport]
      const euclidianPos = FiveDimEuclidianDistance(FV, origin)
      const newElem = {id: i + 50, FV, euclidianPos}
      randomProductArr.push(newElem)
    }

    // eslint-disable-next-line max-statements
    function kMeans(k, arr) {
      const centroids = []
      //This generates random initial centroids in my vector space
      for (let i = 0; i < k; i++) {
        const locVector = [
          getRandomInt(2),
          getRandomInt(2),
          getRandomInt(2),
          Math.random(),
          getRandomInt(2)
        ]
        const euclidianPos = FiveDimEuclidianDistance(locVector, origin)
        centroids.push({id: i, locVector, euclidianPos})
      }

      let whileCounter = 0
      while (whileCounter < 5) {
        whileCounter++
        //This first calculates the nearest centroid to each element
        // eslint-disable-next-line no-loop-func
        arr.forEach(function(product) {
          let leastDistance = null
          for (let i = 0; i < k; i++) {
            const distance = FiveDimEuclidianDistance(
              product.FV,
              centroids[i].locVector
            )
            if (distance < leastDistance || !leastDistance) {
              product.nearestCentroid = centroids[i]
              leastDistance = distance
            }
          }
        })

        //Then, we recalculate the centroids using the new clusters
        for (let i = 0; i < centroids.length; i++) {
          let numElements = 0
          let holidaySum = 0
          let occupationSum = 0
          let genderSum = 0
          let complexitySum = 0
          let sportSum = 0
          for (let j = 0; j < arr.length; j++) {
            if (arr[j].nearestCentroid === centroids[i]) {
              numElements++
              holidaySum += arr[j].FV[0]
              occupationSum += arr[j].FV[1]
              genderSum += arr[j].FV[2]
              complexitySum += arr[j].FV[3]
              sportSum += arr[j].FV[4]
            }
          }
          holidaySum /= numElements
          occupationSum /= numElements
          genderSum /= numElements
          complexitySum /= numElements
          sportSum /= numElements
          centroids[i].newLocVector = [
            holidaySum,
            occupationSum,
            genderSum,
            complexitySum,
            sportSum
          ]
        }

        //Finally, if the centroids have changed position, we rerun
        let didCentroidsChange = !centroids.every(centroid =>
          compareEqualLengthArrays(centroid.locVector, centroid.newLocVector)
        )
        if (!didCentroidsChange) {
          return [centroids, arr]
        } else {
          centroids.forEach(function(centroid) {
            centroid.locVector = centroid.newLocVector
          })
        }
      }
    }

    const clusterDetails = kMeans(3, randomProductArr)
    const centroids = clusterDetails[0]
    const productsForFilter = clusterDetails[1]

    //for now I am going to use a randomly generated user profile
    let testUserFV = [
      getRandomInt(2),
      getRandomInt(2),
      getRandomInt(2),
      Math.random(),
      getRandomInt(2)
    ]

    //Finding the cluster to which the user belongs
    let closestCentroidToUser = null
    let closestDistanceToUser = null
    for (let i = 0; i < centroids.length; i++) {
      let distance = FiveDimEuclidianDistance(
        testUserFV,
        centroids[i].locVector
      )
      if (!closestCentroidToUser || distance < closestDistanceToUser) {
        closestDistanceToUser = distance
        closestCentroidToUser = centroids[i]
      }
    }

    //Filtering the products array by cluster.  This will produce a list of recommended products
    let recommendedProducts = productsForFilter.filter(
      elem => elem.nearestCentroid.locVector === closestCentroidToUser.locVector
    )
    console.log(recommendedProducts)
  }

  render() {
    return <div>Hi</div>
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.singleUser.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //getOrderHistory: (userId) => dispatch(getOrderHistory(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recommendations)

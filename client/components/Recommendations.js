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
    //NOTE: EUCLIDIANPOS CAN PROBABLY BE REMOVED FROM ALL THE OBJECTS WHERE IT APPEARS.  ONLY THE FVS ARE NECESSARY
    //NOTE: A GOOD CHECK WOULD BE TO CREATE K CLUSTERS WITH K DISTINCT LOCATIONS AND A BUNCH OF REPEATED POINTS
    //NOTE: AN OBVIOUS ISSUE WITH THIS METHOD IS THE LOW NUMBER OF DATAPOINTS AND THE SENSITIVITY TO THE STARTING CONDITIONS
    //NOTE: A MORE PRACTICAL EXAMPLE MIGHT BE TO USE A SIMILAR METHOD, BUT TO RECOMMEND BASED ON OTHER USERS RATHER THAN PAST PURCHASES (MORE INVOLVED, THOUGH)
    //^^^I.E. USERS WHO BOUGHT THIS ITEM ALSO BOUGHT...
    //^^^LESS DYNAMICALLY, COULD JUST USE EACH FV AND FIND IT'S K NEAREST NEIGHBORS AND RECOMMEND THOSE *******************************************

    //let orderHistory = this.props.getOrderHistory(this.props.userId)

    //Right now the feature vectors consist of:
    //Whether they represent a holiday (turkey duck, scream duck)
    //Whether they represent an occupation (Sailor duck, pirate duck)
    //The gender of the duck
    //How complex/elaborate the duck is
    //Whether the duck references a sport (soccer duck, football duck)

    //map over each product the user has ever ordered and increment the relevant part of the FV every time you hit a relevant tag
    //divide each element in FV by total length of objects
    //gives you a FV that represents the user
    //(check against local storage in here somewhere for the sake of processing speed and scalability)

    //getProducts
    //map over each product in allProducts and generate a FV like we did for the user
    //For now I just used a randomly generated array of products and FVs so I didn't have to make a huge seed file

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

      //Right now I have this stop on how many times the while loop is allowed to run so I don't crash my browser.  Eventually I want to remove it
      let whileCounter = 0
      while (whileCounter < 10) {
        console.log('whileLoops:', whileCounter)
        whileCounter++
        //This first calculates the nearest centroid to each element, giving us initial clusters
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

        //Then, we recalculate the centroids using the clusters
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

        //Finally, if the centroids have changed position, we rerun the loop using the new centroids
        let didCentroidsChange = !centroids.every(centroid =>
          compareEqualLengthArrays(centroid.locVector, centroid.newLocVector)
        )
        if (!didCentroidsChange) {
          return [centroids, arr]
        } else {
          console.log('recalculating')
          centroids.forEach(function(centroid) {
            centroid.locVector = centroid.newLocVector
          })
        }
      }
    }

    const clusterDetails = kMeans(5, randomProductArr)
    const centroids = clusterDetails[0]
    const productsForFilter = clusterDetails[1]

    //for now I am going to use a randomly generated user profile, later the user's profile will be generated by creating them a feature vector
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
    //Eventually wanna maybe filter out items the user has already purchased
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

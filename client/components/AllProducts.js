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
import {getProducts} from '../store'
import {ProductThumbnail} from './'

class AllProducts extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    return (
      <div style={{marginTop: 20, padding: 30}}>
        <Grid container spacing={2} justify="center">
          {this.props.allProducts.map(product => (
            <Grid item key={product.id} xs={4}>
              <Link to={`/products/${product.id}`}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={product.name}
                      height="140"
                      title={product.name}
                      image={product.imageUrl}
                    />
                    {/* <ProductThumbnail product={product} /> */}

                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {product.name}
                      </Typography>
                      <Typography component="p">
                        {product.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
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

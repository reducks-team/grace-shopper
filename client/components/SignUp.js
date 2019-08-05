import React, {Component} from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {auth} from '../store'

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
})

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      streetAddress: '',
      addressLineTwo: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      billingStreetAddress: '',
      billingAddressLineTwo: '',
      billingCity: '',
      billingState: '',
      billingCountry: '',
      billingPostalCode: '',
      creditCardNumber: '',
      expirationDateMonth: '',
      expirationDateYear: '',
      securityCode: ''
    }
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount() {}

  render() {
    const {classes, handleSubmit} = this.props
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create a New Account
            </Typography>
            <form
              className={classes.form}
              onSubmit={() => handleSubmit(this.state)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="firstName"
                    type="text"
                    id="firstName"
                    label="First Name"
                    autoComplete="fname"
                    value={this.state.firstName}
                    onChange={event =>
                      this.setState({firstName: event.target.value})
                    }
                    variant="outlined"
                    required
                    fullWidth
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="lastName"
                    type="text"
                    id="lastName"
                    label="Last Name"
                    value={this.state.lastName}
                    onChange={event =>
                      this.setState({lastName: event.target.value})
                    }
                    autoComplete="lname"
                    variant="outlined"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    type="text"
                    id="email"
                    label="Email Address"
                    value={this.state.email}
                    onChange={event =>
                      this.setState({email: event.target.value})
                    }
                    variant="outlined"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    type="password"
                    id="password"
                    label="Password"
                    value={this.state.password}
                    onChange={event =>
                      this.setState({password: event.target.value})
                    }
                    variant="outlined"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="phoneNumber"
                    type="number"
                    id="phoneNumber"
                    label="Phone Number"
                    value={this.state.phoneNumber}
                    onChange={event =>
                      this.setState({phoneNumber: event.target.value})
                    }
                    variant="outlined"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="streetAddress"
                    type="text"
                    id="streetAddress"
                    label="Street Address"
                    value={this.state.streetAddress}
                    onChange={event =>
                      this.setState({streetAddress: event.target.value})
                    }
                    variant="outlined"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="addressLineTwo"
                    type="text"
                    id="addressLineTwo"
                    label="Address Line Two"
                    value={this.state.addressLineTwo}
                    onChange={event =>
                      this.setState({addressLineTwo: event.target.value})
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="city"
                    type="text"
                    id="city"
                    label="City"
                    value={this.state.city}
                    onChange={event =>
                      this.setState({city: event.target.value})
                    }
                    variant="outlined"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="state"
                    type="text"
                    id="state"
                    label="State"
                    value={this.state.state}
                    onChange={event =>
                      this.setState({state: event.target.value})
                    }
                    variant="outlined"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="country"
                    type="country"
                    id="country"
                    label="Country"
                    value={this.state.country}
                    onChange={event =>
                      this.setState({country: event.target.value})
                    }
                    variant="outlined"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="postalCode"
                    type="number"
                    id="postalCode"
                    label="Postal Code"
                    value={this.state.postalCode}
                    onChange={event =>
                      this.setState({postalCode: event.target.value})
                    }
                    variant="outlined"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="billingStreetAddress"
                    type="text"
                    id="billingStreetAddress"
                    label="Billing Street Address"
                    value={this.state.billingStreetAddress}
                    onChange={event =>
                      this.setState({billingStreetAddress: event.target.value})
                    }
                    variant="outlined"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="billingAddressLineTwo"
                    type="text"
                    id="billingAddressLineTwo"
                    label="Billing Address LineTwo"
                    value={this.state.billingAddressLineTwo}
                    onChange={event =>
                      this.setState({billingAddressLineTwo: event.target.value})
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="billingCity"
                    type="text"
                    id="billingCity"
                    label="Billing City"
                    value={this.state.billingCity}
                    onChange={event =>
                      this.setState({billingCity: event.target.value})
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="billingState"
                    type="text"
                    id="billingState"
                    label="Billing State"
                    value={this.state.billingState}
                    onChange={event =>
                      this.setState({billingState: event.target.value})
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="billingCountry"
                    type="text"
                    id="billingCountry"
                    label="Billing Country"
                    value={this.state.billingCountry}
                    onChange={event =>
                      this.setState({billingCountry: event.target.value})
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="billingPostalCode"
                    type="number"
                    id="billingPostalCode"
                    label="billingPostalCode"
                    value={this.state.billingPostalCode}
                    onChange={event =>
                      this.setState({billingPostalCode: event.target.value})
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="creditCardNumber"
                    type="number"
                    id="creditCardNumber"
                    label="Credit Card Number"
                    value={this.state.creditCardNumber}
                    onChange={event =>
                      this.setState({creditCardNumber: event.target.value})
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="expirationDateMonth"
                    type="number"
                    id="expirationDateMonth"
                    label="Month"
                    value={this.state.expirationDateMonth}
                    onChange={event =>
                      this.setState({expirationDateMonth: event.target.value})
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="expirationDateYear"
                    type="number"
                    id="expirationDateYear"
                    label="Year"
                    value={this.state.expirationDateYear}
                    onChange={event =>
                      this.setState({expirationDateYear: event.target.value})
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="securityCode"
                    type="securityCode"
                    id="securityCode"
                    label="Security Code"
                    value={this.state.securityCode}
                    onChange={event =>
                      this.setState({securityCode: event.target.value})
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleUser: state.user.singleUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: (state, method = 'signup') => {
      dispatch(auth(state, method))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(SignUp)
)

/* // <div>
      //   <h1>Create a New Account</h1>
      //   <form onSubmit={this.handleSubmit}>
      //     <div>
      //       <label> Email </label>
      //       <input
      //         type="text"
      //         name="email"
      //         value={this.state.email}
      //         onChange={this.handleEmailChange}
      //       />
      //     </div>
          <div>
            <label> Password </label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <button>Submit</button>
        </form>
      </div> */

// class SignUp extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       email: '',
//       password: ''
//     }
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   handleEmailChange = event => {
//     this.setState({
//       email: event.target.value
//     })
//   }

//   handlePasswordChange = event => {
//     this.setState({
//       password: event.target.value
//     })
//   }

//   componentDidMount() {}

//   handleSubmit = event => {
//     event.preventDefault()
//     const email = event.target.email.value
//     const password = event.target.password.value
//     this.props.signInUser(email, password)
//   }

//     render() {
//       const {classes} = this.props
//       return (

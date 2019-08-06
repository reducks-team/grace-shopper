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
import {updateUser} from '../store'

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

class AccountUpdateForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        email: this.props.singleUser.email,
        password: this.props.singleUser.password,
        firstName: this.props.singleUser.firstName,
        lastName: this.props.singleUser.lastName,
        phoneNumber: this.props.singleUser.phoneNumber,
        streetAddress: this.props.singleUser.streetAddress,
        addressLineTwo: this.props.singleUser.addressLineTwo,
        city: this.props.singleUser.city,
        state: this.props.singleUser.state,
        country: this.props.singleUser.country,
        postalCode: this.props.singleUser.postalCode,
        billingStreetAddress: this.props.singleUser.billingStreetAddress,
        billingAddressLineTwo: this.props.singleUser.billingAddressLineTwo,
        billingCity: this.props.singleUser.billingCity,
        billingState: this.props.singleUser.billingState,
        billingCountry: this.props.singleUser.billingCountry,
        billingPostalCode: this.props.singleUser.billingPostalCode,
        creditCardNumber: this.props.singleUser.creditCardNumber,
        expirationDateMonth: this.props.singleUser.expirationDateMonth,
        expirationDateYear: this.props.singleUser.expirationDateYear,
        securityCode: this.props.singleUser.securityCode
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const {name, value} = event.target
    const {user} = this.state
    this.setState({user: {...user, [name]: value}})
  }

  handleSubmit(event) {
    event.preventDefault()
    const {user} = this.state
    this.props.updatingUser(user, this.props.singleUser.id)
  }

  componentDidMount() {}

  render() {
    const {classes, singleUser} = this.props
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Update Your Account Information
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="firstName"
                    type="text"
                    id="firstName"
                    label="First Name"
                    autoComplete="fname"
                    value={this.state.firstName}
                    defaultValue={singleUser.firstName}
                    onChange={this.handleChange}
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
                    defaultValue={singleUser.lastName}
                    value={this.state.lastName}
                    onChange={this.handleChange}
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
                    defaultValue={singleUser.email}
                    value={this.state.email}
                    onChange={this.handleChange}
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
                    defaultValue={singleUser.password}
                    value={this.state.password}
                    onChange={this.handleChange}
                    variant="outlined"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="phoneNumber"
                    type="text"
                    id="phoneNumber"
                    label="Phone Number"
                    defaultValue={singleUser.phoneNumber}
                    value={this.state.phoneNumber}
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="streetAddress"
                    type="text"
                    id="streetAddress"
                    label="Street Address"
                    defaultValue={singleUser.streetAddress}
                    value={this.state.streetAddress}
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="addressLineTwo"
                    type="text"
                    id="addressLineTwo"
                    label="Address Line Two"
                    defaultValue={singleUser.addressLineTwo}
                    value={this.state.addressLineTwo}
                    onChange={this.handleChange}
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
                    defaultValue={singleUser.city}
                    value={this.state.city}
                    onChange={this.handleChange}
                    variant="outlined"
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
                    defaultValue={singleUser.state}
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="country"
                    type="country"
                    id="country"
                    label="Country"
                    defaultValue={singleUser.country}
                    value={this.state.country}
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="postalCode"
                    type="number"
                    id="postalCode"
                    label="Postal Code"
                    defaultValue={singleUser.postalCode}
                    value={this.state.postalCode}
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="billingStreetAddress"
                    type="text"
                    id="billingStreetAddress"
                    label="Billing Street Address"
                    defaultValue={singleUser.billingStreetAddress}
                    value={this.state.billingStreetAddress}
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="billingAddressLineTwo"
                    type="text"
                    id="billingAddressLineTwo"
                    label="Billing Address LineTwo"
                    defaultValue={singleUser.billingAddressLineTwo}
                    value={this.state.billingAddressLineTwo}
                    onChange={this.handleChange}
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
                    defaultValue={singleUser.billingCity}
                    value={this.state.billingCity}
                    onChange={this.handleChange}
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
                    defaultValue={singleUser.billingState}
                    value={this.state.billingState}
                    onChange={this.handleChange}
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
                    defaultValue={singleUser.billingCountry}
                    value={this.state.billingCountry}
                    onChange={this.handleChange}
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
                    defaultValue={singleUser.billingPostalCode}
                    value={this.state.billingPostalCode}
                    onChange={this.handleChange}
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
                    defaultValue={singleUser.creditCardNumber}
                    value={this.state.creditCardNumber}
                    onChange={this.handleChange}
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
                    defaultValue={singleUser.expirationDateMonth}
                    value={this.state.expirationDateMonth}
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
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
                    defaultValue={singleUser.securityCode}
                    value={this.state.securityCode}
                    onChange={this.handleChange}
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
                Submit
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
    updatingUser: (state, userId) => {
      dispatch(updateUser(state, userId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(AccountUpdateForm)
)

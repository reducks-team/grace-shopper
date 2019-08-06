import React, {Component} from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'

class Auth extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    streetAddress: '',
    AddressLineTwo: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    creditCardNumber: '',
    expirationDate: '',
    securityCode: ''
  }
  render() {
    const {type, header, handleSubmit} = this.props
    console.log('Inside the auth')
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>{header}</h2>
        <form name="form" onSubmit={() => handleSubmit(type, this.state)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={this.state.email}
              onChange={event => this.setState({email: event.target.value})}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              className="form-control"
              name="password"
              value={this.state.password}
              onChange={event => this.setState({password: event.target.value})}
            />
          </div>
          {type === 'signup' && (
            <div>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={this.state.firstName}
                  onChange={event =>
                    this.setState({firstName: event.target.value})
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={this.state.firstName}
                  onChange={event =>
                    this.setState({firstName: event.target.value})
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={event =>
                    this.setState({lastName: event.target.value})
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phoneNumber"
                  value={this.state.phoneNumber}
                  onChange={event =>
                    this.setState({phoneNumber: event.target.value})
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="streetAddress">Street Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="streetAddress"
                  value={this.state.streetAddress}
                  onChange={event =>
                    this.setState({streetAddress: event.target.value})
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="AddressLineTwo">Address Line Two</label>
                <input
                  type="text"
                  className="form-control"
                  name="AddressLineTwo"
                  value={this.state.AddressLineTwo}
                  onChange={event =>
                    this.setState({AddressLineTwo: event.target.value})
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={this.state.city}
                  onChange={event => this.setState({city: event.target.value})}
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={this.state.state}
                  onChange={event => this.setState({state: event.target.value})}
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  className="form-control"
                  name="country"
                  value={this.state.country}
                  onChange={event =>
                    this.setState({country: event.target.value})
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="postalCode"
                  value={this.state.postalCode}
                  onChange={event =>
                    this.setState({postalCode: event.target.value})
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="creditCardNumber">Credit Card Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="creditCardNumber"
                  value={this.state.creditCardNumber}
                  onChange={event =>
                    this.setState({creditCardNumber: event.target.value})
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="expirationDate">Expiration Date</label>
                <input
                  type="text"
                  className="form-control"
                  name="expirationDate"
                  value={this.state.expirationDate}
                  onChange={event =>
                    this.setState({expirationDate: event.target.value})
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="securityCode">Security Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="securityCode"
                  value={this.state.securityCode}
                  onChange={event =>
                    this.setState({securityCode: event.target.value})
                  }
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary">Submit</button>
              </div>
            </div>
          )}
        </form>
      </div>
    )
  }
}

const mapLogin = state => {
  return {
    type: 'login',
    header: 'Login'
  }
}
const mapSignUp = state => {
  return {
    type: 'signup',
    header: 'Sign Up'
  }
}
const mapDispatch = dispatch => {
  return {
    handleSubmit(type, state) {
      dispatch(auth(state, type))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(Auth)
export const Signup = connect(mapSignUp, mapDispatch)(Auth)

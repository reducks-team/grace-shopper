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
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {connect} from 'react-redux'
import {auth} from '../store'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    })
  }

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    })
  }

  componentDidMount() {}

  handleSubmit = event => {
    console.log(this.props)
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    this.props.signInUser(email, password)
  }

  render() {
    return (
      <div>
        <h1>Sign In</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label> Email </label>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </div>
          <div>
            <label> Password </label>
            <input
              type="number"
              name="password"
              value={this.state.campusId}
              onChange={this.handlePasswordChange}
            />
          </div>
          <button>Submit</button>
        </form>
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
    signInUser: (email, password, method = 'login') => {
      dispatch(auth(email, password, method))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

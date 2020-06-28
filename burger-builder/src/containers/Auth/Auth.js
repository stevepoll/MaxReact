import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import { makeArray, checkValid } from '../../shared/utility'
import Spinner from '../../components/UI/Spinner/Spinner'
import css from './Auth.css'
import * as actions from '../../store/actions/index'


class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          min: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  }

  componentDidMount = () => {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath()
    }
  }

  inputChangedHandler = (event, controlName) => {
    const val = event.target.value
    const rules = this.state.controls[controlName].validation
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: val,
        valid: checkValid(val, rules),
        touched: true
      }
    }
    this.setState({ controls: updatedControls })
  }

  submitHandler = (event) => {
    event.preventDefault()
    this.props.onAuth(
      this.state.controls.email.value, 
      this.state.controls.password.value,
      this.state.isSignup)
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup }
    })
  }

  render() {
    const elementArray = makeArray(this.state.controls)
    let form = elementArray.map(element => (
      <Input
        key={element.key}
        name={element.key}
        elementType={element.config.elementType}
        elementConfig={element.config.elementConfig}
        value={element.config.value}
        invalid={!element.config.valid}
        shouldValidate={element.config.validation}
        touched={element.config.touched}
        changed={(event) => this.inputChangedHandler(event, element.key)}  
      />
    ))

    if (this.props.loading) {
      form = <Spinner />
    }

    let errorMessage = null
    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }

    let authRedirect = null
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }
    return (
      <div className={css.Auth}>
        {authRedirect}
        { errorMessage }
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">{this.state.isSignup ? 'SIGN UP' : 'SIGN IN'}</Button>
        </form>
        <Button 
          clicked={this.switchAuthModeHandler}
          btnType="Danger">
            SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
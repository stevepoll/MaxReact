import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import axios from '../../../axios-orders'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import { makeArray, updateObject, checkValid } from '../../../shared/utility'
import * as actions from '../../../store/actions/index'
import css from './ContactData.css'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      address: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street Address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      city: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'City'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      state: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'State'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          min: 5,
          max: 10,
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliverymethod: {
        elementType: 'select',
        elementConfig: {
          options:  [ 
            { value: 'fastest', display: 'Fastest' },
            { value: 'cheapest', display: 'Cheapest' }
          ]
        },
        value: 'fastest',
        validation: {},
      },
    },
    formIsValid: false
  }

  orderHandler = (event) => {
    event.preventDefault()
    
    const formData = {}
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value
    }

    let price = (+this.props.price).toFixed(2)
    const order = {
      ingredients: this.props.ings,
      price: price,
      orderData: formData,
      userId: this.props.userId
    }

    this.props.onOrderBurger(order, this.props.token)
   
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedElement = updateObject(this.state.orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValid(event.target.value, this.state.orderForm[inputIdentifier].validation),
      touched: true
    })
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedElement
    })
    
    let formValid = true
    for (let id in updatedOrderForm) {
      if (updatedOrderForm[id].valid === false) {
        formValid = false
        break
      }
    }

    this.setState({orderForm: updatedOrderForm, formIsValid: formValid})
  }

  render() {
    const elementArray = makeArray(this.state.orderForm)
    let form = (
      <form onSubmit={this.orderHandler}>
        {elementArray.map(element => {
          return <Input 
            key={element.key} 
            name={element.key}
            elementType={element.config.elementType} 
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            invalid={!element.config.valid}
            shouldValidate={element.config.validation}
            touched={element.config.touched}
            changed={(event) => this.inputChangedHandler(event, element.key)} />
        })}
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER  </Button>
      </form>
    )
    if (this.props.loading) {
      form = <Spinner />
    }

    return (
      <div className={css.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}   
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))
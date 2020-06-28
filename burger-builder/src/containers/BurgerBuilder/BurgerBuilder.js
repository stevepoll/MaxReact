import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

import * as actions from '../../store/actions/index'

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
  }

  componentDidMount() {
    this.props.onInitIngredients()
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({purchasing: true})
    } else {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth')
    }
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    /* Without redux, need to pass ingredients & price thru query params */
    // const queryParams = []
    // const ingredients = this.props.ings
    // for (let ingredient in ingredients) {
    //   queryParams.push(encodeURIComponent(ingredient) + '=' + ingredients[ingredient])
    // }
    // queryParams.push('price=' + this.state.price)
    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: '?' + queryParams.join('&')
    // })

    /* With redux, no longer necessary */
    this.props.onInitPurchase()
    this.props.history.push('/checkout')
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    return sum > 0
  }

  // addIngredientHandler = (type) => {
  //   const updatedCount = this.state.ingredients[type] + 1
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   }
  //   updatedIngredients[type] = updatedCount

  //   const updatedPrice = this.state.price + INGREDIENT_PRICES[type]

  //   this.setState({
  //     ingredients: updatedIngredients,
  //     price: updatedPrice
  //   })
  //   this.updatePurchaseState(updatedIngredients)
  // }

  // removeIngredientHandler = (type) => {
  //   if (this.state.ingredients[type] > 0) {
  //     const updatedCount = this.state.ingredients[type] - 1
  //     const updatedIngredients = {
  //       ...this.state.ingredients
  //     }
  //     updatedIngredients[type] = updatedCount
  
  //     const updatedPrice = this.state.price - INGREDIENT_PRICES[type]
  
  //     this.setState({
  //       ingredients: updatedIngredients,
  //       price: updatedPrice
  //     })
  //     this.updatePurchaseState(updatedIngredients)
  //   }
  // }

  render() {
    let orderSummary = null
    let burger = <Spinner />
    
    if (this.props.ings) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            price={this.props.price}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            ingredients={this.props.ings}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            isAuth={this.props.isAuthenticated} />
        </Fragment>
      )

      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        price={this.props.price}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} 
        />
    }
    
    return (
      <Fragment>
        <Modal 
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    purchased: state.order.purchased,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
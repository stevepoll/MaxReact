import React, { Fragment, Component } from 'react'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
  render () {
    const ings = this.props.ingredients
    const ingredientSummary = Object.keys(ings)
      .map(igKey => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {ings[igKey]}
          </li>
        )
      })
    return (
      <Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>Cancel</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
      </Fragment >
    )
  }
}

export default OrderSummary
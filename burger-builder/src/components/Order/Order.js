import React from 'react'

import css from "./Order.css"

const order = (props) => {
  let ingredients = []
  for (let ingredient in props.ingredients) {
    ingredients.push({
      id: ingredient,
      value: props.ingredients[ingredient]
    })
  }

  let ingredientsOutput = ingredients.map(ing => {
    return (<span 
              key={ing.id}
              style={{
                display: 'inline-block', 
                textTransform: 'capitalize',
                padding: '3px',
                boxShadow: '2px 2px 1px #eee',
                margin: '0 8px'}}>
                {ing.id}: {ing.value}
          </span>)
  })
  return (
    <div className={css.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>Price: <strong>${props.price}</strong></p>
    </div>
  )
}

export default order
import React from 'react'

import BurgerIngredient from './BurgerIngredient'
import css from './Burger.css'

const burger = (props) => {
  let ingredients = []
  Object.keys(props.ingredients).forEach((ingredient) => {
    for (let i = 0; i < props.ingredients[ingredient]; i++) {
      ingredients.push(<BurgerIngredient type={ingredient} key={ingredient + i} />)
    }
  })
  if (ingredients.length === 0) {
    ingredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={css.Burger}>
      <BurgerIngredient type="bread-top"/>
      {ingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}

export default burger
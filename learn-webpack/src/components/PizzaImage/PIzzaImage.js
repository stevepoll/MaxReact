import React from 'react'

import css from './PizzaImage.css'
import PizzaImage from '../../assets/pizza.jpg'

const pizzaImage = (props) => (
  <div className={css.PizzaImage}>
    <img src={PizzaImage} className={css.PizzaImg}/>
  </div>
)

export default pizzaImage
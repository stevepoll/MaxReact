import React from 'react'
import { NavLink } from 'react-router-dom'
import css from './NavigationItem.css'

const navigationItem = (props) => (
  <li className={css.NavigationItem}>
    <NavLink 
      exact
      to={props.link}
      activeClassName={css.active}>
        {props.children}
    </NavLink>
  </li>
)

export default navigationItem
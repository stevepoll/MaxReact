import React from 'react'
import css from './DrawerToggle.css'

const drawerToggle = (props) => (
  <div onClick={props.clicked} className={css.DrawerToggle}>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

export default drawerToggle
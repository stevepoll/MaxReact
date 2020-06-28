import React, { Fragment } from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import css from './SideDrawer.css'


const sideDrawer = (props) => {
  let attachedCss = [css.SideDrawer, css.Close]
  if (props.open) {
    attachedCss = [css.SideDrawer, css.Open]
  }

  return (
    <Fragment>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedCss.join(' ')}>
        <div className={css.Logo}>
          <Logo />
        </div>
        <nav onClick={props.closed}>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Fragment>
  )
}

export default sideDrawer
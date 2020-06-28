import React from 'react'
import classes from './Cockpit.css'

const cockpit = (props) => {
  let btnClass = ''
  if (props.showPersons) {
    btnClass = classes.Red;
  }

  const classArr = []

  if (props.numPersons <= 2) { classArr.push(classes.red) } // classArr = ['red']
  if (props.numPersons <= 1) { classArr.push(classes.bold) } // classArr = ['red', 'bold']
  const classStr = classArr.join(' ')

  return (
    <div className={classes.Cockpit}>
      <h1>Hi, I'm a React App</h1>
      <p className={classStr}>This is really working!</p>
      <button
        className={btnClass}
        onClick={props.clicked}>Toggle Persons
          </button>
    </div>
  )
}

export default cockpit
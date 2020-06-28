import React from 'react'
import css from './Input.css'

const input = (props) => {
  let inputElement = null
  const inputClasses = [css.InputElement]

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(css.Invalid)
  }

  switch(props.elementType) {
    case('input'):
      inputElement = <input 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changed}/>
      break
    case('textarea'):
      inputElement = <textarea 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changed}/>
      break
    case('select'):
      inputElement = (
        <select 
          className={inputClasses.join(' ')}
          name={props.name}
          value={props.value}
          onChange={props.changed}>
          {props.elementConfig.options.map(option => {
            return <option key={option.value} value={option.value}>{option.display}</option>
          })}
        </select>
      )
    break
    default:
      inputElement = <input 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changed}/>
  }
  return (
    <div className={css.Input}>
      <label className={css.Label}>{props.label}</label>
      {inputElement}
    </div>
  )
}

export default input
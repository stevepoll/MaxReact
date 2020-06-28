import React from 'react';
import './UserOutput.css'

const UserOutput = (props) => {
  return (
    <p className='UserOutput'>My name is {props.userName}</p>
  )
}

export default UserOutput;
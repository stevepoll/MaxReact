import React from 'react';

const UserInput = (props) => {
  const inputStyle = {
    backgroundColor: "lightgray",
    padding: "10px",
    border: "2px solid red"
  }
  return (
    <div>
      <input type="text" 
        onChange={props.changed} 
        value={props.userName}
        style={inputStyle}
      />
    </div>
  )
}

export default UserInput;
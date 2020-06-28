import React from 'react';

const charComponent = (props) => {
  const inputStyle = {
    display: "inline-block",
    margin: "5px",
    backgroundColor: "lightgray",
    padding: "16px",
    border: "1px solid black",
    textAlign: "center"
  }
  return (
    <div 
      style={inputStyle}
      onClick={() => props.remove(this.refs)}>
      <p>{props.char}</p>
    </div>
  )
}

export default charComponent
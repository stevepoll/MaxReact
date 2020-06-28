import React from 'react';

const validationComponent = (props) => {
  const minLength = 5
  let lenMsg = ''

  if (props.charCount < minLength) {
    lenMsg = 'Text not long enough'
  }
  else {
    lenMsg = 'Text just right!'
  }

  return (
    <div>
      <p>Hello validation: {props.charCount}</p>
      <p>{lenMsg}</p>
    </div>
  )
}

export default validationComponent
import React, { Component } from 'react';

import './AddPerson.css';

class AddPerson extends Component {
  state = {
    name: '',
    age: ''
  }

  nameChangedHandler = (event) => {
    this.setState({name: event.target.value})
  }

  ageChangedHandler = (event) => {
    this.setState({age: event.target.value})
  }

  addPerson = () => {
    this.props.personAdded(this.state.name, this.state.age)
    this.setState({name: '', age: ''})
  }

  render() {
    return (
      <div className="AddPerson">
          <input type="text" 
            placeholder="Name" 
            onChange={this.nameChangedHandler} 
            value= {this.state.name} />
          <input type="number" 
            placeholder="Age" 
            onChange={this.ageChangedHandler}
            value={this.state.age} />
          <button onClick={this.addPerson}>Add Person</button>
      </div>
    )
  }
}


export default AddPerson;
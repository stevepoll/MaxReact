import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit'
import WithClass from '../hoc/WithClass';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] Inside Constructor', props)
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount')
  }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState)
    return true
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState)
  }

  componentDidUpdate() {
    console.log('[UPDATE App.js] Inside componentDidUpdate')
  }

  state = {
    persons: [
      {id: '1', name: 'Max', age: 28},
      {id: '2', name: 'Manu', age: 29},
      {id: '3', name: 'Stephanie', age: 26},
    ],
    showPersons: false,
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1)
    this.setState({persons: persons})
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    })

    // The below copies a reference to the object. DON'T DO THIS
    // const person = this.state.persons[personIndex]

    // Do this instead, using the ES6 spread operator to copy the object
    const person = { ...this.state.persons[personIndex] }
    person.name = event.target.value

    // Similarly, use the spread operator to copy the array of persons from state
    const persons = [...this.state.persons]
    persons[personIndex] = person

    this.setState({ persons: persons })
  }

  togglePersonsHandler = () => {
    this.setState({showPersons: !(this.state.showPersons)})
  }

  render() {
    console.log('[App.js] Inside render')
    let persons = null

    if (this.state.showPersons) {
      persons = <Persons 
                  persons={this.state.persons}
                  clicked={this.deletePersonHandler}
                  changed={this.nameChangedHandler} 
                />
    }

    return (
      <WithClass classes={classes.App}>
        <Cockpit 
          showPersons={this.state.showPersons}
          numPersons={this.state.persons.length} 
          clicked={this.togglePersonsHandler}
        />
        { persons }
      </WithClass>
    )
  }
}

export default App;

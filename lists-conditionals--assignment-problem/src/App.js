import React, { Component } from 'react';
import './App.css';
import Validation from './ValidationComponent'
import Char from './CharComponent'

class App extends Component {
  state = {
    charCount: 0,
    wordArray: [],
  }

  textChangedHandler = (event) => {
    const word = event.target.value
    const len = word.length

    const wordArray = word.split('')

    this.setState({ charCount: len, wordArray: wordArray })
  }

  removeHandler = (index) => {
    let chars = [...this.state.wordArray]
    chars.splice(index, 1)

    this.setState({ wordArray: chars })
  }
  
  render() {
    let chars = null
    
    chars = (
      <div>
        {this.state.wordArray.map((char, index) => {
          return (
            <Char 
              char={char}
              key={index}
              remove={() => this.removeHandler(index)} />
          )
        })}
      </div>
    )
    
    return (
      <div className="App">
        <ol>
          {/*<li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>*/}
          {/*<li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>*/}
          {/*<li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>*/}
          {/*<li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>*/}
          {/*<li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>*/}
          {/*<li>When you click a CharComponent, it should be removed from the entered text.</li>*/}
        </ol>
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
        <hr />
        <input type='text' onChange={this.textChangedHandler} value={this.state.wordArray.join('')}/>
        <p>Number of characters (App component): {this.state.charCount}</p>

        <Validation charCount={this.state.charCount}/>
        {chars}
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react'
import request from 'superagent';
import './App.css'

class App extends Component {
  constructor () {
    super()
    this.state = {value: ''};
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleClick(event) {
    request
      .post('http://localhost/backend/post')
      .send({"Name": "Mauro"})
      .then(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.value}
          onChange={(e) => this.handleChange(e)}
        />
        <input
          type="button"
          value="Click"
          onClick={(e) => this.handleClick(e)}
        />
      </div>
    );
  }
}
export default App

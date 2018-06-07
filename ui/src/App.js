import React, { Component } from 'react'
import request from 'superagent';
import './App.css'

class App extends Component {
  constructor () {
    super()
    this.state = {value: ''};
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleClick(event) {
      request
      .post('http://localhost:80/backend/post')
      .send({"Name": "Mauro"})
      .then(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
    }

  render() {
    return (
      <form onSubmit={This.habdleClick.bind(this)}>
        <label>
          Name:
          <input type="text" value="mierda" onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default App

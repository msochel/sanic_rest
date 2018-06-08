import React, { Component } from 'react'
import request from 'superagent';
import './App.css'

class App extends Component {
  constructor () {
    super()
    this.state = {
        name: '',
        names: [],
      };
      this.ComponentDidMount();
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  handleClick(event) {
    request
      .post('http://localhost/backend/post')
      .send({"name": this.state.name})
      .then(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
  }

  ComponentDidMount() {
    request
    .get('http://localhost/backend/get')
    .set('Accept', 'application/json')
    .then(res => {
      this.setState({
        names: res.body.data
      });
      console.log("Me montaron")
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={(e) => this.handleChange(e)}
        />
        <input
          type="button"
          value="Click"
          onClick={(e) => this.handleClick(e)}
        />
        <ul>
          {
            this.state.names.map(r => (
              <li key={r._id}>
                {r.name}
              </li>
              ))
            }
        </ul>
      </div>
    );
  }
}
export default App

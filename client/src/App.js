import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from "./Dashboard";
import axios from 'axios';

class App extends Component {

  constructor() {
    super();

    this.state = {};

  }

  get_values = (event) => {
    const name = event.target.name; // username
    const val = event.target.value // values

    console.log("Name: ", name);
    console.log("Value: ", val);
    this.setState({ [name]: val });
  };


  sign_up = (event) => {
    event.preventDefault();
    console.log(this.state);

    axios({
      url:"/signup",
      method:"POST",
      data:this.state
    })
    .then((data) => {
      // TODO
      console.log("Data: ", data);
    })
    .catch((err) => {
      // TODO
      console.log("Error: ", err.response );
    });
  };


  render() {
    return (
      <div>
        <form >
          <input type="text" name="username" onChange={this.get_values} />
          <input type="password" name="password" onChange={this.get_values} />
          <button onClick={this.sign_up}> Sign Up</button>
        </form>
      </div>
    );
  }
}


const Routes = () => {

  return (
    <BrowserRouter >
      <div>
        <Route path="/" exact component={App} />
        <Route path="/dashboard" exact component={Dashboard} />
      </div>
    </BrowserRouter>
  );
};

export default Routes;
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from "./Dashboard";
import Signin from "./Signin";
import axios from 'axios';
import "./signin.css";


class App extends Component {

  constructor() {
    super();

    this.state = {};

  }

  get_values = (event) => {
    const name = event.target.name; // username
    const val = event.target.value // values
    this.setState({ [name]: val });
  };


  sign_up = (event) => {
    event.preventDefault();
    console.log(this.state);

    axios({
      url: "/signup",
      method: "POST",
      data: this.state
    })
      .then((data) => {
        this.props.history.push("/dashboard");
      })
      .catch((error) => {
        // TODO
        console.log("Error: ", error.response);
        this.setState({ error: error.response.data.error });
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

        <div>
          <p className="errors"> {this.state.error}</p>
        </div>
      </div>
    );
  }
}


const Routes = () => {

  return (
    <BrowserRouter >
      <div>
        <Route path="/" exact component={App} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/dashboard" exact component={Dashboard} />
      </div>
    </BrowserRouter>
  );
};

export default Routes;
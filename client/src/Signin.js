import React, { Component } from 'react';
import axios from 'axios';
import "./signin.css";

class Signin extends Component {
    constructor() {
        super();
        
        this.state = {}
    }
    

    get_values = (event) => {
        const name = event.target.name;
        const values = event.target.value;
        this.setState({[name] : values});
    };

    signin_user = (event) => {
        event.preventDefault();
        axios({
            url:"/signin",
            method:"POST",
            data:this.state // get username, and password from state
        })
        .then((response) => {
            this.props.history.push("/dashboard");
        })
        .catch((error) => {
            console.log("Error: ", error.response);
            this.setState({error: error.response.data.error});
        })
    };

    render() {
        return (
            <div>
                <h1>Please sign in if you are already a user</h1>
                <form >
                    <input type="text" name = "username" onChange = {this.get_values}/>
                    <input type="text" name = "password" onChange = {this.get_values}/>
                    <button onClick = {this.signin_user}>Sign in</button>
                </form>

                <div>
                    <p className ="errors"> { this.state.error  }</p>
                </div>
            </div>
        );
    }
}



export default Signin;
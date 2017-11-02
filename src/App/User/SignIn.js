import React, { Component } from 'react';
import UserApi from '../../Api/UserApi.js';

import './SignIn.css';

class SignIn extends Component {
  constructor(props){
    super(props)
    this.state = {
      userList: []    
    }
    this.signIn = this.signIn.bind(this);
  }
  componentDidMount(){
    UserApi.getUserList().then(list => {
      this.setState({ userList: list })
    })
  }
  signIn(user){
    this.props.signInHandler(user)
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="column" id="header">
            <h1>Please Sign In</h1>
          </div>
        </div>
        {this.state.userList.map((usr, i) => {
          return (
            <div className="row" key={i}>
              <div className="user-wrapper">
                <h3>{usr.name}</h3>
                <button className="button-outline" onClick={e => {this.signIn(usr)}}>
                  Sign in
                </button>
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}

export default SignIn;
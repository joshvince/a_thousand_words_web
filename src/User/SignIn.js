import React, { Component } from 'react';
import UserApi from '../Api/UserApi.js';
import {Container, Button, Header} from 'semantic-ui-react';

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
      <div style={{padding: '4em 0em'}}>
        <Container text textAlign='center'>
          <Header as='h1' content='Please Sign In' />
          {this.state.userList.map((usr, i) => {
            return (
              <Button 
                secondary 
                content={usr.name} 
                key={i} 
                onClick={e => this.signIn(usr)}
              />
            )
          })}
        </Container>
      </div>
    );
  }
}

export default SignIn;
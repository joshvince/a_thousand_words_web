import React, { Component } from 'react';
import UserApi from '../Api/UserApi.js';
import {Container, Button, Header} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

const styles = {
  pageContainer: {marginTop: '5em', padding: '4em 0em'},
  pageTitle: {fontSize: '4em', marginBottom: '1em'}
}

class SignIn extends Component {
  constructor(props){
    super(props)
    this.state = {
      userList: [],
      fireRedirect: false
    }
    this.signIn = this.signIn.bind(this);
  }
  componentDidMount(){
    window.scrollTo(0,0);
    UserApi.getUserList().then(list => {
      this.setState({ userList: list })
    })
  }
  signIn(user){
    this.props.signInHandler(user)
    this.setState({fireRedirect: true})
  }
  render() {
    return (
      <div style={styles.pageContainer}>
        <Container text textAlign='center'>
          <Header as='h1' content='Please Sign In' style={styles.pageTitle}/>
          {this.state.userList.map((usr, i) => {
            return (
              <Button 
                secondary 
                content={usr.name} 
                key={i} 
                onClick={e => this.signIn(usr)}
                size="massive"
              />
            )
          })}
          {this.state.fireRedirect && <Redirect to='/stories' />}
        </Container>
      </div>
    );
  }
}

export default SignIn;
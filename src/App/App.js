// Import dependencies
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import the API clients and other helper modules
import UserStorage from '../User/UserStorage.js';

// Import components and styles
import Nav from './Nav/Nav.js';
import SignIn from '../User/SignIn.js';
import Homepage from '../Homepage/Homepage.js';
import StoryHomePage from '../Story/StoryHomePage.js';
import StoryViewer from '../Story/Story/Viewer/StoryViewer.js';
import StoryCreator from '../Story/Story/Creator/StoryCreator.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      signedIn: false,
      currentUser: null
    }
    this.signInHandler = this.signInHandler.bind(this);
    this.signOutHandler = this.signOutHandler.bind(this);
  }

  componentWillMount(){
    const storedUser = UserStorage.getCurrentUser();
    if (storedUser) {
      this.setState({
        signedIn: true,
        currentUser: storedUser
      })
    }
  }

  signInHandler(newUser){
    UserStorage.setCurrentUser(newUser);
    this.setState({
      signedIn: true,
      currentUser: newUser
    })
  }

  signOutHandler(){
    UserStorage.removeCurrentUser();
    this.setState({
      signedIn: false,
      currentUser: null
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/" render={() => {
            return (
              <Nav 
                currentUser={this.state.currentUser} 
                signedIn={this.state.signedIn}
                signOutHandler={this.signOutHandler}
              />
            )
          }} 
          />
          <Route exact path="/" component={Homepage} />
          <Route
            exact path="/signin"
            render={() => {
              return (
                <SignIn 
                  signedIn={this.state.signedIn} 
                  currentUser={this.state.currentUser}
                  signInHandler={this.signInHandler}
                />
              )
            }}
          />
          <Switch>
            <Route 
              exact path="/stories"
              render={() => {
                if (!this.state.signedIn) {
                  return <SignIn signInHandler={this.signInHandler} />
                }
                else {
                  return <StoryHomePage currentUser={this.state.currentUser}/>;
                }
              }}
            />
            <Route exact path="/stories/new" 
              render={() => {
                if (!this.state.signedIn) {
                  return <SignIn signInHandler={this.signInHandler} />
                }
                else {
                  return <StoryCreator currentUser={this.state.currentUser}/>;
                }
              }}
            />
            <Route 
              path="/stories/:storyId" 
              render={({match}) => <StoryViewer storyId={match.params.storyId} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

// Import dependencies
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import the API clients and other helper modules
import UserStorage from '../User/UserStorage.js';
// This one clears the nav for each main page
import ClearNavContainer from './ClearNavContainer';

// Import components and styles
import Nav from './Nav/Nav';
import SignIn from '../User/SignIn';
import Homepage from '../Homepage/Homepage';
import ArchiveContainer from '../Archive/ArchiveContainer';
import StoryViewer from '../Story/Story/Viewer/StoryViewer';
import StoryCreator from '../Story/Story/Creator/StoryCreator';
import PictureCreator from '../Picture/Creator/PictureCreator';
import PictureViewerContainer from '../Picture/Viewer/PictureViewerContainer';
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
          <Route exact path="/signin"
            render={() => {
              return (
                <ClearNavContainer
                  children={
                    <SignIn
                      signedIn={this.state.signedIn}
                      currentUser={this.state.currentUser}
                      signInHandler={this.signInHandler}
                    />
                  }
                />
              )
            }}
          />
          <Switch>
            <Route exact path="/archive"
              render={() => {
                let renderedComponent ;
                (!this.state.signedIn) ?
                  renderedComponent = <SignIn signInHandler={this.signInHandler} />
                :
                  renderedComponent = <ArchiveContainer currentUser={this.state.currentUser}/>
                return <ClearNavContainer children={renderedComponent} />
              }}
            />
            <Route exact path="/stories/new"
              render={() => {
                let renderedComponent ;
                (!this.state.signedIn) ?
                  renderedComponent = <SignIn signInHandler={this.signInHandler} />
                :
                  renderedComponent = <StoryCreator currentUser={this.state.currentUser}/>
                return <ClearNavContainer children={renderedComponent}/>
              }}
            />
            <Route path="/stories/:storyId"
              render={({match}) => {
               return <ClearNavContainer children={<StoryViewer storyId={match.params.storyId} />} />
              }}
            />
            <Route exact path="/pictures/new"
              render={() => {
                let renderedComponent ;
                (!this.state.signedIn) ?
                  renderedComponent = <SignIn signInHandler={this.signInHandler} />
                :
                  renderedComponent = <PictureCreator currentUser={this.state.currentUser} />
                return <ClearNavContainer children={renderedComponent} />
            }}
            />
            <Route path="/pictures/:pictureId"
              render={({match}) => {
                return (<ClearNavContainer
                  children={<PictureViewerContainer pictureId={match.params.pictureId}/>}
                />)
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

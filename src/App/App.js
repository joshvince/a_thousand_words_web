// Import dependencies
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import the API clients and other helper modules
import PictureApi from '../Api/PictureApi.js';
import UserStorage from '../User/UserStorage.js';

// Import components and styles
import SignIn from '../User/SignIn.js';
import PictureMap from '../Map/PictureMap.js';
import PictureCreator from '../Picture/Creator/PictureCreator.js';
import Homepage from '../Homepage/Homepage.js';
import StoryHomePage from '../Story/StoryHomePage.js';
import StoryViewer from '../Story/Story/StoryViewer.js';
import StoryCreator from '../Story/Story/Creator/StoryCreator.js';
// import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      pictureList: [],
      signedIn: false,
      currentUser: null
    }
    this.updateWithPictures = this.updateWithPictures.bind(this);
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
      this.updateWithPictures(storedUser.id)
    }
  }
  signInHandler(newUser){
    UserStorage.setCurrentUser(newUser);
    this.setState({
      signedIn: true,
      currentUser: newUser
    })
    this.updateWithPictures(newUser.id)
  }
  signOutHandler(){
    UserStorage.removeCurrentUser();
    this.setState({
      signedIn: false,
      currentUser: null
    })
  }
  updateWithPictures(userId){
    PictureApi.getPicturesFromUser(userId).then(apiResponse => {
      this.setState({
        pictureList: apiResponse.Items,
        totalPictures: apiResponse.Count
      })
    })
  }
  render() {
    return (
      <Router>
        <div>
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
          <Route exact path="/stories/1" component={StoryViewer} />
          <Route exact path="/stories/new" 
            render={() => <StoryCreator currentUser={this.state.currentUser} />} 
          />
          <Route 
            exact path="/map" 
            render={({ location }) => { 
              let shouldRenderPic = false;
              let activePic = {};
              if (location.state) {
                shouldRenderPic = true;
                activePic = location.state.activePic
              }
              return (
                <PictureMap 
                  pictureList={this.state.pictureList}
                  renderWithPictureActive={shouldRenderPic} 
                  activePicture={activePic}
                />
              );
            }}
          />
          <Route 
            exact path="/pictures/new"
            render={(props) => { return <PictureCreator currentUser={this.state.currentUser}/>}}
          />
        </div>
      </Router>
    );
  }
}

export default App;

// Import dependencies
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'milligram';

// Import the API client
import PictureApi from '../Api/PictureApi.js';

// Import components and styles
import Nav from './Nav/Nav.js';
import PictureMap from '../Map/PictureMap.js';
import PictureCreator from '../Picture/Creator/PictureCreator.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      pictureList: []
    }
  }
  async componentDidMount(){
    let pics = await PictureApi.getAllPictures();
    this.setState({
      pictureList: pics
    })
  }
  render() {
    return (
      <Router>
        <div id="appContainer">
          <Route path="/" component={Nav}/>
          <div className="container" id="contentContainer">
            <Route 
              exact path="/pictures" 
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
              render={(props) => { return <PictureCreator/>}}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

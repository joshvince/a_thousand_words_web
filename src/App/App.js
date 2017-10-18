// Import dependencies
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'milligram';

// Import components and styles
import Nav from './Nav/Nav.js';
import PictureMap from '../Map/PictureMap.js';
import PictureCreator from '../Picture/Creator/PictureCreator.js';
import './App.css';

// Import other helper modules
import PictureApi from '../Api/PictureApi.js';

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
              render={(props) => { return <PictureMap pictureList={this.state.pictureList} />}}
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

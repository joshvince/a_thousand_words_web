// Import dependencies
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'milligram';

// Import components and styles
import Nav from './Nav/Nav.js';
import PictureMap from '../Map/PictureMap.js';
import PictureCreator from '../Picture/Creator/PictureCreator.js';
import PictureList from '../Picture/Edit/PictureList.js';
import './App.css';

// Import other helper modules
import PictureChannel from '../Socket/pictureChannel.js';
import PictureApi from '../Api/PictureApi.js';

class App extends Component {
  constructor(props){
    super(props)
    let channel = PictureChannel.join(this.props.socket)
    this.state = {
      channel: channel,
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
              render={(props) => { return <PictureCreator channel={this.state.channel} />}}
            />
            <Route 
              exact path="/pictures/edit"
              render={(props) => { return <PictureList list={this.state.pictureList} channel={this.state.channel}/>}}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

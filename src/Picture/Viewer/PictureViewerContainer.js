import React, { Component } from 'react';
import {Dimmer, Loader} from 'semantic-ui-react';
import View from './View';
import PictureApi from '../../Api/PictureApi';

const styles = {
  pageContainer: {
    paddingTop: '1em'
  }
}


class PictureViewerContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      displayLoader: true
    }
  }
  componentDidMount = async () => {
    window.scrollTo(0,0);
    const picture = await PictureApi.getOnePicture(this.props.pictureId)
    this.setState({pictureData: picture, displayLoader: false})
  }
  render() {
    return (
      <div style={styles.pageContainer}>
        <Dimmer page active={this.state.displayLoader}>
          <Loader size="huge"/>
        </Dimmer>
        {this.state.displayLoader ? null :
          <View picture={this.state.pictureData}/>
        }
      </div>
    );
  }
}

export default PictureViewerContainer;
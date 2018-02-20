import React, { Component } from 'react';
import {Container, Header} from 'semantic-ui-react';
import Uploader from '../../App/Uploader/Uploader';
import PictureForm from './Form';

import PictureApi from '../../Api/PictureApi';

const styles = {
  pageContainer: {marginTop: '8em'},
  header: {fontSize: '4em'}
}

class PictureCreator extends Component {
  constructor(props){
    super(props)
    this.state = {
      showUploader: false,
      uploadInProgress: false,
      uploadSuccess: null,
      pictureId: null
    }
  }

  createPicture = (payload) => {
    let userId = this.props.currentUser.id;
    this.setState({
      showUploader: true,
      uploadInProgress: true
    })
    PictureApi.createPicture(payload.file, payload.name, userId).then(resp => {
      if (resp.success) {
        this.setState({
          uploadInProgress: false,
          uploadSuccess: true, 
          pictureId: resp.object.uuid
        })
      }
      else {
        this.setState({
          uploadInProgress: false,
          uploadSuccess: false
        })
      }
    })
    
  }

  render() {
    return (
      <Container style={styles.pageContainer}>
        {this.state.showUploader ? 
          <Uploader 
            isInProgress={this.state.uploadInProgress} 
            result={this.state.uploadSuccess}
            redirectRoot="/pictures"
            objectId={this.state.pictureId}
          /> : null}
        <Header style={styles.header} as="h1" content="Create a new picture"/>
        <PictureForm submitHandler={this.createPicture}/>
      </Container>
    );
  }
}

export default PictureCreator;
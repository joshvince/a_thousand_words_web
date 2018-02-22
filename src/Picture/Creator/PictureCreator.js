import React, { Component } from 'react';
import {Container, Header, Segment} from 'semantic-ui-react';
import Uploader from '../../App/Uploader/Uploader';
import PictureForm from './Form';

import PictureApi from '../../Api/PictureApi';

const styles = {
  pageContainer: {marginTop: '6em'},
  header: {
    header: {
      fontSize: '4em'
    },
    text: {
      fontSize: '1.6em',
      margin: '1.5em 0'
    }
  }
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
      <Container style={styles.pageContainer} fluid>
        {this.state.showUploader ? 
          <Uploader 
            isInProgress={this.state.uploadInProgress} 
            result={this.state.uploadSuccess}
            redirectRoot="/pictures"
            objectId={this.state.pictureId}
          /> : null}
        <Segment basic inverted vertical>
          <Header as="h1" content="Upload a new picture" style={styles.header.header}/>
          <Container text>
            <p style={styles.header.text}>
              Upload a picture to your archive so you can use it in stories.
            </p>
          </Container>
        </Segment>
        <PictureForm submitHandler={this.createPicture}/>
      </Container>
    );
  }
}

export default PictureCreator;
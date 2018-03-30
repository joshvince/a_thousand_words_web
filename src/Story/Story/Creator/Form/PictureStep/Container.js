import React, { Component } from 'react';
import {Segment} from 'semantic-ui-react';
import PictureSelector from './PictureSelector';
import PictureView from '../../../../../Picture/Viewer/PictureViewerContainer';

const styles = {
  container: {
    margin: '1em'
  }
}

class PictureStepContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      editing: this.props.editing,
      data: this.props.data
    }
    this.updateParentWithData(this.state.data, true)
  }

  updateParentWithData = (data, editValue) => {
    const payload = {
      editing: editValue,
      section: "step",
      data: {...data, type: "picture"}
    }
    this.props.submitHandler(payload)
  }

  updateData = (newData) => {
    this.setState({
      data: newData,
      editing: false
    })
    this.updateParentWithData(newData, false)
  }

  handleDelete = () => {
    let key = this.props.data.stepKey
    this.props.deleteHandler(key)
  }

  toggleEdit = () => {
    this.setState({editing: !this.state.editing})
    this.updateParentWithData(this.state.data, true)
  }

  render() {
    const key = this.props.data.stepKey
    return (
      <div style={styles.container}>
        <Segment>
          {this.state.editing ?
            <PictureSelector
              stepKey={key}
              currentUser={this.props.currentUser}
              onSelect={this.updateData}
            />
          :
            <PictureView pictureId={this.state.data.pictureId} />

          }
        </Segment>
      </div>
    );
  }
}

export default PictureStepContainer;

/*
TODO:
- this should behave in a very similar way to the textstepcontainer.
I tried to extract out the helper functons to a separeate module but couldn't get
it to work.

- you should be able to select a picture from some sort of list (modal vs in line?)

- selecting the picture should flip you to the picture view

*/
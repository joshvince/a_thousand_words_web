import React, {Component} from 'react';
import { Container, Header, Button, Loader, Segment, Image, Card} from 'semantic-ui-react';
import SelectablePictureCard from './SelectablePictureCard';
import PictureApi from '../../../../../Api/PictureApi';

const styles = {
  listContainer: {
    // width: '50%'
  }
}

class PictureSelector extends Component {
  constructor(props){
    super(props)
    this.state = {
      pictureList: [], loader: true
    }
  }

  componentWillMount = () => {
    PictureApi.getPicturesByUser(this.props.currentUser.id)
    .then( res => {
      this.setState({
        pictureList: res.Items,
        loader: false
      })
    })
  }

  handleSelect = (pictureData) => {
    const payload = {
      type: 'picture',
      name: pictureData.name,
      url: pictureData.url,
      pictureId: pictureData.uuid,
      stepKey: this.props.stepKey
    }
    this.props.onSelect(payload)
  }

  render() {
    return (
      <Segment basic>
        <Segment basic>
          <Header as='h2' content='Select a picture from your archive'/>
        </Segment>
        <Segment style={styles.listContainer}>
          <Loader active={this.state.loader}/>
          {this.state.loader ? null :
            [
              <Card.Group>
                {this.state.pictureList.map((pic, i) => {
                  return (
                    <SelectablePictureCard
                      key={i}
                      pictureData={pic}
                      clickHandler={e => this.handleSelect(pic)}
                    />
                  )
                })}
                <p>TODO: add new picture from this view</p>
              </Card.Group>
            ]
          }
        </Segment>
      </Segment>
    );
  }
}

export default PictureSelector;
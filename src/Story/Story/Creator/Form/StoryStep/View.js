import React, { Component } from 'react';
import { Segment, Container, Header, Button, Icon, Image} from 'semantic-ui-react';

const styles = {
  container: {
    padding: '2em 0em'
  },
  warningText: {
    color: 'red'
  },
  headline: {
    fontSize: '3em', 
    fontWeight: 'normal', 
    marginBottom: 0
  },
  description: {
    fontSize: '1.4em'
  }
}

class StoryStepView extends Component {

  componentDidMount = () => {
    let key = this.props.stepKey
    console.log(`mounted a view component with stepkey ${key}`)
    this[`view${key}`].scrollIntoView(true, {behavior: 'smooth'});
    window.scrollBy(0, -100)
  }

  render() {
    return (
      <div ref={el => { this[`view${this.props.stepKey}`] = el; }}>
        <Container fluid>
          <Segment vertical style={styles.container}>
            {this.props.imagePreviewUrl ? 
              <Container fluid>
                <Image src={this.props.imagePreviewUrl} size="massive" centered/>
              </Container> : 
              <Container fluid>
                <Icon name="image" size="massive" color="red"/>
                <p style={styles.warningText}>You still need to upload an image</p>
              </Container>
            }
            <Header as='h2' content={this.props.headline} style={styles.headline}/>
            <p style={styles.description}>{this.props.description}</p>
            <Button 
              basic 
              size="big" 
              content="Edit this part" 
              onClick={e => this.props.submitHandler()} 
            />
          </Segment>
        </Container>
      </div>
    );
  }
}

export default StoryStepView;
import React from 'react';
import { Segment, Divider, Container, Header, Button, Icon} from 'semantic-ui-react';

const styles = {
  image: {
  },
  imageContainer: {
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
const StoryStepView = ({headline, year, description, submitHandler}) => {
  return (
    <Container text>
      <Segment vertical style={styles.imageContainer}>
        <Icon name="image" size="massive" style={styles.image} color="red"/>
        <p style={styles.warningText}>You still need to upload an image</p>
      <Header as='h2' content={headline} style={styles.headline}/>
      <Header as='h2' content={year} />
      <p style={styles.description}>{description}</p>
      <Button size="big" content="Edit" onClick={e => submitHandler()} />
      </Segment>
    </Container>
  );
};

export default StoryStepView;
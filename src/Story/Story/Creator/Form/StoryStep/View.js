import React from 'react';
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
const StoryStepView = ({headline, year, description, imagePreviewUrl, submitHandler}) => {
  const noImage = (
    <Container fluid>
      <Icon name="image" size="massive" color="red"/>
      <p style={styles.warningText}>You still need to upload an image</p>
    </Container>
  )
  const imagePreview = (
    <Container fluid>
      <Image src={imagePreviewUrl} size="massive" centered/>
    </Container>
  )
  return (
    <Container fluid>
      <Segment vertical style={styles.container}>
      {imagePreviewUrl ? imagePreview : noImage}
      <Header as='h2' content={headline} style={styles.headline}/>
      <Header as='h2' content={year} />
      <p style={styles.description}>{description}</p>
      <Button basic size="big" content="Edit this step" onClick={e => submitHandler()} />
      </Segment>
    </Container>
  );
};

export default StoryStepView;
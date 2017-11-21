import React from 'react';
import { Segment, Divider, Container, Header, Button, Icon, Image} from 'semantic-ui-react';

const styles = {
  imageContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    maxHeight: '80vh'
  },
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
    <div>
      <Icon name="image" size="massive" style={styles.image} color="red"/>
      <p style={styles.warningText}>You still need to upload an image</p>
    </div>
  )
  const imagePreview = (
    <div style={styles.imageContainer}>
      <Image src={imagePreviewUrl} style={styles.image}/>
    </div>
  )
  return (
    <Container text>
      <Segment vertical style={styles.container}>
      {imagePreviewUrl ? imagePreview : noImage}
      <Header as='h2' content={headline} style={styles.headline}/>
      <Header as='h2' content={year} />
      <p style={styles.description}>{description}</p>
      <Button size="big" content="Edit" onClick={e => submitHandler()} />
      </Segment>
    </Container>
  );
};

export default StoryStepView;
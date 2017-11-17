import React from 'react';
import { Segment, Container, Header} from 'semantic-ui-react';

const styles = {
  segment: {
    minHeight: 700, 
    padding: '1em 0em'
  },
  title: {
    fontSize: '4em', 
    fontWeight: 'normal', 
    marginBottom: 0, 
    marginTop: '3em'
  },
  subtitle: {
    fontSize: '1.7em', 
    fontWeight: 'normal'
  }
}
const PageHeader = ({title, subtitle, button}) => {
  return (
    <Segment textAlign='center' style={styles.segment} vertical inverted>
      <Container text>
        <Header as='h1' content={title} inverted style={styles.title}/>
        <Header as='h2' content={subtitle} inverted style={styles.subtitle} />
        {button}
      </Container>
    </Segment>
  );
};

export default PageHeader;
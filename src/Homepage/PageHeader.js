import React from 'react';
import { Segment, Container, Header, Responsive, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const styles = {
  pageContainer: {
    minHeight: '100vh',
    marginTop: '5em',
    padding: '1em 0em'
  },
  title: {
    desktop: {
      fontSize: '3.6em', 
      marginTop: '3em'
    },
    mobile: {
      fontSize: '2em',
      marginTop: '3em'
    }
  },
  subtitle: {
    desktop: {
      fontSize: '1.7em', 
      fontWeight: 'normal',
      marginTop: '2em'
    },
    mobile: {
      fontSize: '1.3em', 
      fontWeight: 'normal',
      marginTop: '2em'
    }
  },
  cta: {
    marginTop: '1.5em'
  }
}
const PageHeader = ({title, subtitle}) => {
  return (
    <Segment textAlign='center' style={styles.pageContainer} vertical inverted>
      <Container text>
        <Responsive minWidth={768}>
          <Header as='h1' content={title} inverted style={styles.title.desktop}/>
          <Header as='h2' content={subtitle} inverted style={styles.subtitle.desktop} />
        </Responsive>
        <Responsive maxWidth={768}>
          <Header as='h1' content={title} inverted style={styles.title.mobile}/>
          <Header as='h2' content={subtitle} inverted style={styles.subtitle.mobile} />
        </Responsive>
        <Button 
          primary 
          size="huge" 
          content="Get Started" 
          as={Link} 
          to="/stories" 
          style={styles.cta}
        />
      </Container>
    </Segment>
  );
};

export default PageHeader;
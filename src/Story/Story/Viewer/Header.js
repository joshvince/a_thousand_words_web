import React from 'react';
import { Segment, Header, Container, Responsive } from 'semantic-ui-react';

const styles = {
  segment: {
    minHeight: 'calc(100vh - 5em)', 
    padding: '1em 0em'
  },
  title: {
    desktop: {
      fontSize: '5em', 
      fontWeight: 'normal', 
      marginBottom: 0, 
      marginTop: '3em'
    }, 
    mobile: {
      fontSize: '3em', 
      fontWeight: 'normal', 
      marginBottom: 0, 
      marginTop: '2em'
    }
  },
  subtitle: {
    desktop: {
      fontSize: '1.7em', 
      fontWeight: 'normal'
    }, 
    mobile: {
      fontSize: '1.2em', 
      fontWeight: 'normal',
      marginBottom: '1em'
    }
  }
}

const StoryHeader = ({title, subtitle, numberOfPics, button}) => {
  return (
    <Segment textAlign="center" inverted vertical style={styles.segment} >
      <Responsive as={Container} minWidth={768}>
        <Header as='h1' content={title} inverted style={styles.title.desktop}/>
        <Header as='h2' content={subtitle} inverted style={styles.subtitle.desktop} />
        <Header 
          as='h3' 
          content={`${numberOfPics} pictures`} 
          inverted 
          style={styles.subtitle.desktop} 
        />
        {button}
      </Responsive>
      <Responsive as={Container} maxWidth={768}>
        <Header as='h1' content={title} inverted style={styles.title.mobile}/>
        <Header as='h2' content={subtitle} inverted style={styles.subtitle.mobile} />
        <Header 
          as='h3' 
          content={`${numberOfPics} pictures`} 
          inverted 
          style={styles.subtitle.mobile} 
        />
        {button}
      </Responsive>
    </Segment>
  );
};

export default StoryHeader;
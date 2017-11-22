import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ArchiveItem from './ArchiveItem.js';

const styles = {
  container: {
    padding: '2em 0em'
  },
  buttonCard: {
    inner: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%'
    },
    outer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '1em'
    }
  }
}

const StoryArchive = ({storyList}) => {
  let shouldCenter = ((storyList.length + 1) % 3 === 0);
  return (
    <div style={styles.container}>
      <Card.Group>
        <Card 
          style={styles.buttonCard.outer} 
          as={Link} 
          to="/stories/new" 
          centered={shouldCenter}
        >
          <div style={styles.buttonCard.inner}> 
            <Icon name="plus" size="huge"/>
          </div>
        </Card>
      
        {storyList.map((story, i) => {
          return <ArchiveItem storyData={story} key={i} shouldCenter={shouldCenter}/>
        })}
      </Card.Group>
    </div>
  );
};

export default StoryArchive;
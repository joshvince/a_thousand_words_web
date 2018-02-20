import React from 'react';
import { Card } from 'semantic-ui-react';
import ArchiveItem from './ArchiveItem.js';
import NewStoryCard from './NewStoryCard.js';
import EmptyArchive from './EmptyArchive.js';

const styles = {
  container: {
    padding: '2em 0em'
  },
  cardWrapper: {
    display: 'flex',
    justifyContent: 'flexStart'
  }
}

const StoryArchive = ({storyList}) => {
  return (
    <div style={styles.container}>
    {!storyList.length ? 
      <EmptyArchive/> :
      <Card.Group stackable style={styles.cardWrapper}>
        <NewStoryCard/>
        {storyList.map((story, i) => <ArchiveItem storyData={story} key={i}/>)}
      </Card.Group>}
    </div>
  );
};

export default StoryArchive;
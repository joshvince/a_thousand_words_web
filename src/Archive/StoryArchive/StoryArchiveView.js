import React from 'react';
import { Card, Container } from 'semantic-ui-react';
import ArchiveItem from './ArchiveItem.js';
import NewItemCard from '../NewItemCard.js';
import EmptyArchive from '../EmptyArchive.js';

const styles = {
  pageContainer: {
    padding: '2em 0em'
  },
  cardWrapper: {
    display: 'flex',
    justifyContent: 'flexStart'
  }
}

const StoryArchive = ({storyList}) => {
  return (
    <Container style={styles.pageContainer}>
      {!storyList.length ? 
        <EmptyArchive 
          header="You don't have any stories yet"
          subheader="Click to get started"
          url="/stories/new"
          iconName="write"
        /> :
        <Card.Group stackable style={styles.cardWrapper}>
          <NewItemCard
            url="/stories/new"
            text="Create a new story"
            iconName="write"
          />
          {storyList.map((story, i) => <ArchiveItem storyData={story} key={i}/>)}
        </Card.Group>}
    </Container>
  );
};

export default StoryArchive;
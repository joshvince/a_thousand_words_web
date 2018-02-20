import React from 'react';
import { Card, Container } from 'semantic-ui-react';
import NewItemCard from '../NewItemCard';
import EmptyArchive from '../EmptyArchive';
import ArchiveItem from './ArchiveItem';

const styles = {
  pageContainer: {
    padding: '2em 0em'
  },
  cardWrapper: {
    display: 'flex',
    justifyContent: 'flexStart'
  }
}

const PictureArchive = ({pictureList}) => {
  return (
    <Container style={styles.pageContainer}>
      {!pictureList.length ? 
        <EmptyArchive 
          header="You don't have any pictures yet"
          subheader="Click to get started"
          url="/pictures/new"
          iconName="image"
        /> :
        <Card.Group stackable style={styles.cardWrapper}>
          <NewItemCard
            url="/pictures/new"
            text="Upload a new Picture"
            iconName="image"
          />
          {pictureList.map((picture, i) => <ArchiveItem pictureData={picture} key={i}/>)}
        </Card.Group>}
    </Container>
  );
};

export default PictureArchive;
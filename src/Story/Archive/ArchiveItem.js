import React from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const styles = {
  header: {
    fontSize: '2rem'
  }
}
const ArchiveItem = ({storyData, shouldCenter}) => {
  return (
    <Card as={Link} to="/stories/1" >
      <Card.Content>
        <Card.Header style={styles.header}>
          {storyData.title}
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Description>
          {storyData.description}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default ArchiveItem;
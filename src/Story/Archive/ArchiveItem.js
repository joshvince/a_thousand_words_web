import React from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const styles = {
  header: {
    fontSize: '2rem'
  }
}
const ArchiveItem = ({storyData}) => {
  return (
    <Card as={Link} to={`/stories/${storyData.uuid}`} >
      <Card.Content>
        <Card.Header style={styles.header}>
          {storyData.title}
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Description>
          {storyData.subtitle}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default ArchiveItem;
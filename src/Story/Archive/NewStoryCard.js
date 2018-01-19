import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react';

const styles = {
  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  }
}

const NewStoryCard = () => {
  return (
    <Card as={Link} to="/stories/new" >
      <Card.Content>
        <Card.Header>
          <div style={styles.iconWrapper}> 
            <Icon name="write" size="huge" color="blue"/>
          </div>
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Description>
          Create a new story
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default NewStoryCard;
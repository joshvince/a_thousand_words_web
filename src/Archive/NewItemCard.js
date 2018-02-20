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

const NewItemCard = ({url, iconName, text}) => {
  return (
    <Card as={Link} to={url} >
      <Card.Content>
        <Card.Header>
          <div style={styles.iconWrapper}> 
            <Icon name={iconName} size="huge" color="blue"/>
          </div>
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Description content={text}/>
      </Card.Content>
    </Card>
  );
};

export default NewItemCard;
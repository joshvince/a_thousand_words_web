import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const styles = {
  header: {
    fontSize: '2rem'
  }
}
const ArchiveItem = ({pictureData}) => {
  return (
    <Card as={Link} to={`/pictures/${pictureData.uuid}`} >
      <Card.Content>
          <Image src={pictureData.url} size="small"/>
      </Card.Content>
      <Card.Content>
        <Card.Header style={styles.header}>
          {pictureData.name}
        </Card.Header>
      </Card.Content>
    </Card>
  );
};

export default ArchiveItem;
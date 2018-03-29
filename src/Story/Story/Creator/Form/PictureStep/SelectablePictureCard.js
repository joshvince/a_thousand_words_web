import React from 'react';
import { Card, Image } from 'semantic-ui-react';

const styles = {
  header: {
    fontSize: '2rem'
  }
}

const handleClick = (clickFunc, pictureData) => clickFunc(pictureData);

const SelectablePictureCard = ({pictureData, clickHandler}) => {
  return (
    <Card onClick={e => handleClick(clickHandler, pictureData)} >
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

export default SelectablePictureCard;
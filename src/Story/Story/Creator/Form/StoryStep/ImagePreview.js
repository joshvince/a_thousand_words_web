import React from 'react';
import {Icon, Segment, Image} from 'semantic-ui-react';

const styles = {
  text: {
    fontSize: '1.7em',
    marginTop: '2em'
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    maxHeight: '20vh',
    maxWidth: 'auto'
  }
}

const presentFileSize = (bytes) => {
  return `${(bytes / 1000000).toFixed(2)}mb`
}

const ImagePreview = ({imagePreviewUrl, imageFileName, imageFileSize}) => {
  const icon = <Icon name="image" color="grey" size="massive"/>
  return (
    <Segment vertical basic>
      <div style={styles.imageContainer}>
        {imagePreviewUrl ? 
          <Image style={styles.image} src={imagePreviewUrl} /> : icon}
      </div>
      <p style={styles.text}>
        {imageFileName ? 
          presentFileSize(imageFileSize) : "No image uploaded yet"}
      </p>
    </Segment>
  );
};

export default ImagePreview;
import React from 'react';
import {Icon, Segment, Image} from 'semantic-ui-react';

const styles = {
  imageContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    maxHeight: '20vh',
    maxWidth: 'auto'
  }
}

const ImagePreview = ({imagePreviewUrl, imageFileName, imageFileSize}) => {
  const icon = <Icon name="image" color="grey" size="massive"/>
  return (
    <Segment vertical basic>
      <div style={styles.imageContainer}>
        {imagePreviewUrl ? 
          <Image style={styles.image} src={imagePreviewUrl} /> : icon}
      </div>
    </Segment>
  );
};

export default ImagePreview;
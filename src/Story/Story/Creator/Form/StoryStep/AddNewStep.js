import React from 'react';
import { Button } from 'semantic-ui-react';

const styles = {
  container: {
    margin: '2em',
    marginBottom: '1em'
  }
}
const AddNewStep = ({clickHandler, disabled}) => {
  return (
    <div style={styles.container}>
      <Button 
        basic 
        size="massive" 
        content="Add new step" icon="plus"
        onClick={clickHandler}
        disabled={disabled}
        />
    </div>
  );
};

export default AddNewStep;
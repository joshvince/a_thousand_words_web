import React from 'react';
import { Segment, Button, Confirm } from 'semantic-ui-react';
const DeleteStep = ({modalShouldDisplay, openModal, dismissModal, onConfirm}) => {
  return (
    <Segment basic>
      <Button 
        basic 
        negative 
        content="Delete" 
        floated="right" 
        onClick={openModal}
      />
      <Confirm
        content="This action cannot be undone. Are you sure you want to delete this part of your story?"
        open={modalShouldDisplay}
        onCancel={dismissModal}
        onConfirm={onConfirm}
      />
    </Segment>
  );
};

export default DeleteStep;
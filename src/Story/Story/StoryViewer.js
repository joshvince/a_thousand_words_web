import React from 'react';
import PageHeader from '../../App/Header/PageHeader.js';
import StoryStep from './StoryStep.js';

import TESTPHOTO1 from '../../Homepage/photofront.jpg';
import TESTPHOTO2 from '../../Homepage/photorear.jpg';

const TESTSTORY = {
  title: "Lorem ipsum dolor",
  subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
  steps: [
    {
      position: 0,
      imageUrl: TESTPHOTO1,
      info: {
        title: "South Farm Road",
        year: 1989,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      }
    },
    {
      position: 1,
      imageUrl: TESTPHOTO2,
      info: {
        title: "Terringes Avenue",
        year: 1993,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      }
    },
    {
      position: 2,
      imageUrl: TESTPHOTO1,
      info: {
        title: "Lavington Road",
        year: 1989,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      }
    }
  ]
}

const StoryViewer = () => {
  return (
    <div>
      <PageHeader title={TESTSTORY.title} subtitle={TESTSTORY.subtitle} button={null} />
      {TESTSTORY.steps.map( (step,i) => <StoryStep step={step} key={i}/> )}
    </div>
  );
};

export default StoryViewer;
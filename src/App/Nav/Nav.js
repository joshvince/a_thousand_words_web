import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

// import './Nav.css';

function confirmSignOut(handler) {
  if (window.confirm("Would you like to sign out?")) {
    handler();
  }
}

const Nav = ({signedIn, currentUser, signOutHandler}) => {
  return (
    <div id="nav-container">
      <Link to="/" id="logo">
        1000words
      </Link>
        {
          !signedIn ? null :
          <div id="nav-menu">
            <div>
              <Link to="/map">Map</Link>
            </div>
            <div>
              <Link to="/pictures/new">Add</Link>
            </div>
            <div className="nav-item" onClick={e => confirmSignOut(signOutHandler)}>
              {signedIn ? currentUser.name : null}
            </div>
          </div>
        }
    </div>
  );
};

export default Nav;
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Header, Dropdown, Button, Segment, Responsive } from 'semantic-ui-react';

const styles = {
  logo: {
    desktop: { fontSize: '2em' },
    mobile: { fontSize: '1.6em' }
  },
  signInButton: {
    desktop: { margin: '0.2em' },
    mobile: {} 
  },
  menuItem: {color: "black"}
}

const Nav = ({signedIn, currentUser, signOutHandler}) => {
  return (
    <Menu borderless fluid fixed="top" size="massive" inverted>
      <Menu.Item>
        <Responsive as={Segment} inverted minWidth={768}>
          <Header  
            inverted 
            content="A Thousand Words" 
            style={styles.logo.desktop}
            as={Link}
            to="/"
          />
        </Responsive>
        <Responsive as={Segment} inverted maxWidth={768}>
          <Header  
            inverted 
            content="ATW" 
            style={styles.logo.mobile}
            as={Link}
            to="/"
          />
        </Responsive>
      </Menu.Item>
      <Responsive as={Menu.Item} minWidth={768}>
        <Link to="/archive">My Archive</Link>
      </Responsive>
      <Responsive as={Menu.Item} minWidth={768}>
        <Link to="/stories/new">New Story</Link>
      </Responsive>
      <Menu.Item position="right">
        {signedIn ? 
          <Dropdown item text={currentUser.name} icon="user">
            <Dropdown.Menu>
              <Responsive as={Dropdown.Item} maxWidth={768}>
                <Link to="/archive" style={styles.menuItem}>My Archive</Link>
              </Responsive>
              <Responsive as={Dropdown.Item} maxWidth={768}>
                <Link to="/stories/new" style={styles.menuItem}>New Story</Link>
              </Responsive>
              <Dropdown.Item onClick={signOutHandler}>
                Sign Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> : 
          <Button 
            basic 
            inverted
            color="green" 
            size="huge" 
            content="Sign in" 
            style={styles.signInButton.desktop}
            as={Link}
            to='/signin'
          />
        }
      </Menu.Item>
    </Menu>
  );
};

export default Nav;
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Header, Dropdown, Button } from 'semantic-ui-react';

const styles = {
  logo: {fontSize: '2em'},
  signInButton: {
    margin: '0.2em'
  }
}

const Nav = ({signedIn, currentUser, signOutHandler}) => {
  return (
    <Menu borderless fluid fixed="top" size="massive" inverted>
      <Menu.Item>
        <Header  
          inverted 
          content="A Thousand Words" 
          style={styles.logo}
          as={Link}
          to="/"
        />
      </Menu.Item>
      <Menu.Item>
        <Link to="/stories">My Stories</Link>
      </Menu.Item>
      <Menu.Item position="right">
        {signedIn ? 
          <Dropdown item text={currentUser.name} icon="user">
            <Dropdown.Menu>
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
            style={styles.signInButton}
            as={Link}
            to='/signin'
          />
        }
        

      </Menu.Item>
    </Menu>
  );
};

export default Nav;
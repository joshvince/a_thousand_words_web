import React from 'react';
import { Container, Header, Button} from 'semantic-ui-react';

const styles = {
  title: {
    fontSize: '4em', 
    fontWeight: 'normal', 
    marginBottom: 0
  },
  subtitle: {
    fontSize: '1.7em', 
    fontWeight: 'normal'
  }
}
const HeaderView = ({title, subtitle, submitHandler}) => {
  return (
    <Container text>
      <Header as='h1' content={title} inverted style={styles.title}/>
      <Header as='h2' content={subtitle} inverted style={styles.subtitle} />
      <Button inverted size="big" content="Edit the title" onClick={e => submitHandler()} />
    </Container>
  );
};

export default HeaderView;
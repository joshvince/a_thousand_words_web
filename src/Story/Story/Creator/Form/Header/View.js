import React from 'react';
import { Container, Header, Button} from 'semantic-ui-react';

const styles = {
  title: {
    fontSize: '4em',
    fontWeight: 'normal',
    marginTop: '0.3em',
    marginBottom: 0
  },
  subtitle: {
    fontSize: '1.7em',
    fontWeight: 'normal',
    margin: '0.9em'
  }
}
const HeaderView = ({title, subtitle, submitHandler}) => {
  return (
    <Container text>
      <Header as='h1' content={title} style={styles.title}/>
      <Header as='h2' content={subtitle} style={styles.subtitle} />
      <Button basic
        size="big"
        content="Edit the title"
        onClick={e => submitHandler()}
      />
    </Container>
  );
};

export default HeaderView;
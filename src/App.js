import React from 'react';
import './App.css';
import Blog from './components/Blog.js';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: "", }
  }
  inputHandler = (e) => {
    this.setState({ search: e.target.value });
  }
  render() {
    return (
      <Container>
        <h1>Buscador de cuecas</h1>
        <form>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Busca cuecas por nombre o parte de la letra"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={this.inputHandler}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary">Buscar</Button>
            </InputGroup.Append>
          </InputGroup>
        </form>
        <Blog search={this.state.search} />
      </Container>
    );
  }
}



export default App;

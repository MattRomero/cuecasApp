import React from 'react';
import './App.css';
import Blog from './components/Blog.js';
import Container from 'react-bootstrap/Container'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {search: "",}
  }
  inputHandler = (e) => {
    this.setState({search: e.target.value});
  }
  render() {
      return (
      <Container>
        <h1>Buscador de cuecas</h1>
        <form>
          <label>
            <input type="text" name="name" onChange={this.inputHandler} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Blog search={this.state.search} />
      </Container>
        );
  }
}



export default App;

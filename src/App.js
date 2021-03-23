import React , { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    }
    //We have to bind the function in order to bind this to the App Component
    //We have to do it to all the functions we create, but
    //instead of doing that we can use arrow functions in all the function
    //in this case handleChange
    //this.handleChange = this.handleChange.bind(this);
  }

  //Every time React Renders we use this function
  //Each time React renders we change the state of the empty array monsters, setState, to the
  //data we extract from the API jsonplaceholder 
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({monsters: users}))
  }

  //With this arrow function JS automatically binds the this keyword
  //to the App component
  handleChange = (e) => {
    this.setState({ searchField: e.target.value })
  };

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase()
    .includes(searchField.toLowerCase()));
    return (
        <div className="App">
        <h1>Monster Rolodex</h1>
          <SearchBox placeholder='search monsters' 
            handleChange={this.handleChange} />
          <CardList monsters={filteredMonsters} />
       </div>
    )
  }
}

export default App;

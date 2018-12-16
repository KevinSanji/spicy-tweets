import React, { Component } from 'react';
import './styles.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: ''
    }
  }

  searchUser () {
    console.log('hello');
  }

  render() {
    return (
      <div className='app'>
        <h1>Spicy Tweets</h1>
        <input type='text' onChange={event => this.setState({user: event.target.value})} placeholder='Search User'/>
        <button onClick={this.searchUser}>Search</button>
        <h2>{this.state.user}'s Spiciest Tweets</h2>
        <div className='tweet-container'>
          <ul>
            <li className='tweet'></li>
          </ul>
        </div>
      </div>
    )
  }

}

export default App;

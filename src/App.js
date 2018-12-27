import React, { Component } from 'react';
import './styles.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      searchedUser: '',
      user: null,
      token: ''
    }
  };

  // searchUser () {
  //   console.log(this);
  //   const BASE_URL = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
  //   const USER = this.state.user;
  //   let FETCH_URL = `${BASE_URL}?screen_name=${USER}&count=3`;
  //   console.log(USER);
  //   fetch(FETCH_URL)
  //   .then(response => response.json())
  //   .then(json => {
  //     console.log(json);
  //   })
  //   .catch(err => {
  //     console.log('Fetch error', err);
  //   })
  // }

  onSuccess = (response) => {
    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      if (token) {
        this.setState({isAuthenticated: true, user: user, token: token});
      }
    });
  };

  onFailed = (error) => {
    alert(error);
  };

  logout = () => {
    this.setState({isAuthenticated: false, token: '', user: null})
  };

  render() {
    let content = !!this.state.isAuthenticated ?
      (
        <div>
          <p>Authenticated</p>
          <div>
            {this.state.user.email}
          </div>
          <div>
            <button onClick={this.logout} className='button'>
              Log Out
            </button>
          </div>
        </div>
      ) :
      (
        <TwitterLogin loginUrl='http://localhost:4000/api/v1/auth/twitter'
                      onFailure={this.onFailed} onSuccess={this.onSuccess}
                      requestTokenUrl='http://localhost:4000/api/v1/auth/twitter/reverse'
        />
      );

    return (
      <div className='app'>
        <h1>Spicy Tweets</h1>
        <input type='text' onChange={event => this.setState({searchedUser: event.target.value})} placeholder='Search User'/>
        <button onClick={() => this.searchUser()}>Search</button>
        <h2>{this.state.user}'s Spiciest Tweets</h2>
        <div className='tweet-container'>
          <ul>
            <li className='tweet'></li>
          </ul>
        </div>
        {content}
      </div>
    )
  }

}

export default App;

import React, { Component } from 'react';
import firebase, { auth, provider } from '../firebase.js';
import { Menu } from 'semantic-ui-react'

class NavBar extends Component {

  constructor() {
    super();
    this.state = {
      user: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
    this.setState({user: this.props.user})
  }

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  render() {
    return (
      <Menu>
        <Menu.Item header>Welcome</Menu.Item>
          {this.state.user ?
            <Menu.Item position='right' onClick={this.logout}>Log Out</Menu.Item>                
            :
            <Menu.Item position='right' onClick={this.login}>Log In</Menu.Item>              
          }
      </Menu>
    );
  }
}
export default NavBar;
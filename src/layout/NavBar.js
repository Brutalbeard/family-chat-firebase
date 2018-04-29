import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'

export default class NavBar extends Component {

  render() {
    return (
      <div>
        {this.props.user ?
          <Menu>
            <Menu.Item header>Welcome {this.props.user.displayName}</Menu.Item>
            <Menu.Item position='right' onClick={() => this.props.logout()}>Log Out</Menu.Item>   
          </Menu>             
          :
          <Menu>
            <Menu.Item header>Welcome</Menu.Item>
            <Menu.Item position='right' onClick={() => this.props.login()}>Log In</Menu.Item>    
          </Menu>          
        }
      </div>
    );
  }
  
}
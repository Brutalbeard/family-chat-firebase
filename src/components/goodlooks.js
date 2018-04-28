import React, { Component } from 'react';
import { Image } from 'semantic-ui-react'

export default class Picture extends Component {
  render() {
    return (
        <div>
            <Image src={this.props.user.photoURL} bordered size='tiny'/>
        </div>
    );
  }
}
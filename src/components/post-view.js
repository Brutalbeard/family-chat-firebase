import React, { Component } from 'react';
import { Card, Button, Icon } from 'semantic-ui-react'

class PostThingy extends Component {

  makeElement() {
    // console.log(this.props.posts)

    let thing = this.props.posts

    // thing.forEach(doc => {
    //   console.log(doc.id + " : ", doc.data())
    // })
    const element = []
    thing.forEach(post =>
      element.push(
        <Card raised key={post.id}>
          <Card.Content>
              <Card.Header>
                  {post.data().title} 
                  {post.data().authorId === this.props.user.uid && 
                    <Button icon onClick={() => this.props.deletePost(post.id)} floated="right">
                        <Icon name='trash' />
                    </Button>}
              </Card.Header>
              <Card.Meta>
                  {post.data().user}
              </Card.Meta>
              <Card.Description>
                  {post.data().message}
              </Card.Description>
          </Card.Content>
        </Card>
      )
    )
    return element
  }

  render() {
    return (
      <Card.Group stackable centered>
        {this.makeElement()}
      </Card.Group>
    );
  }
}

export default PostThingy;
import React, { Component } from 'react';
import { Feed, Icon } from 'semantic-ui-react'
import TimeAgo from 'react-timeago'

export default class ChatWindow extends Component {

    makeElement() {
        
        // console.log(this.props)

        // this.props.posts.forEach(post => {
        //   console.log(post.data())
        // })

        const element = []
        this.props.posts.forEach(post =>
            element.push(
                <Feed.Event key={post.id}>
                    <Feed.Label image={post.data().photo} />
                    <Feed.Content>
                        <Feed.Date content={<TimeAgo date={post.data().created} />} />
                        <Feed.Summary content={post.data().user} />
                        <Feed.Extra text content={post.data().message} />
                        <Feed.Meta>
                            <Feed.Like
                            onClick={() => this.props.handleLikes(post.id)}>
                                <Icon name='like' />
                                { post.data().likes }
                            </Feed.Like>
                        </Feed.Meta>
                    </Feed.Content>
                </Feed.Event>
            )
        )
        return element
    }
  render() {
    return (
        <Feed>
            {this.makeElement()}
        </Feed>
    );
  }
}
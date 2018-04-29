import React, { Component } from 'react';
import {auth, provider, db} from './firebase.js';
import { Menu, Container, Form, Button, Divider } from 'semantic-ui-react'
import ChatWindow from './components/chat-window'

class App extends Component {

  constructor() {
    super();
    this.state = {
      posts: [],
      postMessage: '',
      user: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const otherPostsRef = db.collection('posts')

    otherPostsRef.orderBy("created", "desc").limit(20).onSnapshot(snapshot => {
      this.setState({posts: snapshot})
    })

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    const otherPostsRef = db.collection('posts')
    let date = new Date()
    e.preventDefault();
    otherPostsRef.doc().set({
      message: this.state.postMessage,
      user: this.state.user.displayName || this.state.user.email,
      authorId: this.state.user.uid,
      created: date.toUTCString(),
      photo: this.state.user.photoURL,
      likes: 0
    })
    this.setState({
      postMessage: ''
    });
  }

  removeItem(postId) {
    const otherPostsRef = db.collection('posts')
    otherPostsRef.doc(postId).delete();
  }

  handleLikes(postId) {
    const otherPostsRef = db.collection('posts')

    let post = otherPostsRef.doc(postId)

    post.get().then(doc =>{
      let currentLikes = doc.data().likes

      return post.update({
        likes: ( currentLikes + 1  )
      })
    })

    
  }

  login() {
    auth.signInWithPopup( provider ) 
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
      <div>
        <Menu>
          <Menu.Item header>Welcome</Menu.Item>
            {this.state.user ?
              <Menu.Item position='right' onClick={this.logout}>Log Out</Menu.Item>                
              :
              <Menu.Item position='right' onClick={this.login}>Log In</Menu.Item>              
            }
        </Menu>
        {this.state.user ?
          <Container>
            <Form onSubmit={this.handleSubmit} >
              <Form.Field>
                <label>Message</label>
                <input placeholder='get typin...' name='postMessage' value={this.state.postMessage} onChange={this.handleChange}/>
              </Form.Field>
              <Button type='submit'>Submit</Button>
            </Form>
            <Divider />
            <Container>
              <ChatWindow 
                posts={this.state.posts} 
                user={this.state.user} 
                deletePost={this.removeItem.bind(this)}
                handleLikes={this.handleLikes.bind(this)}
                />
            </Container>
          </Container>
          :
          <Container>
            <p>You're not logged in yet</p>
          </Container>
        }
      </div>
    );
  }
}
export default App;
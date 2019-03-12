import React, {Component} from 'react';
import NavBar from './navbar.jsx'
import ChatBar from './ChatBar.jsx'
import Message from './Message.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
       messages: [
        {
        username: "Bob",
        content: "Has anyone seen my marbles?",
        },
        {
        username: "Anonymous",
        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }

  render() {

    return (
      <div>
      <NavBar/>
      <MessageList messages = {this.state.messages}/>
      <ChatBar username={this.state.currentUser.name} />
      </div>
    );
  }
}
export default App;

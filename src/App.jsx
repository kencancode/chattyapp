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


  socket = new WebSocket("ws://localhost:3001");
  componentDidMount() {
  this.socket.onopen = function (event) {
    console.log("Server connected");
  };



  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
    }, 3000);
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      let messages = this.state.messages
      let newMessage = {username: event.target.previousSibling.value , content: event.target.value}
      messages.push(newMessage)
      this.setState( messages );
      event.target.value = " ";
      event.target.previousSibling.value = " ";

      this.socket.send(JSON.stringify(newMessage))
    }
  }


  render() {
    return (
      <div>
      <NavBar/>
      <MessageList messages = {this.state.messages}/>
      <ChatBar username={this.state.currentUser.name} handleKeyPress={this.handleKeyPress} />
      </div>
    );
  }
}
export default App;

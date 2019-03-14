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
       messages: []
    }
  }


  socket = new WebSocket("ws://localhost:3001");
  componentDidMount() {
  this.socket.onopen = function (event) {
    console.log("Server connected");
  };

  this.socket.addEventListener("message", (event) => {
    console.log(message)
    let message = JSON.parse(event.data)
    // switch(message.type){
    //   case "incomingMessage":
    //   //handle incoming message

    //     break;
    //   case "incomingNotification":
    //   ////handle notifications
    //     break;
    //   default:
    //   // show error in console if message type is unknown
    //   throw new Error("unknown event type " + message.type)
    // }
    this.setState({messages: [...this.state.messages, message]})
  })
  }


  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      let messages = this.state.messages
      let newMessage = { username: event.target.previousSibling.value , content: event.target.value}
      // messages.push(newMessage);
      // this.setState( messages );
     this.setState({currentUser : event.target.previousSibling.value})
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

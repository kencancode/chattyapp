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
    this.setState({messages: [...this.state.messages, message]})
  })
  }

  changeUsername = event => {

    const oldUser = this.state.currentUser.name;
    this.setState( { currentUser: {name: event.target.value } } )
    const postNotification = {
      type: 'postMessage',
      content: `${oldUser} has changed his name to ${event.target.value}`
    }

    this.socket.send(JSON.stringify(postNotification))
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      let messages = this.state.messages
      let newMessage = { type: "postMessage", username: this.state.currentUser.name , content: event.target.value}
      event.target.value = " ";

      this.socket.send(JSON.stringify(newMessage))
    }
  }


  render() {
    return (
      <div>
      <NavBar/>
      <MessageList messages = {this.state.messages}/>
      <ChatBar username={this.state.currentUser.name} handleKeyPress={this.handleKeyPress} changeUsername={this.changeUsername} />
      </div>
    );
  }
}
export default App;

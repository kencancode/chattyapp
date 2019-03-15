import React, {Component} from 'react';
import NavBar from './navbar.jsx'
import ChatBar from './ChatBar.jsx'
import Message from './Message.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
       messages: [],
       counter: 0
    }
  }


  socket = new WebSocket("ws://localhost:3001");
  componentDidMount() {
  this.socket.onopen = (event) => {
    console.log("Server connected");
  };

  this.socket.addEventListener("message", (event) => {
    if(event.data > 0){
      this.setState({counter: event.data})
    }
    let message = JSON.parse(event.data)
    console.log(message)
    this.setState({messages: [...this.state.messages, message]})
  })
  }

  changeUsername = event => {

    const oldUser = this.state.currentUser.name;
    const newUser = event.target.value ? event.target.value: "Anonymous"
    this.setState( { currentUser: {name: event.target.value } } )

    if (oldUser !== newUser){
    const postNotification = {
      type: 'postNotification',
      content: `${oldUser} has changed his name to ${event.target.value}`
    }

    this.socket.send(JSON.stringify(postNotification))
    }


  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter' && event.target.value){
      let messages = this.state.messages
      let newMessage = { type: "postMessage", username: this.state.currentUser.name , content: event.target.value}
      event.target.value = " ";

      this.socket.send(JSON.stringify(newMessage))
    }
  }


  render() {
    return (
      <div>
      <NavBar counter={this.state.counter}/ >
      <MessageList messages = {this.state.messages}/>
      <ChatBar username={this.state.currentUser.name} handleKeyPress={this.handleKeyPress} changeUsername={this.changeUsername} />
      </div>
    );
  }
}
export default App;

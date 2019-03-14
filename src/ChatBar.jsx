import React, {Component} from 'react';

export default class ChatBar extends Component {
  render(){
    return (
      <div>
      <footer className="chatbar">
        <input onBlur={this.props.changeUsername} className="chatbar-username" placeholder={this.props.username} />
        <input onKeyPress={this.props.handleKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
      </div>
    )
  }
}


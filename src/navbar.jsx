import React, {Component} from 'react';

export default class NavBar extends Component {
  render(){
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <h2 className="userCount">{this.props.counter} users online</h2>
      </nav>
    </div>
    )
  }
}
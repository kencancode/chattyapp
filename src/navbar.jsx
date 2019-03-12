import React, {Component} from 'react';

export default class NavBar extends Component {
  render(){
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
    </div>
    )
  }
}
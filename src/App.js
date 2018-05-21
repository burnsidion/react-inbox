import Message from './components/Message'
import MessageList from './components/MessageList'
import Toolbar from './components/Toolbar'
import Seed from './seed.json'
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: Seed
    }
  }

  selectToggle = (message) => {
    let index = this.state.messages.indexOf(message)
    this.setState({
      messages: [
        ...this.state.messages.slice(0, index),  // first part of array
        { ...message, selected: !message.selected }, // rebuild message with new property
        ...this.state.messages.slice(index  + 1)
      ]
    })
  }

  render() {
    return (
      <div className="container">
        <Toolbar messages={this.state.messages}/>
        <MessageList messages = {this.state.messages} selectToggle = {this.selectToggle}/>
      </div>
    );
  }
}


export default App

import MessageList from './components/MessageList'
import Toolbar from './components/Toolbar'
import Seed from './seed.json'
import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: Seed
    }
  }

  selectToggle = (message) => {

    let index = this.state.messages.indexOf(message)
    this.setState({
      messages: [
        ...this.state.messages.slice(0, index), { // first part of array
          ...message,
          selected: !message.selected
        }, // rebuild message with new property
        ...this.state.messages.slice(index + 1)
      ]
    })
  }

  starToggle = (message) => {

    let index = this.state.messages.indexOf(message)

    this.setState({
      messages: [
        ...this.state.messages.slice(0, index), {
          ...message,
          starred: !message.starred
        },
        ...this.state.messages.slice(index + 1)
      ]
    })
  }

  selectAll = (event) => {

    event.preventDefault()
    const allSelected = this.state.messages.every(m => m.selected)
    this.setState({
      messages: this.state.messages.map(message => {
        message.selected = !allSelected
        return message
      })
    })
  }

  markAsRead = (message) => {
    let messArr = this.state.messages
    this.setState({
      messages : messArr.map(mess => {
        if(mess.selected === true){
          mess.read = true

        }
        return mess
      })
    })
  }

  markAsUnread = (message) => {
    let messArr = this.state.messages
    this.setState({
      messages : messArr.map(mess => {
        if(mess.selected === true){
          mess.read = false
        }
        return mess
      })
    })
  }

  deleteMess = (message) => {
    let messArr = this.state.messages
    this.setState({
      messages : messArr.filter(mess => {
         return mess.selected !== true


      })
    })
    console.log("deleteMess");

  }


  render() {
    return (<div className="container">
      <Toolbar messages={this.state.messages} selectAll = {this.selectAll} markAsRead = {this.markAsRead} markAsUnread = {this.markAsUnread} deleteMess = {this.deleteMess}/>
      <MessageList messages={this.state.messages} selectToggle={this.selectToggle} starToggle={this.starToggle}/>
    </div>);
  }
}

export default App

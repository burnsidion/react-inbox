import MessageList from './components/MessageList'
import Toolbar from './components/Toolbar'
import React, {Component} from 'react';
import './App.css';

const API = 'http://localhost:8082/api/messages/'

class App extends Component {

  

  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  async componentDidMount() {
    const response = await fetch(API)
    if (response.status === 200) {
      const json = await response.json()
      const messages = json._embedded.messages
      this.setState({
        ...this.state,
        messages
      })
    } else {
      console.log('Couldn/t fetch json', response.status);
    }
  }

  newState = (data) => {
    this.setState({
      ...this.state,
      messages: data
    })
  }

  selectToggle = (message) => {

    let index = this.state.messages.indexOf(message)
    this.setState({
      ...this.state,
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
      ...this.state,
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
      ...this.state,
      messages: this.state.messages.map(message => {
        message.selected = !allSelected
        return message
      })
    })
  }

  markAsRead = (message) => {
    let messArr = this.state.messages
    this.setState({
      ...this.state,
      messages: messArr.map(mess => {
        if (mess.selected === true) {
          mess.read = true

        }
        return mess
      })
    })
  }

  markAsUnread = (message) => {
    let messArr = this.state.messages
    this.setState({
      ...this.state,
      messages: messArr.map(mess => {
        if (mess.selected === true) {
          mess.read = false
        }
        return mess
      })
    })
  }

  deleteMess = (message) => {
    let messArr = this.state.messages
    this.setState({
      ...this.state,
      messages: messArr.filter(mess => {
        return mess.selected !== true
      })
    })
  }

  addLabel = (e) => {
    e.preventDefault()
    this.setState({
      ...this.state,
      messages: this.state.messages.map(mess => {
        if (mess.selected) {
          if (!mess.labels.includes(e.target.value) && e.target.value !== "Apply label") {
            // If not already attached to msg, and not "Apply label", then kosher to proceed
            mess.labels = [
              ...mess.labels,
              e.target.value
            ]
          } else {
            // trying to do something undesired with the label add
          }
        }
        return mess

      })
    })
  }

  removeLabel = (e) => {
    e.preventDefault()
    let messArr = this.state.messages
    this.setState({
      messages: messArr.map(mess => {
        if (mess.selected) {
          if (mess.labels.includes(e.target.value) && e.target.value !== "Remove label") {
            //If already attached to msg, and not "Remove label", then good to remove
            mess.labels = mess.labels.filter(x => {
              return x !== e.target.value
            })
          }
        }
        return mess
      })
    })
  }

  render() {
    return (<div className="container">
      <Toolbar
        messages={this.state.messages}
        selectAll={this.selectAll}
        markAsRead={this.markAsRead}
        markAsUnread={this.markAsUnread}
        deleteMess={this.deleteMess}
        addLabel={this.addLabel}
        removeLabel={this.removeLabel}
        newState={this.newState}/>
      <MessageList
        messages={this.state.messages}
        selectToggle={this.selectToggle}
        starToggle={this.starToggle}
        newState={this.newState}/>
    </div>);
  }
}

export default App

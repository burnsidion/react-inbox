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

  patchStuff = async (id, command, key, value) => {
    let dataObj = {
      "messageIds": id,
      command: command,
      [key]: value
    }
    const response = await fetch(API, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataObj)
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
    let ids = this.state.messages.filter(m => m.selected).map(m => m.id)
    this.patchStuff(ids, 'read', 'read', true)
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
    let ids = this.state.messages.filter(m => m.selected).map(m => m.id)
    this.patchStuff(ids, 'read', 'read', false)
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
    let ids = this.state.messages.filter(m => m.selected).map(m => m.id)
    this.patchStuff(ids, 'delete')
    this.setState({
      ...this.state,
      messages: messArr.filter(mess => {
        return mess.selected !== true
      })
    })
  }

  addLabel = (label) => {
    let ids = this.state.messages.filter(m => m.selected).map(m => m.id)
    this.patchStuff(ids, 'addLabel', 'label', label)
    this.setState({
      ...this.state,
      messages: this.state.messages.map(mess => {
        if (mess.selected) {
          if (!mess.labels.includes(label) && label !== "Apply label") {
            mess.labels = [
              ...mess.labels,
              label
            ]
          }
        }
        return mess
      })
    })
  }

  removeLabel = (label) => {
    let ids = this.state.messages.filter(m => m.selected).map(m => m.id)
    let messArr = this.state.messages
    this.patchStuff(ids, 'removeLabel', 'label', label)
    this.setState({
      messages: messArr.map(mess => {
        if (mess.selected) {
          if (mess.labels.includes(label) && label !== "Remove label") {
            mess.labels = mess.labels.filter(x => {
              return x !== label
            })
          }
        }
        return mess
      })
    })
  }

  render() {
    return (<div className="container">
      <Toolbar messages={this.state.messages} selectAll={this.selectAll} markAsRead={this.markAsRead} markAsUnread={this.markAsUnread} deleteMess={this.deleteMess} addLabel={this.addLabel} patchStuff={this.patchStuff} removeLabel={this.removeLabel} keepAsReadOrUnread={this.keepAsReadOrUnread}/>
      <MessageList messages={this.state.messages} selectToggle={this.selectToggle} starToggle={this.starToggle} patchStuff={this.patchStuff}/>
    </div>);
  }
}

export default App

import MessageList from './components/MessageList'
import Toolbar from './components/Toolbar'
import MakeMessage from './components/MakeMessage'
import React, {Component} from 'react';
import './App.css';

const API = 'http://localhost:8082/api/messages/'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      formHidden: 'hidden'
    }
  }

  async componentDidMount() {
    const response = await fetch(API)
    if (response.status === 200) {
      const json = await response.json()
      const messages = json._embedded.messages
      this.setState({
        ...this.state.formHidden,
        messages
      })
    } else {
      console.log('Couldn/t fetch json', response.status);
    }
  }


  //Single function to handle all patch requests
  patchStuff = async (id, command, key, value) => {
    let dataObj = {
      "messageIds": id,
      command: command,
      [key]: value
    }
    await fetch(API, {
      method: 'PATCH',
      body: JSON.stringify(dataObj),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  //Single function to handle all post requests
  postStuff = async (data) => {
    let response = await fetch(API, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    if (response.status === 200) {
      const json = await response.json()
      this.setState({
        ...this.state.formHidden,
        messages: [...this.state.messages, json]
      })
    } else {
      console.log('Couldn\'t Post New Message: ', response.status)
    }
  }


  //Check and uncheck boxes next to each message
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

  //Check and uncheck stars next to each message
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

  //Select and unselect all messages at once
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

  //Mark selected message(s) as read
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

  //Mark selected message(s) as unread
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

  //Delete selected message(s)
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

  //Add specified label to selected message(s)
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

  //Remove specified label from selected message(s)
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

  //Toggle the form to be hidden or not on click of the red '+' button
  composeToggle = () => {
  	this.state.formHidden === 'hidden' ?
  	this.setState({formHidden: ''}) :
  	this.setState({formHidden: 'hidden'})
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
        patchStuff={this.patchStuff}
        removeLabel={this.removeLabel}
        keepAsReadOrUnread={this.keepAsReadOrUnread}
        formHidden={this.state.formHidden}
        composeToggle={this.composeToggle}
      />
      <MakeMessage
        formHidden={this.state.formHidden}
        messages={this.state.messages}
        postStuff={this.postStuff}
        composeToggle={this.composeToggle}
      />
      <MessageList
        messages={this.state.messages}
        selectToggle={this.selectToggle}
        starToggle={this.starToggle}
        patchStuff={this.patchStuff}
        newState={this.newState}
      />
    </div>);
  }
}

export default App

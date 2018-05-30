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

  patchStuff = async (id, command, key, boolean) => {
    console.log('PATCH JUST GOT CALLED!!!!');
    let dataObj = {
      "messageIds": id,
      command: command,
      [key]: boolean
    }
    const response = await fetch(API, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataObj)
    })
    // if(response.status === 200){
    //   let index = this.state.messages.indexOf(message)
    //
    //
    //   // this.markAsRead(message)
    //   // this.markAsUnread(message)
    // }

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

  // keepAsReadOrUnread = (isRead) => {
  //   let messArr = this.state.messages.filter(mess => mess.selected)
  //   if(messArr){
  //     messArr.map(m => {
  //       this.patchStuff(m.id, 'read', 'read', isRead, m)
  //     })
  //   }
  //
  // }

  markAsRead = (message) => {
    let messArr = this.state.messages
    let ids = this.state.messages.filter(m => m.selected).map(m => m.id)
    this.setState({
      ...this.state,
      messages: messArr.map(mess => {
        if (mess.selected === true) {
          mess.read = true

        }
        return mess
      })
    })
    this.patchStuff(ids, 'read', 'read', true)

  }

  markAsUnread = (message) => {
    let messArr = this.state.messages
    let ids = this.state.messages.filter(m => m.selected).map(m => m.id)
    this.setState({
      ...this.state,
      messages: messArr.map(mess => {
        if (mess.selected === true) {
          mess.read = false
        }
        return mess
      })
    })
    this.patchStuff(ids, 'read', 'read', false)
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
      patchStuff={this.patchStuff}
      removeLabel={this.removeLabel}
      keepAsReadOrUnread={this.keepAsReadOrUnread}/>
      <MessageList
        messages={this.state.messages}
        selectToggle={this.selectToggle}
        starToggle={this.starToggle}
        patchStuff={this.patchStuff} />
      </div>);
    }
  }

  export default App

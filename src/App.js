import Message from './components/Message'
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
    console.log('App:selectAll');
    event.preventDefault()
    let messArr = this.state.messages
    // const selectedList = messArr.filter((message) => message.selected)
    // const anySelected = this.state.messages.some(m => m.selected)
    const allSelected = this.state.messages.every(m => m.selected)
    this.setState({
      messages: this.state.messages.map(message => {
        message.selected = !allSelected
        return message
      })
    })


    // if (selectedList.length > 0) {
    //   messArr.forEach(message => {
    //     console.log(message.selected);
    //     message.selected = false
    //   })
    // }
    // else {
    //   messArr.forEach(message => {
    //     console.log(message.selected);
    //     message.selected = true
    //   })
    // }






  }



  render() {
    return (<div className="container">
      <Toolbar messages={this.state.messages} selectAll = {this.selectAll}/>
      <MessageList messages={this.state.messages} selectToggle={this.selectToggle} starToggle={this.starToggle}/>
    </div>);
  }
}

export default App

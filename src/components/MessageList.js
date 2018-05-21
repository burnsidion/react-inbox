import React from 'react'
import Message from './Message'


export default class MessageList extends React.Component {

  render() {
    return (
      <div>
      { this.props.messages.map(message => <Message key={message.id} message={message} selectToggle = {this.props.selectToggle} messages={this.props.messages} />)}
      </div>
    )
  }
}

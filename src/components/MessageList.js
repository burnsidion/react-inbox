import React from 'react'
import Message from './Message'


export default class MessageList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { messages: props.messages }
  }

  componentWillReceiveProps(newProps){
    this.setState({
      ...this.state,
      messages: newProps.messages
    })
  }

  render() {
    return (
      <div>
        {this.state.messages.map((message, i) => <Message key={i} message={message} selectToggle = {this.props.selectToggle} starToggle = {this.props.starToggle} />)}
      </div>
    )
  }
}

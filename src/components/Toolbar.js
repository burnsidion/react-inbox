import React from 'react'

export default class Toolbar extends React.Component {
  constructor(props){
    super(props);
  }

  getUnreadMessages = () => {
    let unread = this.props.messages.filter((message) => {
      return message.read === false

    })
    return unread.length;
  }

  checkedMess = (elem) => {
    return elem === true
  }

  selectedIcon = () => {
    let messages = this.props.messages
    let div
    if(messages.every(m => m.selected)){
      div = "fa fa-check-square-o"
    } else if(messages.some(m => m.selected)) {
      div = "fa fa-minus-square-o"
    } else {
      div = "fa fa-square-o"
    }
    console.log(div);
    return div
  }

  selectAll = () => {
    // 1. determine true/false for checkbox overlord
      let messArr = this.props.messages.map(x => x.selected)
    // 2. map over messages, make a new array and updated selected for each message, set to value determined  in #1

    // 3. update state setState({...this.state, newMessages})
    console.log(messArr);
  }

  render() {
    return(
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.getUnreadMessages()}</span>
          unread messages
          </p>

          <button className="btn btn-default" onClick={this.selectAll}>
            <i className={this.selectedIcon()} ></i>
          </button>

          <button className="btn btn-default">
          Mark As Read
          </button>

          <button className="btn btn-default">
          Mark As Unread
          </button>

          <select className="form-control label-select">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

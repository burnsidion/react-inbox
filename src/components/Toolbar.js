import React from 'react'


export default class Toolbar extends React.Component {

  getUnreadMessages = () => {
    let unread = this.props.messages.filter((message) => {
      return !message.read
    })
    return unread.length;
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

    return div
  }



///

  render() {
    let noMsgSelected = this.props.messages.every((msg) => {
      return !msg.selected
    })
    return(
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.getUnreadMessages()}</span>
            unread messages
          </p>

          <button className="btn btn-default" onClick={this.props.selectAll}>
            <i className={this.selectedIcon()} ></i>
          </button>

          <button className="btn btn-default" onClick = {() => this.props.markAsRead(this.props.message)} disabled ={ noMsgSelected }>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick = {() => this.props.markAsUnread(this.props.message)} disabled={ noMsgSelected }>
            Mark As Unread
          </button>

          <select className="form-control label-select" onChange = {(event) => this.props.addLabel(event.target.value)} disabled ={ noMsgSelected }>
            <option>Apply label</option>
            <option value="dev" >dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" onChange={this.props.removeLabel} disabled ={ noMsgSelected }>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick = {this.props.deleteMess} disabled ={ noMsgSelected }>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

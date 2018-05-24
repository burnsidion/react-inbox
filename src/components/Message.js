import React from 'react'

export default class Message extends React.Component {

  constructor(props) {
    // console.log(props);
    super(props);
    let selected = false
    let labels = props.message.labels
    if (props.message.selected) {
      selected = props.message.selected

    }
    this.state = { selected,labels }
  }

  read = () => {
    let read
    if (this.props.message.read === true) {
      if (this.props.message.selected) {
        read = "row message read selected"
      } else {
        read = "row message read"
      }
    } else {
      if (this.props.message.selected) {
        read = "row message unread selected"
      } else {
        read = "row message unread"
      }
    }
    return read
  }

  componentWillReceiveProps(newProps){
    this.setState({
      ...this.state,
      selected: newProps.message.selected,

    })
  }

  renderLabels = () => {
    let labels = this.state.labels
    let htmlLabels = labels.map((label, i) => {
      return <span key={i} className="label label-warning">{label}</span>
    });
    return htmlLabels;
  }

  starred = (e) => {

    e.preventDefault()

    this.props.starToggle(this.props.message)

  }



  render() {
    return (<div className={this.read()}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" onChange={() => this.props.selectToggle(this.props.message)}  checked={this.state.selected ? 'checked' : '' }/>
          </div>
          <div className="col-xs-2">
            <i className={this.props.message.starred
              ? 'star fa fa-star'
              : 'star fa fa-star-o'} onClick={this.starred}/>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {this.renderLabels()}
          <a href="#">
            {this.props.message.subject}
          </a>
        </div>
      </div>)
    }
  }

 

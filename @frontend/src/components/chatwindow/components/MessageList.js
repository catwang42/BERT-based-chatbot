import React, { Component } from 'react';
import Message from './Messages'
import * as Scroll from 'react-scroll';

const scroll = Scroll.animateScroll;

class MessageList extends Component {

  componentDidMount(prevProps, prevState) {
    this.el.scrollTop = this.el.scrollHeight;
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }

  render () {
    return (
      <div className="sc-message-list" ref={el => this.el = el}>
        {this.props.messages.map((message, i) => {
          return <Message message={message} key={i} />
        })}
        <div style={{ float:"left", clear: "both" }}
          ref={(el) => { this.messagesEnd = el; }}/>
      </div>)
  }
}

export default MessageList

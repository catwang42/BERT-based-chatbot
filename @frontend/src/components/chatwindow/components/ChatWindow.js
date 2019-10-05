import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MessageList from './MessageList'
import UserInput from './UserInput'
import Header from './Header'
import Login from './Login'
import Animate from 'rc-animate';

class ChatWindow extends Component {
    constructor(props) {
      super(props);
      this.state = {
        msgSentPercennt : 100
      }
    }

    onUserInputSubmit(message) {
      this.props.onUserInputSubmit(message);
      console.log("clicked!")
    }

    onFilesSelected(filesList) {
      this.props.onFilesSelected(filesList);
    }
    render() {
      let messageList = this.props.messageList || [];
      let classList = [
        "sc-chat-window",
        (this.props.isOpen ? "opened" : "closed")
      ];

      var name = this.props.truncated ?  "sc-chat-window-truncated" : classList.join(' ')

      return (
        <div className={name}>
          <Header
            teamName={this.props.agentProfile.teamName}
            imageUrl={this.props.agentProfile.imageUrl}
            onClose={this.props.onClose}
            progressBar={this.state.msgSentPercennt}
            isLoggedIn={this.props.isLoggedIn}
            changeLoggedIn={this.props.changeLoggedIn}
            logout={this.props.logout}
          />

                {this.props.isLoggedIn ? (
                    <MessageList
                        messages={messageList}
                        imageUrl={this.props.agentProfile.imageUrl}
                      />
              ) : (
                <Animate
                  transitionName="fade"
                  transitionAppear
                  transitionLeave>
                <Login
                  changeLoggedIn={this.props.changeLoggedIn}
                  />
                </Animate>
              )}

            {this.props.isLoggedIn ? (
            <UserInput
              onSubmit={this.onUserInputSubmit.bind(this)}
              onFilesSelected={this.onFilesSelected.bind(this)}
              showEmoji={this.props.showEmoji}
            />
            )

            : null }

      </div>

      );
    }
}

ChatWindow.propTypes = {
  agentProfile: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFilesSelected: PropTypes.func,
  onUserInputSubmit: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool,
}

export default ChatWindow;

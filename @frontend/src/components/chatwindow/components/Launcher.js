import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ChatWindow from './ChatWindow';
import launcherIcon from './../assets/logo-no-bg.svg';
import incomingMessageSound from './../assets/sounds/notification.mp3';
import launcherIconActive from './../assets/close-icon.png';
import { APP_CONSTANTS } from "./../../../constants"
import TweenOne from "rc-tween-one"
import * as firebase from "firebase/app"
const p0 = 'M0,100 L25,100 C34,20 40,0 100,0';
const p1 = 'M0,100 C5,120 25,130 25,100 C30,60 40,75 58,90 C69,98.5 83,99.5 100,100';
const ease0 = TweenOne.easing.path(p0);
const ease1 = TweenOne.easing.path(p1);

class Launcher extends Component {

  constructor() {
    super();
    this.state = {
      launcherIcon,
      isOpen: true,
      isLoggedIn: false,
      id : "",
      password : "",
      loading : true,
      firebaseProject : null,
    };
    this.animation = [
      {
        repeatDelay: 500,
        appearTo: 0,
        scaleX: 0.9,
        scaleY: 1.35,
        repeat: -1,
        yoyo: true,
        ease: ease1,
        duration: 1000,
      }
   ];
   this.changeLoggedIn = this.changeLoggedIn.bind(this)
  }

  componentWillMount(){
    this.setState({
      firebaseProject: firebase.initializeApp(this.props.firebaseConfig)
    })
    console.log(this.state.firebaseProject)
  }


  changeLoggedIn(data){
    this.setState({
      isLoggedIn: !this.state.isLoggedIn,
    })
    console.log("Hi")
    console.log(this.props.globalLogin)
    this.props.LoggedInOut(data)
  }

  logoutlogout = () => {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn,
    })
    this.props.logout()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.mute) { return; }
    const nextMessage = nextProps.messageList[nextProps.messageList.length - 1];
    const isIncoming = (nextMessage || {}).author === 'them';
    const isNew = nextProps.messageList.length > this.props.messageList.length;
    if (isIncoming && isNew) {
      this.playIncomingMessageSound()
    }
  }

  playIncomingMessageSound() {
    var audio = new Audio(incomingMessageSound);
    audio.play();
  }

  handleClick() {
    if (this.props.handleClick !== undefined) {
      this.props.handleClick();
    } else {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }
  }
  render() {
    const isOpen = this.props.hasOwnProperty('isOpen') ? this.props.isOpen : this.state.isOpen;
    const classList = [
      'sc-launcher',
      (isOpen ? 'opened' : ''),
    ];
    const isLoggedIn = this.state.isLoggedIn

    if (this.props.truncated) {
      return (

        <ChatWindow
          messageList={this.props.messageList}
          onUserInputSubmit={this.props.onMessageWasSent}
          onFilesSelected={this.props.onFilesSelected}
          agentProfile={this.props.agentProfile}
          isOpen={true}
          onClose={this.handleClick.bind(this)}
          showEmoji={this.props.showEmoji}
          isLoggedIn={this.state.isLoggedIn}
          firebaseConfig={this.props.firebaseConfig}
          changeLoggedIn={this.changeLoggedIn}
          firebaseProject={this.state.firebaseProject}
          truncated={this.props.truncated}
          logout={this.logoutlogout}
        />

      )
    }

    // return (
    //   <div id="sc-launcher">
    //       <div className={classList.join(' ')} onClick={this.handleClick.bind(this)}>
    //         <MessageCount count={this.props.newMessagesCount} isOpen={isOpen} />
    //         <img className={"sc-open-icon"} src={launcherIconActive} />
    //         <TweenOne
    //           animation={this.animation}
    //           paused={isOpen}
    //           className="code-box-shape"
    //           style={{
    //             position: 'absolute',
    //             right: "-25px",
    //             bottom: "-26px",
    //             transformOrigin: 'center bottom',
    //           }}
    //            >
    //             <img className={"sc-closed-icon"} src={launcherIcon} />
    //         </TweenOne>
    //       </div>
    //     <ChatWindow
    //       messageList={this.props.messageList}
    //       onUserInputSubmit={this.props.onMessageWasSent}
    //       onFilesSelected={this.props.onFilesSelected}
    //       agentProfile={this.props.agentProfile}
    //       isOpen={isOpen}
    //       onClose={this.handleClick.bind(this)}
    //       showEmoji={this.props.showEmoji}
    //       isLoggedIn={this.state.isLoggedIn}
    //       firebaseConfig={this.props.firebaseConfig}
    //       changeLoggedIn={this.changeLoggedIn}
    //       firebaseProject={this.state.firebaseProject}
    //       logout={this.props.logout}
    //     />
    //   </div>
    // );
  }
}

const MessageCount = (props) => {
  if (props.count === 0 || props.isOpen === true) { return null }
  return (
    <div className={"sc-new-messages-count"}>
      {props.count}
    </div>
  )
}

Launcher.propTypes = {
  onMessageWasReceived: PropTypes.func,
  onMessageWasSent: PropTypes.func,
  newMessagesCount: PropTypes.number,
  isOpen: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  handleClick: PropTypes.func,
  messageList: PropTypes.arrayOf(PropTypes.object),
  mute: PropTypes.bool,
  showEmoji: PropTypes.bool,
  firebaseConfig: PropTypes.object
};

Launcher.defaultProps = {
  newMessagesCount: 0,
  showEmoji: true
}

export default Launcher;

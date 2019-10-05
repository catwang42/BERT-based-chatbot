import React, {Component} from 'react'
import {render} from 'react-dom'
import { Row , Col, Button, Card, Icon, Divider, message } from "antd"
import Tabs from './components/elasticsearch'
import { Launcher } from './components/chatwindow'
import Logo from './components/logo'
import "./App.sass"
import Cookies from 'universal-cookie'
import axios from "axios";
import { APP_CONSTANTS } from "./constants"
const cookies = new Cookies()

class App extends Component {

  constructor(){
    super()
    this.child = React.createRef()
    this.state = {
      chat_input : "",
      isUserLogged : false,
      messageList: [
  // {type: 'text', author: "them", data: { text: "Hello Timothy!"} },
  // {type: 'two_select',
  //  author: "them",
  //  data: {
  //     message: "Which topic?",
  //     options:
  //         [
  //         {id: 1,
  //         content : "Provider numbers"}
  //         ,
  //         {id: 2,
  //         content : "ARTG processes"},
  //         ]
  //       }
  // },
  // {type: 'text', author: "them", data: { text: "What question around Provider Registration can I help you with today? [Example - How do I amend a 3GA placement with a start date prior to 1 January 2019?]"} },
],
      newMessagesCount: 1,
      isOpen: false
    }
  }
  componentDidMount() {
      window.onbeforeunload = function() {
          this.onUnload();
          return "blablabla";
      }.bind(this);
  }

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message],
      chat_input : message.data.text
    })
    var username = cookies.get("id")
    var password = cookies.get("password")
    var token    = cookies.get("token")


    if (message.data.text=="Bye"){
      setTimeout(() => this.response("See you next time!"), 500)
      // setTimeout(() => this.logout(), 2000)
    }
    else if (message.data.text=="Are EFT details mandatory ?"){
      setTimeout(() => this.response("Are you checking the start day from 1 July 2018?"), 500)
    }
    else if (message.data.text=="Yes"){
      setTimeout(() => this.response("Yes, all new applications received from 1 September 2018 will require EFT details to be included."), 500)
    }
    else if (message.data.text=="What if an allied health professional is asking to backdate or remove a gap in their eligibility?"){
      setTimeout(() => this.response("Refer the provider to the relevant association. The association will contact the Department directly if backdating or removal of a gap can occur. "), 500)
    }
    else if (message.data.text=="How to issue a prescribe number?"){
      setTimeout(() => this.response("which occupation are you checking ? 'medical practitioner', 'dentist?', 'optometrist', 'nurse practitioner', or 'midwife'?"), 500)
    }
    else {
      console.log(this.state.messageList)
      axios.post(APP_CONSTANTS.BACKEND_ENTRY+"/basic/chat", {
        "token" : token,
        "chathistory" : this.state.messageList,
        "message" : message.data.text
      })
       .then(res => {
         console.log(res)
         console.log(res.data)
         if (res.data["faq"] == "no"){
           this.child.current.elastic_search(message.data.text)
         }
         setTimeout(()=> this.setState({
           messageList: this.state.messageList.concat(res.data.result),
         }), 500)
       })
       .catch(err => {
         console.log(err)
       })
    }
}

  response = (message) => {
    this.setState({
      messageList: [...this.state.messageList, {type: 'text', author: "them", data: { text: message} }],
    })
}

  _onFilesSelected(fileList) {
    const objectURL = window.URL.createObjectURL(fileList[0]);
    this.setState({
      messageList: [...this.state.messageList, {
        type: 'file', author: "me",
        data: {
          url: objectURL,
          fileName: fileList[0].name
        }
      }]
    })
  }

  _handleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
      newMessagesCount: 0
    })
  }

 logout = () => {
    var username = cookies.get("id")
    var password = cookies.get("password")
    var token    = cookies.get("token")
    axios.post(APP_CONSTANTS.BACKEND_ENTRY+"/auth/logout", {
      "token" : token,
      "chatdata" : { "chathistory" : this.state.messageList },
      "username"   : username
    })
     .then(res => {
       this.setState({
         isUserLogged : !this.state.isUserLogged,
       })
       message.success("Logged Out")
     })
     .catch(err => {
       console.log(err)
     })
  }

  _LoggedInOut = (data) => {
    this.setState({
      isUserLogged : !this.state.isUserLogged,
      messageList  : data
    })
  }

  render() {
    return (
      <div className="App">
      <link href="https://fonts.googleapis.com/css?family=Righteous&display=swap" rel="stylesheet"/>
      <Row>
        <Col span={18}>
              <Tabs search_input={this.state.chat_input} ref={this.child} isUserLogged={this.state.isUserLogged}/>
        </Col>
        <Col span={6}>
              <div className="RightPart">
              <Logo isUserLogged={this.state.isUserLogged} name={cookies.get("nickname")}/>
              <Launcher
                agentProfile={{
                  teamName: 'Smart Knowledge Assistant',
                  imageUrl: "",
                }}
                onMessageWasSent={this._onMessageWasSent.bind(this)}
                onFilesSelected={this._onFilesSelected.bind(this)}
                messageList={this.state.messageList}
                newMessagesCount={this.state.newMessagesCount}
                handleClick={this._handleClick.bind(this)}
                isOpen={this.state.isOpen}
                truncated={true}
                LoggedInOut={this._LoggedInOut}
                globalLogin={this.state.isUserLogged}
                logout={this.logout}
                showEmoji
              />
              </div>
        </Col>
      </Row>

    </div>
  )
  }
}

export default App;

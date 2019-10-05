import React, { Component } from 'react';
import { APP_CONSTANTS } from './../../../constants';
import closeIcon from './../assets/close-icon.png';
import { Form, Button, Input, Icon, message, notification, Spin, Alert} from 'antd'
import Cookies from 'universal-cookie'
// import * as firebase from "firebase/app"
// import "firebase/auth"
// import "firebase/firestore"
import axios from "axios";


// import "./Login.css"
// const Search = Input.Search

const cookies = new Cookies()


class Login extends Component {

  constructor(props){
    super(props)
    this.state = {
      percent : 100,
      id : "",
      password : "",
      loading : false,
    }
  }

  componentWillMount(){
    // var Project = this.props.firebaseProject
    // console.log(this.props.firebaseApp)
    // var Firestore = Project.firestore()
    console.log(cookies.get("id"))
    console.log(cookies.get("password"))
    try {
      this.setState({
        id : cookies.get("id"),
        password : cookies.get("password"),
      })
    }
    catch (err) {
      console.log("Cookie Loading ERROR")
      console.log(err)
    }
  }

  toggle = value => {
    this.setState({ loading : value})
  }

  validateForm(){
    return this.state.id.length > 0 && this.state.password > 0;
  }

  handleChangePass = event => {
    this.setState({
      password: event.target.value
    })
  }

  handleChangeID = event => {
    this.setState({
      id: event.target.value
    })
  }

lgnClick = (event) => {
  axios.post(APP_CONSTANTS.BACKEND_ENTRY+"/auth/login", {
    "username" : this.state.id,
    "password" : this.state.password
  })
   .then(res => {
     console.log(res)
     cookies.set("id",this.state.id, {path:"/"})
     cookies.set("password",this.state.password, {path:"/"})
     cookies.set("token", res.data.token, {path:"/"})
     cookies.set("nickname", res.data.nickname, {path:"/"})
     this.props.changeLoggedIn(res.data.chatdata.chathistory)
     message.success("Logged In")
     // this.setState({
     //   mc_result: res.data,
     // })
     // this.setState({
     //   mc_loading : false
     // })
     //   console.log(res)
   })
   .catch(err => {
     console.log(err)
     console.log(err.message)
     message.error("ERROR")
   })

}

  // lgnClick = (event) => {
  //   console.log(this.state.id)
  //   console.log(this.state.password)
  //   firebase.auth().signInWithEmailAndPassword(this.state.id, this.state.password)
  //   .then(
  //     (firebaseUser) => {
  //       message.success("Success")
  //       cookies.set("id",this.state.id, {path:"/"})
  //       cookies.set("password",this.state.password, {path:"/"})
  //       this.props.changeLoggedIn()
  //   })
  //   .catch(
  //     (error) => {
  //       var errorCode = error.code
  //       var errorMessage = error.message
  //       console.log(errorCode)
  //       console.log(errorMessage)
  //       message.error("Failed: " + errorMessage)
  //     })
  //   this.setState({
  //     loading : true,
  //   })
  //   setTimeout(
  //   function() {
  //       this.setState({
  //         loading : false,
  //       })
  //   }
  //   .bind(this),
  //   2000
  //   );
  // }

  render() {
    return(
      <div style={{
         margin: "10%",
         marginBottom : "45%",
         height: "250px",
         backgroundColor: "#4e8cff",
         display: "flex",
         flexDirection: 'column',
         alignItems: 'center',
         verticalAlign: 'center',
         borderRadius: "5px",
        }}>

        <span style={{
          fontSize: "20px",
          color: "white",
          marginTop: "20px"
          }}>
          Staff Login
        </span>

          <Input style={{
            width: "85%",
            padding: "10px",
            marginTop: "20px",
            borderRadius: "10px",
            borderWidth: "0px",
          }} placeholder="Email"
          value={this.state.id}
          onChange={this.handleChangeID}
          suffix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}

          />

        <Input.Password style={{
            width: "85%",
            padding: "10px",
            borderRadius: "10px",
            borderWidth: "0px",
          }} placeholder="Password"
          value={this.state.password}
          onChange={this.handleChangePass}
          />
        <div style={{marginTop:"10px"}} >
            <Spin size="small" spinning={this.state.loading}>
            <Button style={{
                borderWidth: "0px",
                borderRadius: "5px"
              }} onClick={this.lgnClick}>
                Log In
            </Button>
            </Spin>
        </div>
      </div>

    )
  }
}

export default Login;

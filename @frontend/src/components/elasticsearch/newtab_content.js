import React, {Component, Fragment} from 'react'
import { Layout } from 'antd'
import { Card, Input, List, Button} from 'antd'
import axios from "axios";
import { Spin } from 'antd'
import { Alert, Col, Row, Modal, Popconfirm, Popover, Skeleton, Icon, notification, message} from 'antd';
// import "./index.css"
import Highlighter from "react-highlight-words";
import ScrollableAnchor from 'react-scrollable-anchor'
import { APP_CONSTANTS } from './../../constants';
import "./newtab_content.css"
const { Header, Footer, Sider } = Layout
const { Meta } = Card

message.config({
  duration: 2,
  getContainer: document.getElementById('html-parent0')
})

const info = () => {
  message.info('This is a normal message');
};

export default class extends React.Component {
  constructor(){
    super()
    this.state = {
      mc_result  : "",
      mc_loading : true,
    }
    this.myRef = React.createRef();
  }

  componentDidMount(){
    //
    // axios.get(`http://127.0.0.1:8001`+"/html/" + this.props.data.title)
    //  .then(res => {
    //      console.log(res)
    //    this.setState({
    //      mc_result: res.data,
    //    })
    //    this.setState({
    //      mc_loading : false
    //    })
    //    this.inputElement.click()
    //     console.log(res.data.html)
    //  })
    //  .catch(err => {
    //    console.log(err)
    //  })

     axios.post(APP_CONSTANTS.BACKEND_ENTRY+"/html", {"id" : this.props.data.title, "highlight": this.props.data.highlight ? this.props.data.highlight : ""})
      .then(res =>  {
        console.log("balbla22")
        console.log(res)
        this.setState({
          mc_result: res.data,
        })
        this.setState({
          mc_loading : false
        })
        this.inputElement.click()
      })
      .catch(err => {
        console.log(err)
      })
      // ele = document.getElementsByClassName('Background_tab')
      // ele.scrollIntoView();
  }
  // <button onClick={()=>{window.location.href='#highlight'}} ref={input => this.inputElement = input}>Continue</button>
  render() {
    // return (
    //   <Skeleton loading={this.state.mc_loading} paragraph={{ rows: 20 }} active>
    //       <a href='#Background_tab' ref={input => this.inputElement = input}> *  </a>
    //       <div className="GeneratedHtml" dangerouslySetInnerHTML={{__html: this.state.mc_result}}/>
    //   </Skeleton>
    // )
    return (
      <Skeleton loading={this.state.mc_loading} paragraph={{ rows: 20 }} active>
          {this.props.data.tab == "notab" ? <a href={'#highlight'} ref={input => this.inputElement = input}> *  </a>
          :
          <a href={'#'+this.props.data.tab} ref={input => this.inputElement = input}> </a>}
          <div className="pagerating">
                <Button shape="circle" style={{marginRight:"5px", border:"0px"}}>
                <div>
                  <Icon type="like"/>
                 </div>
               </Button>
               <Button shape="circle" style={{border:"0px"}}>
               <div>
                 <Icon type="dislike"/>
                </div>
              </Button>
          </div>
          <div className="GeneratedHtml" id="html-parent0" dangerouslySetInnerHTML={{__html: this.state.mc_result}}/>
      </Skeleton>
    )
  }
}

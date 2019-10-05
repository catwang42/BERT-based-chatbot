import React, {Component} from 'react'
import { Layout } from 'antd'
import { Card, Input, List, Button} from 'antd'
import axios from "axios";
import { Spin } from 'antd'
import Answer from "./answer.js"
import { Alert, Col, Row, Modal, Popconfirm, Popover, Skeleton, message, Switch, Icon} from 'antd';
import "./searchpage.css"
import Highlighter from "react-highlight-words";
import Mc_result from "./mc_result"
import Lottie from 'react-lottie';
import Glass from "./hour_glass.json"
import { APP_CONSTANTS } from './../../constants';
const { Header, Footer, Sider } = Layout
const { Meta } = Card

function confirm() {
  message.info('Thank you!');
}

export default class extends Component {
  constructor(){
    super()
    this.state = {
      search_input : "",
      data : [],
      loading : false,
      mc_result  : "EFT",
      mc_loading : true,
      checked : false,
    }
  }


  onInputChange = (value) => {
    this.setState({
      search_input: value
    })
  }

  elastic_search = (value) => {
    console.log(value)
    this.setState({
      loading: true
    })
    axios.get(APP_CONSTANTS.BACKEND_ENTRY+"/elastic/" + value)
     .then(res => {
       console.log(res)
       this.setState({
         data: res.data.slice(0,3)
       })
       this.setState({
         loading: false
       })
      console.log(res.data)

     })
     .catch(err => {
       console.log(err)
     })
  }

  //
  //


  render() {
    const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: Glass,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
    return (
          <div className="CardSearch">
             <span className="CardHeader">
               Here are your answers
             </span>
             <div className="CardHeader3">
             Auto-clicking
             <Switch
                style={{marginLeft:"5px"}}
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
                size="small"
                checked={this.state.checked}
                onClick={()=>{this.setState({
                  checked :!this.state.checked
                })}}/>
              </div>
             <br />
             <span className="CardHeader2">
                {this.state.data.length + " Documents"}
             </span>
               <Input.Search
                   placeholder="input search text"
                   enterButton="Search"
                   size="large"
                   onSearch={value => this.elastic_search(value)}
                   onChange={value => this.onInputChange(value.target.value)}
                   value={this.state.search_input}
                   style={{color:"green", display: "none"}}
                 />
               <div className="SearchResult">
                 <Spin tip="Loading..." spinning={this.state.loading}>
                 {
                   this.state.loading ? <div style={{height:"50vh"}}></div> :
                     <List
                       itemLayout="horizontal"
                       dataSource={this.state.data}
                       renderItem={item => (
                         <List.Item>
                           <Answer data={item} search_input={this.props.search_input} clickDocuments={this.props.clickDocuments} checked={this.state.checked}/>
                         </List.Item>
                       )}
                     />
                   }
                 </Spin>
             </div>
           </div>
  )
  }
}

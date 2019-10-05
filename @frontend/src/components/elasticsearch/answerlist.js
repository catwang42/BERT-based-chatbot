import React, {Component} from 'react'
import { Layout } from 'antd'
import { Card, Input, List, Button} from 'antd'
import axios from "axios";
import { Spin } from 'antd'
import { Alert, Col, Row, Modal, Popconfirm, Popover, Skeleton, Divider, Icon} from 'antd';
import { ReactComponent as Like} from "../../asset/like.svg"
import { ReactComponent as Dislike} from "../../asset/dislike.svg"
import { ReactComponent as File} from "../../asset/content.svg"
import "./answerlist.css"
import Answer from './answer.js'
import { APP_CONSTANTS } from './../../constants';
// import "./index.css"
// import Highlighter from "react-highlight-words";

const { Header, Footer, Sider } = Layout
const { Meta } = Card


export default class extends React.Component {
  constructor(){
    super()
    this.state = {
      mc_result  : "EFT",
      mc_loading : true,
    }
  }
  machine_comprehension = (data) => {
      console.log("here")
      data["question"] = this.props.search_input

      axios.post(APP_CONSTANTS.BACKEND_ENTRY+"/mc/document", {data})
       .then(res => {

         this.setState({
           mc_result: res.data,
         })
         this.setState({
           mc_loading : false
         })
           console.log(res)
       })
       .catch(err => {
         console.log(err)
       })
  }

  componentDidMount(){
    // this.machine_comprehension(this.props.data)
  }
  render(){
    return (
      <div className="AnswerCardList">
          {
            this.props.data.map((item, index) => (
              <Answer data={item} search_input={this.props.search_input} clickDocuments={this.props.clickDocuments}/>
            ))
          }
      </div>
    )
  }

  // render() {
  //   return (<div className="extended_txt">
  //     <Skeleton loading={this.state.mc_loading} paragraph={{ rows: 20 }} active>
  //
  //       <Highlighter
  //           highlightClassName="highlight_text"
  //           searchWords={[this.state.mc_result]}
  //           autoEscape={false}
  //           textToHighlight={this.props.data.fulltext}
  //           />
  //     </Skeleton>
  //   </div>)
  // }
}

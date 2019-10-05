import React, {Component} from 'react'
import { Layout } from 'antd'
import { Card, Input, List, Button} from 'antd'
import axios from "axios";
import { Spin } from 'antd'
import { Alert, Col, Row, Modal, Popconfirm, Popover, Skeleton } from 'antd';
// import "./index.css"
import Highlighter from "react-highlight-words";
import { APP_CONSTANTS } from './../../constants';
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
    this.machine_comprehension(this.props.data)
  }

  render() {
    return (<div className="extended_txt">
      <Skeleton loading={this.state.mc_loading} paragraph={{ rows: 20 }} active>

        <Highlighter
            highlightClassName="highlight_text"
            searchWords={[this.state.mc_result]}
            autoEscape={false}
            textToHighlight={this.props.data.fulltext}
            />
      </Skeleton>
    </div>)
  }
}

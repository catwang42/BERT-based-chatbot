import React, {Component} from 'react'
import { Layout } from 'antd'
import { Card, Input, List, Button} from 'antd'
import axios from "axios";
import { Spin } from 'antd';
import { Alert, Col, Row, Modal, Popconfirm, Popover, Skeleton, Divider, Icon, Tooltip } from 'antd';
import { ReactComponent as Like} from "../../asset/like.svg"
import { ReactComponent as Dislike} from "../../asset/dislike.svg"
import { ReactComponent as File} from "../../asset/content.svg"
import "./answerlist.css"
import Lottie from 'react-lottie';
import Smile from "./smile.json"
import { APP_CONSTANTS } from './../../constants';

export default class extends React.Component {

  constructor(){
    super()
    this.state = {
      hide : "none",
      mc_loading : true,
      mc_result : false,
      like: false,
      likeStop: true,
      tab: "Background_tab"
    }
  }

  reset = () => {
    this.setState({
      hide : "none",
      mc_loading : true,
      mc_result : false,
      like: false,
      likeStop: true,
    })
  }

  componentDidMount(){
    if(this.props.checked){
    this.expand({"full_text":this.props.data.full_text, "question": this.props.search_input, "document_id": this.props.data.document_id})
    }
  }

  machine_comprehension = (data) => {
      console.log(data)
      axios.post(APP_CONSTANTS.BACKEND_ENTRY+"/mc/document", {data})
       .then(res => {
         this.setState({
           mc_result: res.data.res,
           tab: res.data.tab,
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

  expand = (data) => {
    if (this.state.hide=="none"){
      if (this.state.mc_result==false){
        this.machine_comprehension(data)
      }
    this.setState({
      hide : "block"
    })
    }
    else{
      this.setState({
        hide : "none"
      })
    }
  }

  render(){
    const defaultOptions = {
  loop: false,
  autoplay: this.state.like,
  animationData: Smile,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
    return(
      <div className="ItemCard">
  <div className="ItemTitle" onClick={()=>this.expand({"full_text":this.props.data.full_text, "question": this.props.search_input, "document_id": this.props.data.document_id})}>
    <span className="AnswerCardText0">
      {this.props.data.document_id}
    </span>
    <span className="AnswerCardText">
       {this.props.data.bg_title.slice(0,1).toUpperCase() + this.props.data.bg_title.slice(1,this.props.data.bg_title.length)}
    </span>
   </div>
  <div className="AnswerCardContent" onClick={()=>this.expand({"full_text":this.props.data.full_text, "question": this.props.search_input, "document_id": this.props.data.document_id})}>
      {"T" + this.props.data.process_des.slice(1:-1)}
  </div>
  <div className="AnswerCardBottom">
      <Tooltip title="Link to original document">
        <Button className="AnswerCardBut0" onClick={()=>this.props.clickDocuments({title:this.props.data.document_id, content: this.props.data.full_text, highlight: this.state.mc_result, tab:this.state.tab})}>
         <div>
           <Icon type="file-text" />
          </div>
        </Button>
      </Tooltip>
      <div className="AnswerCardButs">
          <Button className="AnswerCardBut1" onClick={()=>{
            if (!this.state.like){
                this.setState({like : !this.state.like, likeStop: !this.state.likeStop,})
            }
            else {this.setState({likeStop: !this.state.likeStop,})}
          }}>
            <span> {this.props.data.likes ? this.props.data.likes : 0} </span>
            <Icon type="like" className="Dislike"/>
          </Button>
          <Button className="AnswerCardBut2">
            <span>  {this.props.data.dislikes ? this.props.data.dislikes : 0}  </span>
            <Icon type="dislike" className="Dislike"/>
          </Button>
      </div>
      <Button type="link" className="AnswerCardBut3">
       <div>
         {this.state.hide=="block" ? <Icon type="caret-up" /> : <Icon type="caret-down" />}
       </div>
      </Button>
  </div>
  <div className={ this.state.mc_loading ? "ItemHiddenLoading" : "ItemHidden" } style={{display: this.state.hide}}>
    <Skeleton loading={this.state.mc_loading} paragraph={{ rows: 2 }} title={false} avatar={true} active>
      {
        <div style={{display:"flex"}}>
        <img src={APP_CONSTANTS.CHAT_LOGO} className="ItemHiddenImg"/>
        <div>
        <span className="ItemHiddenText">
          {"I found your answer in " }
          <strong> {this.state.tab} </strong>
        <Button shape="circle" className="item-hidden-button" onClick={()=>this.props.clickDocuments({title:this.props.data.document_id, content: this.props.data.full_text, highlight: this.state.mc_result, tab:this.state.tab})}>
         <div>
           <Icon type="file-search"/>
          </div>
        </Button>
        </span>
        <br />
        <span className="ItemHiddenText2">
         {"The answer might be "}
          <strong>{this.state.mc_result}</strong>
         <Button shape="circle" className="item-hidden-button2" onClick={()=>this.props.clickDocuments({title:this.props.data.document_id, content: this.props.data.full_text, highlight: this.state.mc_result, tab: "notab"})}>
         <div>
           <Icon type="file-search"/>
          </div>
        </Button>
        </span>
        </div>
        </div>
      }
    </Skeleton>
  </div>
</div>
)
}
}

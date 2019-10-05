import React, { Component } from 'react';
import closeIcon from './../assets/magic-wand.svg';
import { Progress, Icon, Button } from 'antd'
import { APP_CONSTANTS } from "./../../../constants"



class Header extends Component {

  constructor(props){
    super(props)
    this.state = {
      percent : 100
    }
  }

  render() {
    return (
      <div>
        <div className="sc-header">
          <img className="sc-header--img" src={this.props.imageUrl ? (this.props.imageUrl) : (APP_CONSTANTS.CHAT_LOGO)} alt="" />
          <div className="sc-header--team-name"> {this.props.teamName ? this.props.teamName : "KPMG Chatbot"} </div>
          { this.props.isLoggedIn ?
            (<Button type="link" className="sc-header--link" ghost onClick={()=>{this.props.logout()}}>
              <Icon type="export"/>
            </Button>)
            :
            null
          }

    </div>

      </div>

    );
  }
}

export default Header;

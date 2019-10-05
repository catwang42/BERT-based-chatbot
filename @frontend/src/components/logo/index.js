import logo from '../../asset/DHS_government.png'
import React, {Component} from 'react'
import {render} from 'react-dom'
import { Row , Col, Button, Card, Icon, Divider } from "antd"
import "./index.sass"

export default class Header extends Component {


  render(){
    return (
      <div className="LogoHeader">
          {this.props.isUserLogged ? (
              <div className="LogoTile">
                  <img src={logo} alt="Department of Human Service" className="LogoImage"/>
                  <Divider type="vertical" className="LogoDivider0"/>
                  <div className="LeftLogo" id="Logo">
                    <span className="LogoInfo1">
                      {this.props.name}
                      <Icon style={{  marginLeft: "5px"}} width="20px" type="check-circle" theme="twoTone" twoToneColor="#52c41a" className="LogoIcon"/>
                    </span>
                    <div className="LeftLogo1">
                      <span className="LogoInfo2">
                        Medicare
                      </span>
                      <Divider type="vertical" className="LogoDivider"/>
                      <span className="LogoInfo0">
                        Junior Officer
                      </span>
                    </div>
                  </div>
              </div>) : <img src={logo} alt="Department of Human Service" className="LogoImage" style={{height:"48px", marginTop: "-5px"}}/>
            }
      </div>
)
}
}

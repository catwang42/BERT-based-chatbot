import React, { Component } from 'react';
import Linkify from 'react-linkify';
import { Row, Col, Button } from "antd"

const SelectMessage = (props) => {
  return(


  <div className="sc-message--select">
  <span>
    {props.data.message}
  </span>
  {props.data.options.map((option) => (
    <div className="sc-message--options">
        <Button type="primary" ghost>
          {option.id + ". " + option.content}
        </Button>

    </div>
    ))
  }
  </div>


  )
}

export default SelectMessage

import React, { Component } from 'react';
import Linkify from 'react-linkify';
import "./TimeDivider.css"

const TimeDivider = (props) => {
  return <div className="TimeDivider">{
    props.data.text
  }</div>
}

export default TimeDivider

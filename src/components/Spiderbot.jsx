import React, { Component } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import AlertTemplate from "react-alert-template-basic";
import { transitions, positions, Provider as AlertProvider } from "react-alert";



import "./Spiderbot.css";
import NodeList from "./NodeList.jsx";

class Spiderbot extends Component {
  render() {
    const bankStyle = {
      border: "2px black",
      // background-attachment: 'scroll',
      // background-clip :  'border-box',
      // background-color : 'rgb(252, 252, 252)',
      // background-image : 'none',
      // background-origin : 'padding-box',
      // background-position-x : '0%',
      // background-position-y : '0%',

      // background-repeat : 'y',
      // background-size : 'auto',
      // border-right-color : 'rgb(238, 238, 238)',
      // border-right-style : 'solid',
      // border-right-width : '0.996094px',
      // box-sizing : 'border-box',
      // color : 'rgb(85, 89, 92)',

      // font-size : '12px',
      // font-weight : '200',

      // height : '207.959px',
      // letter-spacing : '1px',
      // line-height : '18px',
      // padding-bottom: '15px',
      // padding-left: '10px',
      // padding-right : '10px',
      // padding-top : '15px',
      // text-align : 'start'
    };

    return (
      <AlertProvider className="SpiderCanvas" template={AlertTemplate}>
        <div className="NodeList">
          <NodeList />
        </div>
      </AlertProvider>
    );
  }
}

export default Spiderbot;

import React, { Component } from "react";

class Video extends Component {
  
    render() {
      return (
        <video controls muted loop>
            <source src = "/src/components/drip.mp4" type="video/mp4"></source>
        </video>
      );
    }
  }
  
  export default Video;
import React from "react";
import "./MusicProgress.css";

import "bootstrap/dist/css/bootstrap.css";

export default class MusicProgress extends React.Component {
  render() {
    console.log(this.props.value);
    var mid = 0.01;
    var leftWidth = ((this.props.value - mid) * 100).toString() + "%";
    var rightWidth = ((1.0 - mid - this.props.value) * 100).toString() + "%";

    console.log(leftWidth);
    console.log(mid);
    console.log(rightWidth);

    mid = mid.toString() * 100 + "%";
    return (
      <div className="musicPlayerContainer">
        <div className="musicPlayerInner">
          <div className="musicPlayerLeft" style={{ width: leftWidth }} />
          <div className="musicPlayerCenter" style={{ width: mid }} />
          <div className="musicPlayerRight" style={{ width: rightWidth }} />
        </div>
      </div>
    );
  }
}

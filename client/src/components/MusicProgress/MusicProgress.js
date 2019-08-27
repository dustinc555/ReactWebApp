import React from "react";
import "./MusicProgress.css";

import "bootstrap/dist/css/bootstrap.css";

export default class MusicProgress extends React.Component {
  render() {
    var mid = "0%";
    var leftWidth = "0%";
    var rightWidth = "0%";

    if (this.props.value) {
      mid = 0.01;
      leftWidth = ((this.props.value - mid) * 100).toString() + "%";
      rightWidth = ((1.0 - mid - this.props.value) * 100).toString() + "%";
      mid = mid.toString() * 100 + "%";
    }

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

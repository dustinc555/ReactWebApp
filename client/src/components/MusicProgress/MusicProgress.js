import React from "react";
import ReactDOM from "react-dom";

import "./MusicProgress.css";

import "bootstrap/dist/css/bootstrap.css";

export default class MusicProgress extends React.Component {
  constructor(props) {
    super(props);
    this.clickCallback = this.clickCallback.bind(this);
    this.state = { rect: null };
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    this.setState({ rect: rect });
  }

  clickCallback(e) {
    // get rough percentage through song

    var x = e.pageX - this.state.rect.left;
    console.log(
      "%: " +
        (e.pageX - this.state.rect.left) /
          (this.state.rect.right - this.state.rect.left)
    );
    this.props.clickCallback(
      (e.pageX - this.state.rect.left) /
        (this.state.rect.right - this.state.rect.left)
    );
  }

  render() {
    var mid = "0%";
    var leftWidth = "0%";
    var rightWidth = "0%";

    if (this.props.value) {
      mid = 0.005;
      leftWidth = ((this.props.value - mid) * 100).toString() + "%";
      rightWidth = ((1.0 - mid - this.props.value) * 100).toString() + "%";
      mid = mid.toString() * 100 + "%";
    }

    return (
      <div onClick={this.clickCallback} className="playBar">
        <div className="musicPlayerInner">
          <div className="musicPlayerLeft" style={{ width: leftWidth }} />
          <div className="musicPlayerCenter" style={{ width: mid }} />
          <div className="musicPlayerRight" style={{ width: rightWidth }} />
        </div>
      </div>
    );
  }
}

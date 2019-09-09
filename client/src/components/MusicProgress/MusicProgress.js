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

  /** Entertaining myself
   * (my project my rules)
   * i wont have this active for anyone viewing the app tho
   * dont want to cause any uneccesary seizures
   */
  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    var mid = "0%";
    var leftWidth = "0%";

    var c1 = this.getRandomColor();
    var c2 = this.getRandomColor();
    var c3 = this.getRandomColor();

    if (this.props.value) {
      mid = 0.005;
      leftWidth = ((this.props.value - mid) * 100).toString() + "%";
      mid = mid.toString() * 100 + "%";
    }

    return (
      <div className="musicPlayerInner" onClick={this.clickCallback}>
        <div className="musicPlayerLeft" style={{ width: leftWidth }} />
        <div className="musicPlayerCenter" style={{ width: mid }} />
      </div>
    );
  }
}

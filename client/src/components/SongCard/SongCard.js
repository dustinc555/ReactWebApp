import React from "react";

import { Media } from "react-bootstrap";

export default class SongCard extends React.Component {
  constructor(props) {
    super(props);
    this.onCardClicked = this.onCardClicked.bind(this);
  }

  onCardClicked() {
    this.props.callback(this.props.index);
  }

  render() {
    var backgroundColor = "white";
    if (this.props.selectedSong === this.props.index) {
      backgroundColor = "teal";
    }

    return (
      <Media
        as="li"
        style={{
          backgroundColor: backgroundColor,
          border: "solid thin black",
          borderRadius: ".3em",
          margin: ".3em",
          height: 64
        }}
      >
        <img
          width={64}
          height={"100%"}
          className="mr-3"
          src={"images/" + this.props.idsong + ".jpg"}
          onClick={this.onCardClicked}
          alt=""
        />
        <Media.Body>
          <b style={{ fontSize: "75%" }}>{this.props.title}</b>
          <br />
          <i style={{ fontSize: "75%" }}>{this.props.artist}</i>
        </Media.Body>
      </Media>
    );
  }
}

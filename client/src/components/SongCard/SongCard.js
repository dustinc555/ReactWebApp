import React from "react";
import { Media } from "react-bootstrap";
import "./SongCard.css";

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
      backgroundColor = "#007bff";
    }

    return (
      <Media
        className="songCard"
        as="li"
        style={{
          backgroundColor: backgroundColor,
          border: "solid thin black",
          borderRadius: ".3em",
          margin: ".3em",
          height: 64,
          cursor: "pointer",
          transition: "all .2s ease-in-out",
          zIndex: "auto"
        }}
        onClick={this.onCardClicked}
      >
        <img
          width={64}
          height={"100%"}
          className="mr-3"
          src={"images/" + this.props.idsong + ".jpg"}
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

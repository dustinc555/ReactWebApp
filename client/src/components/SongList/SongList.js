import React from "react";
import SongCard from "../SongCard/SongCard";
import "./SongList.css";
import { Navbar, Nav, Button, Form, FormControl } from "react-bootstrap";

export default class SongList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { songs: [], playing: false, currentSong: null };
    this.songCardCallback = this.songCardCallback.bind(this);
    this.audioPlayer = new Audio();
  }

  componentDidMount() {
    fetch("/api/song/all")
      .then(res => res.json())
      .then(songs => this.setState({ songs }));

    console.log(this.state);
  }

  songCardCallback(index) {
    this.setState({ playing: true, currentSong: index });
    this.audioPlayer.src = "songs/" + this.state.songs[index].idsong + ".wav";
    this.audioPlayer.load();
    this.audioPlayer.play();
  }

  nextButtonCallback() {
    // either next item or start from the beginning
    var nextIndex =
      this.state.currentSong === this.state.songs.length
        ? 0
        : this.state.currentSong + 1;
  }

  render() {
    var text = "Play";
    if (this.state.playing) {
      text = "Pause";
    }

    return (
      <div className="songListContainer">
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            style={{ width: "65%" }}
          />
          <Button variant="outline-info" style={{ width: "25%" }}>
            Search
          </Button>
        </Form>
        <ul className="songlist">
          {this.state.songs.map((song, index) => {
            return (
              <SongCard
                index={index}
                idsong={song.idsong}
                title={song.title}
                artist={song.artist}
                selectedSong={this.state.currentSong}
                callback={this.songCardCallback}
              />
            );
          })}
        </ul>
        <div className="PlayBar">
          <button>Prev</button>
          <button>{text}</button>
          <button>Next</button>
        </div>
      </div>
    );
  }
}

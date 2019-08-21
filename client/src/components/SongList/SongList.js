import React from "react";
import SongCard from "../SongCard/SongCard";
import "./SongList.css";
import { Navbar, Nav, Button, Form, FormControl } from "react-bootstrap";

export default class SongList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      playing: false,
      currentSong: null,
      songQuery: ""
    };
    this.audioPlayer = new Audio();
    this.songCardCallback = this.songCardCallback.bind(this);
    this.nextButtonCallback = this.nextButtonCallback.bind(this);
    this.previousButtonCallback = this.previousButtonCallback.bind(this);
    this.playButtonCallback = this.playButtonCallback.bind(this);
    this.onVolumneChange = this.onVolumneChange.bind(this);

    this.audioPlayer.onended = () => {
      this.nextButtonCallback();
    };
  }

  componentDidMount() {
    fetch("/api/song/all")
      .then(res => res.json())
      .then(songs => this.setState({ songs }));

    console.log(this.state);
  }

  onSongSearchSubmit() {
    fetch("/api/song/all")
      .then(res => res.json())
      .then(songs => this.setState({ songs }));
  }

  onQueryChange(e) {
    this.setState({ songQuery: e.target.value });
  }

  onVolumneChange(e) {
    let volumePercent = e.target.value;
    this.audioPlayer.volume = volumePercent;
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
      this.state.currentSong === this.state.songs.length - 1
        ? 0
        : this.state.currentSong + 1;
    this.songCardCallback(nextIndex);
  }

  previousButtonCallback() {
    // either previous item or start from the end
    var previousIndex =
      this.state.currentSong === 0
        ? this.state.songs.length - 1
        : this.state.currentSong - 1;
    this.songCardCallback(previousIndex);
  }

  playButtonCallback() {
    let isPlaying = !this.state.playing;
    this.setState({ playing: isPlaying });

    if (isPlaying) {
      this.audioPlayer.play();
    } else {
      this.audioPlayer.pause();
    }
  }

  render() {
    var text = "Play";
    if (this.state.playing) {
      text = "Pause";
    }

    return (
      <div className="songListContainer">
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
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
          <Button onClick={this.previousButtonCallback}>Prev</Button>
          <Button style={{ width: "35%" }} onClick={this.playButtonCallback}>
            {text}
          </Button>
          <Button onClick={this.nextButtonCallback}>Next</Button>
          <Form.Control
            type="range"
            min={0}
            max={1}
            step={0.01}
            defaultValue={this.audioPlayer.volume}
            onChange={this.onVolumneChange}
            style={{ width: "50%", margin: "0 auto" }}
          />
        </div>
      </div>
    );
  }
}

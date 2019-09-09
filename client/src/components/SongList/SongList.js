import React from "react";
import SongCard from "../SongCard/SongCard";
import MusicProgress from "../MusicProgress/MusicProgress";

import "./SongList.css";

import { Button, Form, FormControl } from "react-bootstrap";

export default class SongList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      playing: false,
      currentSong: null,
      queryText: "",
      volume: 0.5,
      currentTime: 0,
      waiting: false,
      audioPlayer: new Audio()
    };

    this.state.audioPlayer.volume = this.state.volume;
    this.songCardCallback = this.songCardCallback.bind(this);
    this.nextButtonCallback = this.nextButtonCallback.bind(this);
    this.previousButtonCallback = this.previousButtonCallback.bind(this);
    this.playButtonCallback = this.playButtonCallback.bind(this);
    this.onVolumneChange = this.onVolumneChange.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
    this.querySongs = this.querySongs.bind(this);
    this.onSeek = this.onSeek.bind(this);

    /** Audio Player Events */
    // Bind audio player events
    this.state.audioPlayer.onended = () => {
      this.nextButtonCallback();
    };

    this.state.audioPlayer.ontimeupdate = () => {
      // re render with new time
      this.forceUpdate();
    };

    this.state.audioPlayer.waiting = () => {
      console.log("i am waiting");
      this.setState({ waiting: true, playing: false });
    };

    this.state.audioPlayer.stalled = () => {
      console.log("i am stalled");
      this.setState({ waiting: true, playing: false });
    };

    this.state.audioPlayer.suspend = () => {
      console.log("i am suspended");
      this.setState({ waiting: true, playing: false });
    };

    /** Initialize data */
    fetch("/api/song/all")
      .then(res => res.json())
      .then(songs => this.setState({ songs }));
  }

  /**
   * Sets the current song time from percent value
   * @param {float between 0 and 1} value
   */
  onSeek(value) {
    console.log(
      "seeking: " + Math.floor(value * this.state.audioPlayer.duration)
    );

    var seek = value * this.state.audioPlayer.duration;

    this.state.audioPlayer.currentTime = Math.floor(seek ? seek : 0);
  }

  querySongs() {
    fetch("/api/song/query", {
      method: "POST",
      body: JSON.stringify({ text: this.state.queryText })
    })
      .then(res => res.json())
      .then(songs => this.setState({ songs }));
  }

  onQueryChange(e) {
    this.setState({ queryText: e.target.value });
  }

  onVolumneChange(e) {
    let volumePercent = e.target.value;
    this.state.audioPlayer.volume = volumePercent;
  }

  songCardCallback(index) {
    this.setState({ playing: true, currentSong: index });
    this.state.audioPlayer.src =
      "songs/" + this.state.songs[index].idsong + ".wav";
    this.state.audioPlayer.load();
    this.state.audioPlayer.play();
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
      this.state.audioPlayer.play();
    } else {
      this.state.audioPlayer.pause();
    }
  }

  render() {
    var text = "Play";
    if (this.state.playing) {
      text = "Pause";
    }

    /* todo: figure out why the songlist's max height 
    must be declared within the render to display properly */
    var currentTime =
      this.state.audioPlayer.currentTime / this.state.audioPlayer.duration;

    return (
      <div className="songListContainer">
        <Form inline className="listControls">
          <FormControl
            type="text"
            onChange={this.onQueryChange}
            placeholder="Artist or title"
            className="mr-sm-2"
          />
          <Button onClick={this.querySongs} variant="outline-info">
            Search
          </Button>
        </Form>

        <ul className="songlist" style={{ maxHeight: "50vh" }}>
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

        <MusicProgress clickCallback={this.onSeek} value={currentTime} />

        <Form inline className="listControls">
          <div>
            <Button onClick={this.previousButtonCallback}>&#60;</Button>
            <Button style={{ width: "4em" }} onClick={this.playButtonCallback}>
              {text}
            </Button>
            <Button onClick={this.nextButtonCallback}>&#62;</Button>
          </div>
          <FormControl
            className="volumeBar"
            type="range"
            min={0}
            max={1}
            step={0.01}
            defaultValue={this.state.audioPlayer.volume}
            onChange={this.onVolumneChange}
          />
        </Form>
      </div>
    );
  }
}

import React from "react";

export default class SongList extends React.Component {
  state = { songs: [] };

  componentDidMount() {
    fetch("/api/song/all")
      .then(res => res.json())
      .then(songs => this.setState({ songs }));

    console.log(this.state);
  }

  render() {
    return (
      <ul>
        {this.state.songs.map(song => {
          return (
            <li key={song.idsong}>
              '"id:" + song.idsong + " title: " + song.title + " author: " +
              song.artist'
            </li>
          );
        })}
      </ul>
    );
  }
}

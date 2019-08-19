import React from "react";
import { Form } from "react-bootstrap";

/** UploadForm
 * Keeps react state as the single source of truth by updating the state
 * every time elements of the form are changed.
 */
export default class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: "",
      title: "",
      img: null,
      song: null,
      loadingSong: false,
      loadingImg: false
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onArtistChange = this.onArtistChange.bind(this);
    this.onImgChange = this.onImgChange.bind(this);
    this.onSongChange = this.onSongChange.bind(this);
  }

  onTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  onArtistChange(e) {
    this.setState({ artist: e.target.value });
  }

  onSongChange(e) {
    this.setState({ song: e.target.files[0] });
  }

  onImgChange(e) {
    this.setState({ img: e.target.files[0] });
  }

  onFormSubmit(e) {
    /* creates form from state and posts form to server */
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("artist", this.state.artist);
    formData.append("img", this.state.img);
    formData.append("song", this.state.song);

    fetch("http://localhost:3001/api/song/insert", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(res_json => {
        console.log(res_json);
        window.location.reload();
      });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} style={{ margin: "1em" }}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            onChange={this.onTitleChange}
            placeholder="no sleep till brooklyn"
          />
        </Form.Group>

        <Form.Group controlId="artist">
          <Form.Label>Artist</Form.Label>
          <Form.Control
            type="text"
            onChange={this.onArtistChange}
            placeholder="beastie boys"
          />
        </Form.Group>

        <Form.Group controlId="song">
          <Form.Label>Song File: .wav</Form.Label>
          <Form.Control
            type="file"
            accept=".wav"
            onChange={this.onSongChange}
          />
        </Form.Group>

        <Form.Group controlId="img">
          <Form.Label>Song Image: 64x64</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={this.onImgChange}
          />
        </Form.Group>

        <button variant="dark" onClick={this.onFormSubmit}>
          Submit
        </button>
      </Form>
    );
  }
}

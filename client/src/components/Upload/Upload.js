import React from "react";
import { Form, Button } from "react-bootstrap";
import ImageUploader from "react-images-upload";
import mysql from "mysql";

export default class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { author: "", title: "", img: null, song: null };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onAuthorChange = this.onAuthorChange.bind(this);
    this.onImgChange = this.onImgChange.bind(this);
    this.onSongChange = this.onSongChange.bind(this);
  }

  onTitleChange(e) {
    console.log("title changed");
    this.setState({ title: e.target.value });
    console.log(this.state);
  }

  onAuthorChange(e) {
    console.log("author changed");
    this.setState({ author: e.target.value });
    console.log(this.state);
  }

  onImgChange(img) {
    console.log("img changed");
    this.setState({ img: img });
    console.log(this.state);
  }

  onSongChange(e) {
    console.log("song changed");
    this.setState({ author: e.target.value });
    console.log(this.state);
  }

  onFormSubmit(e) {
    // send post request to proxy
  }

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        style={{ width: "50%", display: "inline-block", textAlign: "left" }}
      >
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            onChange={this.onTitleChange}
            placeholder="no sleep till brooklyn"
          />
        </Form.Group>

        <Form.Group controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            onChange={this.onAuthorChange}
            placeholder="beastie boys"
          />
        </Form.Group>

        <Form.Group controlId="song">
          <Form.Label>Song File</Form.Label>
          <Form.Control type="file" />
        </Form.Group>

        <ImageUploader
          withIcon={true}
          buttonText="Choose images"
          onChange={this.onImgChange}
          imgExtension={[".jpg", ".png"]}
          maxFileSize={5242880}
        />

        <Button variant="primary" onClick={this.onFormSubmit}>
          Submit
        </Button>
      </Form>
    );
  }
}

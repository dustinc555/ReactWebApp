import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import ImageUploader from "react-images-upload";
import settings from "../../services";
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
    // insert title and author into db
    let connection = mysql.createConnection(settings);
    connection.connect();
    var newSong = {
      title: this.state.title,
      author: this.state.author
    };

    let sql = "INSERT INTO trn_employee SET ?";
    connection.query(sql, newSong, (err, result) => {
      console.log("song id: " + result.insertId);
    });
    connection.end();
    // give static files a name corresponding to id

    // clear state
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

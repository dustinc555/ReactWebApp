import React from "react";

export default class About extends React.Component {
  render() {
    return (
      <div>
        <h3>Hi</h3>
        <p>This is my music app.</p>
        <p>
          This app has an express backend with a basic api for retreving song
          data from a mysql server.
        </p>
        <hr />
        <h4>Play</h4>
        <h5>Search Bar</h5>
        <p>
          <b>all:</b> Gets all songs for you.
        </p>
        <p>
          Otherwise it will search both song title and artist names for
          similarities.
        </p>
        <hr />
        <h4>Upload</h4>
        <p>I would love to see what songs you upload!</p>
        <p>I do check what you are attempting to upload before hand tho.</p>
        <p>
          The image should be around 64 x 64 to be displayed well, the size
          limit is 50kb.
        </p>
        <p>The song has to be a wav file.</p>
      </div>
    );
  }
}

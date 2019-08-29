# React Media App

## Hi

This is a demo media app written with:

- React - client
- Express - backend
- MySQL - database

and several other community packages accesable through npm.

## Viewing the app

### [My server](http://react-media-app.duckdns.org/)

### Deploying on your own machine

1. Clone the repo: `git clone https://github.com/dustinc555/react_web_app.git`

2. Build the client:

   `cd react_web_app`

   `cd client`

   `npm install` (client dependencies)

   `npm run-script build`

   <b>Building the app is required before starting the express server.</b>

3. In order to start the server, navigate to the root directory and run:

   `npm install` (server dependencies)

   `npm start` the server defaults to port 3001 because the clients development server runs on port 3000.

## Client

### create-react-app

The client was made using the package [Create React App](https://create-react-app.dev/)

### Development Server

The react client has its own development server that proxies to the express server at port `3001` however if no data is being retreived or moved around the server it is not needed to work on the aesthetic of the client.

### Deployment

## Server

The server either serves the built react client or JSON if the api is used.

The server by default runs on port `3001` but it may be changed by giving it a port to run on ex: `PORT=8080 node app.js`

### API

- `/api/song/get/:id`

  <b>Returns</b> a song object with the matching id otherwise an error message.

- `/api/song/insert`

  <b>Expects</b> A post request with the fields: req.files.img (an image file), req.files.song (a wav file), req.body.title ( string), req.body.artist (string)

  <b>Returns</b> If successful, returns the id of the newly inserted song, otherwise and error message.

- `/api/query`

  Takes a post string and returns a filtered list of JSON songs based on the string.

  Ex: Given the query string "A day in the it may return JSON for the song A Day in the life.

```js
fetch("/api/song/query", {
  method: "POST",
  body: JSON.stringify({ text: "A day in the" })
})
  .then(res => res.json())
  .then(songs => console.log(songs));
```

this would return the following JSON

```js
[
  {
    idsong: 91,
    title: "A Day In The Life",
    artist: "The Beatles",
    tr: 2.181887149810791,
    ar: 0
  }
];
```

tr - title relevance,
ar - artist relevance

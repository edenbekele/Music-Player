import React, { Component } from "react";
import hash from "./hash";
import * as $ from "jquery";
import Player from "./Player";
import logo from "./logo.svg";
import "./App.css";

export const authEndpoint = "https://accounts.spotify.com/authorize";

const clientId = "a7cea9e91767484796676a5037d4375c";
const redirectUri = "http://localhost:3000";
const scopes = ["user-read-currently-playing", "user-read-playback-state"];

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

  class App extends Component {
    constructor() {
      super();
      this.state = {
        token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms:0,
      },
      is_playing: "Paused",
      progress_ms: 0
    };
    componentDidMount() {
      // Set token
      let _token = hash.access_token;
      if (_token) {
        // Set token
        this.setState({
          token: _token
        });
      }
    }

    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }
  
  getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms,
        });
      }
    });
  }

    render() {
      return (
        <div className="App">
          <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {this.state.token && (
              <Player
              item={this.state.item}
              is_playing={this.state.is_playing}
              progress_ms={this.progress_ms}
              />          )}
          </header>
        </div>
      );
      }
    }
    

export default App;

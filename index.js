import express from 'express';
import cors from 'cors';

import http from 'http';
import { Server } from 'socket.io';
import fetch from 'node-fetch';

const app = express();
app.use(cors());

const server = http.createServer(app) 
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST'],
  }
})

io.on("connection", (socket) => {

  ///// messaging /////

  socket.on("send_message", (data) => {

    let key = Object.keys(data)[0];
    let value = data[key];
    socket.broadcast.emit("receive_message", { [key]: value });

  });

  ///// spotify /////

  socket.on("create_playlist", async (data) => {

    try {

      // console.log(data);

      let key = Object.keys(data)[0];
      let value = data[key];

      const tracksUri = [value];

      // console.log(`tracksURI: ${tracksUri}`);

      const createdPlaylist = await createPlaylist(tracksUri);

      // console.log(`playlist: ${createdPlaylist}`);
      // console.log(`playlistID: ${createdPlaylist.id}`);

      socket.broadcast.emit("start_playlist", { id: createdPlaylist.id });

    } catch (error) {
      
      console.error("Error creating playlist:", error);
      socket.emit("error", "Failed to create playlist");

    }

  });

  socket.on("add_song", async (data) => {

    try {
      console.log(data);

      let playlistId = data.playId;
      let tracksUri = Array.isArray(data.uri) ? data.uri : [data.uri]; // Ensure tracksUri is an array
  
      console.log(`tracksURI: ${tracksUri}`);
      console.log(`playlistID: ${playlistId}`);
  
      // Update the playlist by adding tracks
      await fetchWebApi(
        `v1/playlists/${playlistId}/tracks`,
        'POST',
        {
          uris: tracksUri,
          "position": 0 // Send URIs in the body as an array
        }
      );

      let updatedPlayList = await fetchWebApi(
        `v1/playlists/${playlistId}`,
        'GET'
      );
  
      // Notify clients that the playlist has been updated
      socket.broadcast.emit("start_playlist", { id: updatedPlayList.id });

    } catch (error) {
      console.error("Error updating playlist:", error);
      socket.emit("error", "Failed to update playlist");
    }
  });
});


///// spotify helpers /////

const token = 'BQBdw0X4i0s7ujCbAndqsoEUHEIgiNL4THGQcyuQbx2HZcY5M_0BFDlRW6rjZMLK2I4xea7VlJzvYq1tnHH_fIecN3QEanFYGhjpMRC59n7FkYYzfqGtgMhw8bFd9O5HtK-bmGmOK2I-3dV0F09XtbaFh9DOiHZHetaoQeINudfvI6lPsdvuQ3eL97SDUaXCvcuxAVpMKCjwl3AIoTeP3jxC8PSwXCX2S0L9xl-L27OGNzOwMnoZF549B2pYkB0UjQY91XTU'

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  });

  // Check if the request was successful
  if (!res.ok) {
    const errorDetails = await res.json();
    console.error(`Spotify API error: ${errorDetails.error.message}`);
    throw new Error(`Spotify API error: ${errorDetails.error.message}`);
  }

  return await res.json();
}

async function createPlaylist(tracksUri) {
  try {
    // Get the user ID
    const { id: user_id } = await fetchWebApi('v1/me', 'GET');

    // Create the playlist
    const playlist = await fetchWebApi(
      `v1/users/${user_id}/playlists`, 'POST', {
        "name": "My playlist",
        "description": "A playlist to share.",
        "public": false,
      }
    );

    console.log(`Playlist Response: ${JSON.stringify(playlist, null, 2)}`); // Log the playlist response

    // Check if the playlist was created successfully
    if (!playlist || !playlist.id) {
      throw new Error("Failed to create playlist or retrieve playlist ID");
    }

    // Add tracks to the playlist
    await fetchWebApi(
      `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
      'POST'
    );

    return playlist;

  } catch (error) {
    console.error("Error in createPlaylist:", error);
    throw error;
  }
}

server.listen(5000, () => {
  console.log("Server running on port 5000")
})

app.get('/callback', (req, res) => {
  res.send("Authorization successful. You can close this window.");
});
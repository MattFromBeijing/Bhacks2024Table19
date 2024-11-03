import { useEffect, useState, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import io from 'socket.io-client'
import AudioPlayer from "../../Audio/AudioPlayer"; // Adjust the path if necessary

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import "./CoffeeShop.css";

function CoffeeShop() {

  const socket = io.connect('http://localhost:5000')
  const [myId, setMyId] = useState("")

///// instant messaging //////

  const [message, setMessage] = useState("");
  const [messagesReceived, setMessagesReceived] = useState([]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.trim()) {
      let userId = socket.id
      setMyId(userId)
      socket.emit("send_message", { [userId] : message } );
      setMessage("");
    }
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      let currMessages = [...messagesReceived, data]
      // console.log(currMessages) 
      setMessagesReceived(currMessages);
    })
  }, [socket])

  const MessageItem = ({userId, mes, key}) => {
    console.log(myId)
    return (
      ( userId === myId 
        ?
          <div className="message-wrapper">
            <p className="user-right">{userId}</p>
            <p className="message-right">{mes}</p>
          </div>
        :
          <div className="message-wrapper">
            <p className="user-left">{userId}</p>
            <p className="message-left">{mes}</p>
          </div>
      )

    )
  }

///// spotify /////

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [playListId, setPlayListId] = useState("");
  const [inputValue, setInputValue] = useState('');
  const [totalSongs, setTotalSongs] = useState(1);

  const [show, setShow] = useState(false);  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function extractSpotifyUri(link) {
    const match = link.match(/\/track\/([^?]+)/);
    return match ? `spotify:track:${match[1]}` : null;
  }

  const createPlaylist = (url) => {
    let URI = extractSpotifyUri(url)
    socket.emit("create_playlist", { uri : URI})
    setTotalSongs(1)
  }

  const addSong = async (url) => {
    let URI = extractSpotifyUri(url)
    socket.emit("add_song", { playId: playListId , uri : URI})

    await delay(2000);
    console.log("WAIT")

    setTotalSongs(totalSongs + 1)
  }

  useEffect(() => {
    socket.on("start_playlist", (data) => {

      console.log(data)
      console.log(data.id)

      // let playId = data.id
      setPlayListId(data.id)
    })
  }, [socket])

///// display /////

  return (
    <div className='background-wrapper'>

      <div className="chatbox">
        <div className="receive-section">
          {
            messagesReceived.map((element, index) => {

              let userId = String(Object.keys(element)[0]);
              let message = String(element[userId]);

              return <MessageItem userId={userId} mes={message} key={index}/>

            })
          }
        </div>
        <div className="send-section">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            style={{ display: "contents" }}
          >
            <textarea 
              type="text" 
              name="send" 
              placeholder="Send a message!" 
              value={message} 
              onChange={handleInputChange}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ backgroundColor: '#b47b5a', color: '#fff' }}>
          <Modal.Title>Start Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#53382c', color: '#fff' }}>
          {
            (
              (playListId !== '') 
              ?
                <>
                  <iframe
                    key={totalSongs}
                    title="Spotify Embed: Recommendation Playlist"
                    src={`https://open.spotify.com/embed/playlist/${playListId}?utm_source=generator&theme=0`}
                    width="100%"
                    height="100%"
                    style={{ minHeight: '360px' }}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  /> 
                  <form>
                    <input 
                      type="text"
                      name="song_url"
                      placeholder="Enter song url"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      style={{ width: '100%'}}
                      required
                    > 
                    </input>
                  </form>
                </>
              : 
              <form>
                <input 
                  type="text"
                  name="song_url"
                  placeholder="Enter song url"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  style={{ width: '100%'}}
                  required
                > 
                </input>
              </form>
            )
          }
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#b47b5a', color: '#fff' }}>
          <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: '#ddc9a0', color: '#fff' }}>
            Close
          </Button>

        {
          (
            (playListId !== '')
            ?
              <Button variant="secondary" 
                onClick={() => {
                  addSong(inputValue)
                  setInputValue("")
                }} 
                style={{ backgroundColor: '#ddc9a0', color: '#fff' }}
              >
                Add Songs
              </Button>
            :
              <Button variant="secondary" 
                onClick={() => {
                  createPlaylist(inputValue)
                  setInputValue("")
                }} 
                style={{ backgroundColor: '#ddc9a0', color: '#fff' }}
              >
                Create Playlist
              </Button>
          )
        }

        </Modal.Footer>
      </Modal>

      <img className='coffeehouse' src='coffeehouse.png' alt='coffeehouse'/>
      <img className='jukebox' src='jukebox.png' alt='juke' onClick={handleShow}/>
      <img className='coffee' src ='coffee.png' alt='coffee'/>
      <img className='bread' src ='bread.png' alt='bread'/>
    </div>
  )

}

export default CoffeeShop;

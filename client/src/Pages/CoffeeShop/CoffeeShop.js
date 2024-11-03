import { useEffect, useState, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import io from 'socket.io-client'

import './CoffeeShop.css'

function CoffeeShop() {
  const [message, setMessage] = useState("");
  const [messagesReceived, setMessagesReceived] = useState([]);
  const socket = io.connect('http://localhost:5000')
  const [myId, setMyId] = useState("")

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
      console.log(currMessages)
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

      <img className='coffeehouse' src='coffeehouse.png' alt='coffeehouse'/>
      <img className='jukebox' src='jukebox.png' alt='juke'/>
      <img className='coffee' src ='coffee.png' alt='coffee'/>
      <img className='bread' src ='bread.png' alt='bread'/>
    </div>
  )
}

export default CoffeeShop;

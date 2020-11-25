import React from "react";
import { withRouter } from 'react-router-dom';

const ChatroomPage = ({ match, socket }) => {
  const chatroomId = match.params.id;
  const [messages, setMessages] = React.useState([]);
  const messageRef = React.useRef();
  const [userId, setUserId] = React.useState("");
  // const [active, setActive] = React.useState("")
  // const [status, setStatus] = React.useState("")

  const sendMessage = () => {
    if (socket) {
      socket.emit("chatroomMessage", {
        chatroomId,
        message: messageRef.current.value,
      });

      messageRef.current.value = "";
    }
  };


  React.useEffect(() => {  
      const token = localStorage.getItem("Token");
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);

    if (socket) {
      socket.on("newMessage", (message) => {
        console.log(message);
        const newMessages = [...messages, message];
        setMessages(newMessages);
      });
    }
    //eslint-disable-next-line
  }, [messages]);

    // React.useEffect(()=>{
    //   if(active == "on"){
    //     setStatus(name + "join the chatroom")
    //   }else{
    //     setStatus(name + "left the chatroom")
    //   }
    // }, [active])

  React.useEffect(() => {
    
    if (socket) {
      socket.emit("joinRoom", {
        chatroomId
      });
      // setActive("on")
    }

    return () => {
      //Component Unmount
      if (socket) {
        socket.emit("leaveRoom", {
          chatroomId,
          userId
        });
        // setActive("off")
      }
    };
    //eslint-disable-next-line
  }, []);


  return (
    <div className="chatroomPage">
      <div className="chatroomSection">
        <div className="cardHeader">Chatroom Name</div>
        <div className="chatroomContent">
          {messages.map((message, i) => (
            <div key={i} className="message">
              <span
                className={
                  userId === message.userId ? "ownMessage" : "otherMessage"
                }
              >
                {message.name}:
              </span>{" "}
              {message.message}
            </div>
          ))}
          
            {/* {(active === "on"?
            <div>{status}</div>:<div>{status}</div>
            )} */}
          
        </div>
        <div className="chatroomActions">
          <div>
            <input
              type="text"
              name="message"
              placeholder="Say something!"
              ref={messageRef}
            />
          </div>
          <div>
            <button className="join" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default withRouter(ChatroomPage);

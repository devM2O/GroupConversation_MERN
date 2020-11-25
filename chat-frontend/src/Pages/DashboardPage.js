import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DontGet from './DontGet';

export default function DashboardPage(props) {
  const [chatrooms, setChatrooms] = React.useState([]);
  const getChatrooms = () => {
    axios
      .get("/chatroom", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
      .then((res) => setChatrooms(res.data))
      .catch((err) => setTimeout(getChatrooms, 3000));
  };

  React.useEffect(() => {
    getChatrooms();
    // eslint-disable-next-line
  }, []);

  DontGet() //This is not to get Dashboard for not being logined user

  return (
    <div className="card">
      <div className="cardHeader">Chatrooms</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="chatroomName">Chatroom Name</label>
          <input
            type="text"
            name="chatroomName"
            id="chatroomName"
            placeholder="eg: Covid 19 Defence Center Myanmar"
          />
        </div>
      </div>
      <button className="button">Create Chatroom</button>

      <div className="chatrooms">
        {chatrooms.map((chatroom) => (
          <div key={chatroom._id} className="chatroom">
            <div className="chatroomName">{chatroom.name}</div>
            <Link to={"/chatroom/" + chatroom._id}>
              <div className="join" style={{textDecoration: "none"}}>Join</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

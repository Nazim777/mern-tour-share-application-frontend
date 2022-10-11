import React,{useState,useEffect, useRef} from 'react'
import { userChats } from '../Redux/Api/Api'
import { useSelector,useDispatch } from 'react-redux'
import Conversation from '../component/Conversation'
import "./Chat.css";
import ChatBox from '../component/ChatBox';
import { io } from "socket.io-client";
const Chat = () => {
    const socket = useRef();
    const {user} = useSelector((state)=>state.user)
    const [chats,setChats] = useState([])
    const [currentChat,setCurrentChat] = useState(null)
    const [sendMessage,setSendMessage] = useState(null)
    const [receivedMessage,setReceivedMessage] = useState(null)
    const [onlineUsers,setOnlineUsers] = useState([])

   useEffect(()=>{
    const getUserChats = async()=>{
        const {data} = await userChats(user?.data?._id)
        setChats([...data])

    }
getUserChats()
   },[user?.data?._id])

   // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user?.data?._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data)
      setReceivedMessage(data);
    }

    );
  }, []);


// console.log(receivedMessage)
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };




  return (
   <div className='Chat'>
    {/* Left Side */}
    <div className="Left-side-chat">
        {/* <LogoSearch /> */}
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
                
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation
                  data={chat}
                  currentUser={user?.data?._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          {/* <NavIcons /> */}
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user?.data?._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>

   </div>
  )
}



export default Chat

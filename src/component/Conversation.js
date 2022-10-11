import React,{useState,useEffect} from 'react'
import { singleUser } from '../Redux/Api/Api'

const Conversation = ({data,currentUser,online}) => {
    const [userData,setUserData] = useState(null)
    useEffect(()=>{
    const userId = data.members.find((id)=>id !== currentUser)
   const userData = async()=>{
    try {
        const {data} = await singleUser(userId)
        setUserData(data)
    } catch (error) {
        console.log(error)
    }
   }
  userData()
    },[currentUser])

  return (
    <div>
        <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXhX9jQMQS8afRYkxWcaV1UYcuVjwwLLhgDe5bpoBj&s'}
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{fontSize: '0.8rem'}}>
            <span>{userData?.name}</span> <br />
            <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>


      
    </div>
  )
}

export default Conversation

import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link,useNavigate} from 'react-router-dom'
import { UserTours,tourDelete } from '../Redux/Features/TourSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// metarial icons and componests
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Dashboard = () => {
  const dispatach = useDispatch()
  const {tours,loading,userTours} = useSelector((state)=>state.tour)
  const {user} = useSelector((state)=>state.user)
  const navigate = useNavigate()
  useEffect(()=>{
    if(user){
      dispatach(UserTours(user?.data?._id))

    }
  },[user?.data?._id])
  if(loading){
    return <h1>Loading...</h1>
  }
  const excerpt = (str) => {
    if (str?.length > 45) {
      str = str.substring(0, 45) + " ...";
    }
    return str;
  };
  const handleDelete=(id)=>{
    dispatach(tourDelete({toast,id}))

  }
  
  return (
    <div style={{marginTop:'100px'}} >
        {
          userTours&& userTours.map((item)=><li key={item._id}>
            <div>
              <img src={item?.image?.url} alt="" style={{width:'100%',height:'auto',maxWidth:'500px'}} />
            </div>
            <h4> {item?.title}</h4>
            <p>desc: {excerpt(item?.description)}</p>
            <Link to={`/singletour/${item._id}`}>read more</Link>
            <div>

              {/* <button onClick={()=>navigate(`/edittour/${item?._id}`)}>edit</button> */}
              <EditIcon onClick={()=>navigate(`/edittour/${item?._id}`)} sx={{cursor:'pointer',color:'orange'}} />
            {/* <button onClick={()=>handleDelete(item?._id)}>delete</button> */}
            <DeleteIcon sx={{cursor:'pointer',color:'green'}} onClick={()=>handleDelete(item?._id)}/>
            </div>
          </li>)
        }
        
      
    </div>
  )
}

export default Dashboard 

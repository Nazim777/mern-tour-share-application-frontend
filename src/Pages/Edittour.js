import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { AddTour } from '../Redux/Features/TourSlice'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { tourEdit } from '../Redux/Features/TourSlice';
import { useParams } from 'react-router-dom';

const Edittour = () => {
  const navigate = useNavigate()
  const {user} = useSelector((state)=>state.user)
  const {loading,userTours} = useSelector((state)=>state.tour)
  const dispatch = useDispatch()
  const [postImage,setPostImage] = useState('')
  const [users,setUsers] =useState({
    title:'',
    description:''
  })
const {id} = useParams()
useEffect(()=>{
  const singleTours = userTours.find((item)=>item._id==id)
  setUsers({
    title:singleTours?.title,
    description:singleTours?.description
  })

},[id])

    const handleChange=(e)=>{
        setUsers((prestate)=>({
            ...prestate,
            [e.target.name]:e.target.value
        }))
    }

    const handleClick=async(e)=>{
        e.preventDefault()
       const formData = {
        ...users,
        creator:user?.data?._id,
        name:user?.data?.name
      }
      dispatch(tourEdit({toast,navigate,formData,id}))
   
    }
if(loading){
  return <h1>Loading...</h1>
}

  return (
    <div style={{marginTop:'100px'}} >
      <form action="">
         <input type="text" name='title' value={users.title} placeholder='enter title' onChange={handleChange}/> <br />
         <textarea type="text" name='description' value={users.description} placeholder='enter desc....' onChange={handleChange} /><br />
         <button type='submit'  onClick={handleClick}>Submit</button>

    </form>

    
  
</div>
  )
}

export default Edittour

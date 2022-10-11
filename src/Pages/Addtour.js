import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { AddTour } from '../Redux/Features/TourSlice'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';



const Addtour = () => {
  const navigate = useNavigate()
  const {user} = useSelector((state)=>state.user)
  const {loading} = useSelector((state)=>state.tour)
  const dispatch = useDispatch()
  const [postImage,setPostImage] = useState('')
    const [status,setStatus] = useState(false)
  const [users,setUsers] =useState({
    title:'',
    description:''
  })
    
    const handleChange=(e)=>{
        setUsers((prestate)=>({
            ...prestate,
            [e.target.name]:e.target.value
        }))
    }

    const handleImage = (e)=>{
     const file = e.target.files[0]
     TransformFileData(file);

    }


    const TransformFileData = (file) => {
        const reader = new FileReader();
    
        if (file) {
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setPostImage(reader.result);
          };
        } else {
          setPostImage("");
        }
      };




      
    const handleClick=async(e)=>{
        e.preventDefault()
       const formData = {
        ...users,
        creator:user?.data?._id,
        name:user?.data?.name,
        image:postImage
      }
        if(users.title&&users.description&&postImage){
          dispatch(AddTour({toast,navigate,formData}))
        }
   
    }
if(loading){
  return <h1>Loading...</h1>
}
  return (
    <div style={{merginTop:'100px'}}>
               
      <form action="">
         <input type="text" name='title' value={users.title} placeholder='enter title' onChange={handleChange}/> <br />
         <textarea type="text" name='description' value={users.description} placeholder='enter desc....' onChange={handleChange} /><br />
         <input type="file" accept='image/' name='image' value={users.password} onChange={handleImage} /> <br />
         <button type='submit'  onClick={handleClick}>Submit</button>

    </form>




    </div>
  )
}

export default Addtour

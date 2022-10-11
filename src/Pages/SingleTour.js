import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { singleTour,tourComment } from '../Redux/Features/TourSlice'
import moment from 'moment'
import axios from 'axios'

// metarial icons and components 
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';


const SingleTour = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  useEffect(()=>{
  dispatch(singleTour(id))
  },[id])

  const {tour} = useSelector((state)=>state.tour)
  

  const init = {
    comment:''
  }
  const [comments,setComments] = useState(init)
  const handleChange=(e)=>{
    setComments({
      ...comments,
      [e.target.name]:e.target.value
    })
    
  }
  const handleComment = (id) =>{
   
     dispatch(tourComment({id,comments}))
     setComments(init)
    
  }
  return (
    <div style={{marginTop:'100px'}} className='container' >
    {
      tour&&
       <>
       <div>
        <img src={tour?.image?.url} alt="" style={{width:'100%',height:'500px'}} />
       </div>
       <h2>{tour?.title}</h2>
       <span>creator <PersonIcon/> : {tour.name}</span> <br />
       <span style={{color:'orange',fontWeight:'600'}}> <CalendarMonthIcon/> {moment(tour.createdAt).fromNow()}</span>
       <p>desc : {tour.description}</p>
      </>
    }
    <div >
      <form style={{display:'flex',justifyContent:'center',marginBottom:'20px'}} onSubmit={(e)=>e.preventDefault()}>
      <textarea  placeholder='comment here....' cols="20" rows="1" name='comment' value={comments.comment} onChange={handleChange}/> 
      <button className='btn btn-primary ms-2' onClick={()=>handleComment(id)}>comment</button>
      </form>
    </div>
    <div>
      {tour?.comments?.map((item)=><div style={{display:'flex',justifyContent:'center'}}>
      <span className='text-success fw-bold me-2'>{item.name}</span>
      <p className='text-muted'>{item.comment}</p>
      </div>)}
    </div>
  
</div>
  )
}

export default SingleTour

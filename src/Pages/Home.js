import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link,useNavigate} from 'react-router-dom'
import { getAllTour } from '../Redux/Features/TourSlice'
import { setCurrentpage } from '../Redux/Features/TourSlice'
import { tourLike } from '../Redux/Features/TourSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// metaril ui icon and component
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import styled from '@emotion/styled'



const Home = () => {
  const dispatach = useDispatch()
  const {tours,loading,currentPage,numberOfPages,error} = useSelector((state)=>state.tour)
  const {user} = useSelector((state)=>state.user)
  const userId = user?.data?._id
  const navigate = useNavigate()
  useEffect(()=>{
    dispatach(getAllTour(currentPage))


  },[currentPage])
  
  useEffect(()=>{
    if(error){
      toast.error(error)
    }

  },[error])

  if(loading){
    return <h1>Loading...</h1>
  }

  
  const excerpt = (str) => {
    if (str?.length > 45) {
      str = str.substring(0, 45) + " ...";
    }
    return str;
  };
  const nextPage = ()=>{
    dispatach(setCurrentpage(currentPage+1))

  }
  const previousPage = ()=>{
    dispatach(setCurrentpage(currentPage-1))
  }
  const handleLike = (id)=>{
    if(id){
       dispatach(tourLike(id))

    }
   
  }



  
  return (
    <Stack direction="column"
    justifyContent="center"
    alignItems="center"
    spacing={2}>
    <Card  sx={{ maxWidth: 600 }}>
        {
          tours&& tours.map((item)=><li key={item._id}>
            <CardMedia 
             component="img"
             height={{xs:'auto',sm:'auto',md:'500'}}
             image={item?.image?.url}
             alt="green iguana"
            />
           
              {/* <img src={item?.image?.url} alt="" style={{width:'100%',height:'auto',maxWidth:'500px'}} /> */}
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {item?.title}
             </Typography>
             <Typography variant="body2" color="text.secondary">
             <p>desc: {excerpt(item?.description)}</p>
            </Typography>
            
            </CardContent>
            {/* <Link to={`/singletour/${item._id}`}>read more</Link> */}
            <CardActions>
            <Button size="small" onClick={()=>handleLike(item?._id)}>{!item?.likes?.includes(userId)?<ThumbUpIcon/>:<ThumbDownAltIcon/>}</Button>
            <Stack>
            {item?.likes?.length} likes

            </Stack>
            <Button size="small" onClick={()=>navigate(`/singletour/${item._id}`)}>Learn More</Button>
           </CardActions>
            {/* <div>
            <button className='btn btn-primary' onClick={()=>handleLike(item?._id)}> {!item?.likes?.includes(userId)?<ThumbUpIcon/>:<ThumbDownAltIcon/>}</button>
            {item?.likes?.length}
            </div> */}
          </li>)
        }
      <Stack spacing={2} direction="row"  justifyContent="center"
      alignItems="center">
        <Button className='btn btn-secondary' variant='contained' color="secondary" onClick={previousPage} disabled={currentPage==1}>prev</Button>
      <Button className='btn btn-primary' variant='contained' color="success" onClick={nextPage} disabled={currentPage == numberOfPages}>next</Button>
      </Stack>
    </Card>
    </Stack>
  )
}

export default Home

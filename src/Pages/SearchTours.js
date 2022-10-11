import React,{useEffect} from 'react'
import { useParams,Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { TourSearch } from '../Redux/Features/TourSlice'

const SearchTours = () => {
    const dispatch = useDispatch()
    const {search} = useParams()
    const {searchTours,loading} = useSelector((state)=>state.tour)
    console.log(searchTours)
    useEffect(()=>{
        if(search){
            dispatch(TourSearch(search))
        }

    },[search])


    if(loading){
        return <h1>Loading...</h1>
      }
      const excerpt = (str) => {
        if (str?.length > 45) {
          str = str.substring(0, 45) + " ...";
        }
        return str;
      };

      if(searchTours.length===0){
        return <h1>no tours available</h1>
      }
  return (
    <div style={{marginTop:'100px'}}>
        {
          searchTours&& searchTours.map((item)=><li key={item._id}>
            <div>
              <img src={item?.image?.url} alt="" style={{width:'100%',height:'auto',maxWidth:'500px'}} />
            </div>
            <h4> {item?.title}</h4>
            <p>desc: {excerpt(item?.description)}</p>
            <Link to={`/singletour/${item._id}`}>read more</Link>
          </li>) 
        }
      
    </div>
  )
}

export default SearchTours

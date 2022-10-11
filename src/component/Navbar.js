import React,{useState} from 'react'
import './Navbar.css'
import {Link,useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { setLogout } from '../Redux/Features/UserSlice'
import {useDispatch} from 'react-redux'
import jwtDecode from 'jwt-decode'

const Navbar = () => {
  const [search,setSearch] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const{ user} = useSelector((state)=>state.user)
  // console.log(user?.data?._id)


  
  if (user?.token) {
    const decodedToken = jwtDecode(user?.token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }


  const handleLogOUt = ()=>{
    dispatch(setLogout())

  }

  const handleSearch = (e)=>{
    e.preventDefault()
    navigate(`/searchtour/${search}`)
    setSearch('')
  }

  return (
    <div className='header 'style={{marginBottom:'150px'}}>
        <nav className="navbar navbar-expand-lg bg-white fixed-top">
  <div className="container">
    <a className="navbar-brand" href="#">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZmr2SLLIB4s9iPtS7Dc9obLPEgWCLawawDQ-RlsRR1_9WF-c4nUYN1dH549CslzPcrEw&usqp=CAU" alt="" className='img-fluid'style={{width:'100px'}} />
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
   
      <ul className="navbar-nav ms-auto">
        {
          user?.data?._id&&
           <>
            <li className="nav-item">
            <Link className="nav-link text-primary" to='/' >logged in as {user?.data?.name}</Link>
          </li>
          </>
        }
        <li className="nav-item">
          <Link className="nav-link" to='/' >Home</Link>
        </li>
        
        {
          user?.data?._id&& 
          <>
           <li className="nav-item">
           <Link className="nav-link" to='/dashboard' >Dashboard</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" to='/addtour' >Addtour</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" to='/chat' >Chat</Link>
          </li>
          </>

        }

        <li className="nav-item">
          {user?.data?._id?(

           <Link className="nav-link" to='/login' onClick={handleLogOUt} >Logout</Link> 

          ):(<Link className="nav-link" to='/login' >Login</Link>)}
          
        </li>
        
      </ul>
      <form className="d-flex"  role="search">
        <input className="form-control me-2" value={search}  onChange={(e)=>setSearch(e.target.value)} type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit" onClick={handleSearch}>Search</button>
      </form>
      

    </div>
  </div>
</nav>
        
      
    </div>
  )
}

export default Navbar
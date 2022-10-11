import React,{useState,useEffect} from 'react'
import './Login.css'
import { Link,useNavigate }from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch,useSelector} from 'react-redux'
import { login } from '../Redux/Features/UserSlice';



const Login = () => {
  const {error} = useSelector((state)=>state.user)
  useEffect(()=>{
    error&& toast.error(error)
  },[error])
  const dispatch =useDispatch()
  const [input ,setInuput] = useState({
    email:'',
    password:''
  })
  const handleChange=(e)=>{
 setInuput((prevstate)=>({
  ...prevstate,
  [e.target.name]:e.target.value
 }))
  }
  const navigate = useNavigate()
  const handleClick =(e)=>{
    
    e.preventDefault()
    if(input.email&&input.password){
      dispatch(login({navigate,toast,input}))
      
    }else{
    // alert('all field are required')
    toast('all fields are required!')
  

    }

  }
  return (
    <div className='wrapper'>
        <div className="container">
            <div className='col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 text-center'>
            <form className='rounded shadow mt-2 bg-white'>
               <h3 className='fw-bolder fs-4 mb-2 text-dark'>Login</h3>
               <div className='fw-normal mb-4 text-muted'>
                New Here?  <Link to='/register' className='fw-bold text-primary text-decoration-none '> Create an account</Link>
                

               </div>

               <div className="form-floating mb-3">
                 <input type="email" className="form-control" id="floatingInput"  name='email' value={input.email} onChange={handleChange} placeholder="name@example.com"/>
                 <label for="floatingInput" >Email address</label>
              </div>
                <div className="form-floating">
                 <input type="password" className="form-control" id="floatingPassword" placeholder="Password"  name='password' value={input.password}  onChange={handleChange} />
                 <label for="floatingPassword" >Password</label>
                </div>
                <div className='mt-2 text-end'>
                </div>
                <button type='submit'className='btn btn-primary w-100 my-4' onClick={handleClick}>Continue</button>
                 <ToastContainer />
                
            </form>



            </div>
        </div>
    </div>
  )
}

export default Login




//  state.loading = false;
// const {arg:id} = action.meta
// // console.log(arg)
// // console.log(id)
// console.log(action.payload)

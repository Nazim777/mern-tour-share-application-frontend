import './App.css';
import React,{useEffect} from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Pages/Home';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './Pages/Login';
import Register from './Pages/Register';
import Navbar from './component/Navbar';
import {setUser} from './Redux/Features/UserSlice'
import {useDispatch} from 'react-redux'
import Addtour from './Pages/Addtour';
import Dashboard from './Pages/Dashboard';
import Edittour from './Pages/Edittour';
import SingleTour from './Pages/SingleTour';
import PrivateRoute from './component/PrivateRoute';
import NotFonudPage from './Pages/NotFonudPage';
import SearchTours from './Pages/SearchTours';
import Chat from './Pages/Chat';
function App() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  useEffect(()=>{
    dispatch(setUser(user))

  },[])
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='/singletour/:id' element={<SingleTour/>}/>
        <Route path='searchtour/:search' element={<SearchTours/>}/>
        <Route path='/dashboard' element={
          <PrivateRoute user= {user}>
            <Dashboard/>
          </PrivateRoute>
        }/>
         <Route path='/addtour' element={
          <PrivateRoute user= {user}>
            <Addtour/>
          </PrivateRoute>
        }/>
         <Route path='/edittour/:id' element={
          <PrivateRoute user= {user}>
            <Edittour/>
          </PrivateRoute>
        }/>
         <Route path='/chat' element={
          <PrivateRoute user= {user}>
            <Chat/>
          </PrivateRoute>
        }/>
        <Route path='*' element={<NotFonudPage/>}/>
        
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;

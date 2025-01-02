import React,{ useState,useEffect } from 'react';
import { useDispatch} from 'react-redux'
import './App.css'
import authService from "../src/appwrite/auth.js";
import {login,logout} from "./store/authSlice.js";
import { Outlet } from 'react-router-dom';
import { Header,Footer } from './components/index.js';
function App() {

  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(()=>{
      setLoading(false)
    })
  },[])
  
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : (
    <div className='min-h-sc'>
      <h1 className='content-center'>Loading...</h1>
    </div>
  )
}

export default App

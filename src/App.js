import {useState} from 'react'
import './App.css';
import Cookies from 'universal-cookie';
import axios from 'axios'
import { COOKIE_OPTIONS } from './constant/index';
const cookies = new Cookies()


function App() {
  const [log, setLog] = useState('')
  const handleLogIn = async (req, res, next) => {
    const username = 'sonidabezt5'
    const password = 'sonidabezt'
    const deviceId = '1'


    return await axios.post("http://localhost:3001/user/login", {username, password, deviceId})
    .then((response) => {
      console.log(response)
      if(response.status === 200) {
        setLog(`Hello ${username}`)
      }
      
      cookies.set('access_token', response?.data?.accessToken, COOKIE_OPTIONS)
      cookies.set('refresh_token', response?.data?.refreshToken, COOKIE_OPTIONS)
      
    })
    
  }
  const handleLogout = async (req, res, next) => {
    const refreshToken = cookies.get('refresh_token')
    await axios.post("http://localhost:3001/user/logout", {refreshToken})
    .then((response) => {
      if(response.data.status === 200) {
        setLog('You are logged out')
        cookies.remove('access_token')
        cookies.remove('refresh_token')
      }
    })
    
  }

  const handleList = async (req, res, next) => {
    return await axios.get("http://localhost:3001/user/list", {
      headers: {
        Authorization : 'Bearer ' + cookies.get('access_token')
      }
    }).then((response) => {
      console.log(response)
      if(response.status === 200) {
        const username1 = response.data[0].username
        const username2 = response.data[1].username
        setLog(`${username1} and ${username2}`)
      }
    }).catch(err => {
      console.log(err)
    })
  }
  const handleRefresh = async ( req, res, next ) => {
    const refreshToken = cookies.get("refresh_token")
    const deviceId = "1"
    return await axios.post("http://localhost:3001/user/refresh", {
      refreshToken, deviceId
    }).then(response => {
      console.log(response)
      cookies.set("access_token", response.data.accessToken, COOKIE_OPTIONS)
      cookies.set("refresh_token", response.data.refreshToken, COOKIE_OPTIONS)
    }).catch(err => {
      console.log(err)
    }) 
  }


  return (
    <div>
      <button onClick={handleLogIn}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleRefresh}>Refresh</button>
      <button onClick={handleList}>List</button>
      <div>{log}</div>
    </div>
  );
}

export default App;

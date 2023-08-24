import {useState} from 'react'
import './App.css';
import axios from 'axios'
import Cookies from 'universal-cookie'
const cookies = new Cookies()


function App() {
  const [log, setLog] = useState('')

  const handleLogIn = async (req, res, next) => {
    const username = 'sonidabezt5'
    const password = 'sonidabezt'
    const deviceId = '13'

    return await axios.post("http://localhost:3001/user/login", {username, password, deviceId}, {
      withCredentials: true
    })
    .then((response) => {
      console.log(response)
      if(response.status === 200) {
        setLog(`Hello ${username}`)
      } 
    }) 
  }

  const handleLogout = async (req, res, next) => {
    await axios.post("http://localhost:3001/user/logout",{},  {
      withCredentials:true
    })
    .then((response) => {
      if(response.data.status === 200) {
        setLog('You are logged out')
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleList = async (req, res, next) => {
    return await axios.get("http://localhost:3001/user/list", {
      withCredentials: true
    })
    .then((response) => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
  }
  const handleRefresh = async ( req, res, next ) => {
    const deviceId = "41"
    return await axios.get("http://localhost:3001/user/refresh", {
      withCredentials: true
    }, {
     deviceId
    }).then(response => {
      console.log(response)
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

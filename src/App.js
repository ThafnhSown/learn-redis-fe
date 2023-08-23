import './App.css';
import Cookies from 'universal-cookie';
import axios from 'axios'
const cookies = new Cookies()

function App() {
  const handleLogIn = async (req, res, next) => {
    const username = 'sonidabezt5'
    const password = 'sonidabezt'
    const deviceId = '1'


    return await axios.post("http://localhost:3001/user/login", {username, password, deviceId})
    .then((response) => {
      console.log(response)
      
      cookies.set('access_token', response?.data?.accessToken)
      cookies.set('refresh_token', response?.data?.refreshToken)
      
    })
    
  }
  const handleLogout = async (req, res, next) => {
    const refreshToken = cookies.get('refresh_token')
    await axios.post("http://localhost:3001/user/logout", {refreshToken})
    .then((response) => {
      if(response.data.status === 200) {
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
      cookies.set("access_token", response.data.accessToken)
      cookies.set("refresh_token", response.data.refreshToken)
    })
  }


  return (
    <div>
      <button onClick={handleLogIn}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleRefresh}>Refresh</button>
      <button onClick={handleList}>List</button>
    </div>
  );
}

export default App;

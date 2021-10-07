import axios from 'axios'

const setAuthToken = (token) => {
  if (token) {
    console.log(`SET headers[Authorization] = Bearer ${token}`)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    console.log(`DELETE headers[Authorization]`)
    delete axios.defaults.headers.common['Authorization']
  }
}

export default setAuthToken
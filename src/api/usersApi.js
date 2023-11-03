import axios from "axios"

const usersBack = axios.create({
  // baseURL: 'http://localhost:4000'
  baseURL: 'https://users-restapi-w3antys34q-uc.a.run.app'
})

export default usersBack
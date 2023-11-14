import axios from "axios"

const usersBack = axios.create({
  // baseURL: 'http://localhost:4000'
  baseURL: 'https://apimanagementprincipal.azure-api.net/user'
})

export default usersBack
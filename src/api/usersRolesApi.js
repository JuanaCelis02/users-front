import axios from "axios"

const usersRolesBack = axios.create({
  // baseURL: 'http://localhost:4000'
  baseURL: 'https://apimanagementprincipal.azure-api.net/userRole'
})

export default usersRolesBack
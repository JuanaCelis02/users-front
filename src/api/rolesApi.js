import axios from "axios"

const rolesBack = axios.create({
  // baseURL: 'http://localhost:4000'
  baseURL: 'https://apimanagementprincipal.azure-api.net/rol'
})

export default rolesBack
import axios from "axios"

const rolesBack = axios.create({
  // baseURL: 'http://localhost:4000'
  baseURL: 'https://roles-restapi-w3antys34q-uc.a.run.app'
})

export default rolesBack
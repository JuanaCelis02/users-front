import axios from "axios"

const usersRolesBack = axios.create({
  //baseURL: 'http://localhost:4000'
  baseURL: 'https://usersroles-restapi-w3antys34q-uc.a.run.app'
})

export default usersRolesBack
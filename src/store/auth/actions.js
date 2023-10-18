import usersBack from "@/api/usersApi"

export const loginAction = async ({commit}, credentiales) => {
  try {
    const data = await usersBack.post('/login', credentiales, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const {token, userId} = data.data
    if(!data) {
      commit('loginMutation', {}, '')
      return false
    }
    commit('loginMutation', {token, userId})
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userId', userId);
    return true
  } catch (error) {
    console.error(error)
  }
}

export const getSingleUserAction = async ({commit}, idUser) => {
  try {
    const data = await usersBack.get(`/users/${idUser}`, {
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    })
    commit('getSingleUserMutation', data.data)
    return data.data
  } catch (error) {
    console.error(error)
  }
}
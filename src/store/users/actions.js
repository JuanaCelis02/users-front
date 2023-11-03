import usersBack from "@/api/usersApi"
import rolesBack from "@/api/rolesApi"
import usersRolesBack from "@/api/usersRolesApi"

export const getAllUsers = async ({commit}, page) => {
  const { data } = await usersRolesBack.get(`/usersRoles?page=${page || 1}`,{
    headers: {
      'Authorization': sessionStorage.getItem('token')
    }
  })
  if (!data) {
    commit('getAllUsers', [])
    return
  }
  const {usersWithRoles, total} = data
  commit('getAllUsers', {usersWithRoles, total})
}

export const getAllRoles = async ({commit}) => {
  const { data } = await rolesBack.get('/roles', {
    headers: {
      'Authorization': sessionStorage.getItem('token')
    }
  })
  if (!data) {
    commit('getAllRoles', [])
    return
  }
  commit('getAllRoles', data)
}

export const createRoleAction = async ({commit}, data) => {
  const res = await rolesBack.post('/roles', data, {
    headers: {
      'Authorization': sessionStorage.getItem('token')
    }
  })
  commit('createRole', res)
  return res
}

export const createUserRole = async ({commit}, data) => {
  const {user, role} = data 
  const resp = await usersBack.post('/users', user, {
    headers: {
      'Authorization': sessionStorage.getItem('token')
    }
  })
  const payload = {
    userId: resp.data.id,
    roleId: role
  }
  const {userRole} = await usersRolesBack.post('/userRoles', payload, {
    headers: {
      'Authorization': sessionStorage.getItem('token')
    }
  })
  commit('createUserRole', {userRole, role})
  return userRole
}

export const updatedUserRole = async ({commit}, userRole) => {
  const {userId, role} = userRole 
  const {data} = await usersRolesBack.put('/userRoles', {userId, roleIds: role}, {
    headers: {
      'Authorization': sessionStorage.getItem('token')
    }
  })
  const {user} = data
  commit('updatedUserRole', {user, role})
  return userId
}

export const updatedUser = async ({commit}, data) => {
  const {idUser, user} = data
  try {
    const data = await usersBack.put(`/users/${idUser}`, user, {
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    })
    commit('updatedUser', data.data)
  } catch (error) {
    console.error(error)
  }
}

export const getSingleUserEdit = async ({commit}, idUser) => {
  try {
    const data = await usersRolesBack.get(`/usersRoles/${idUser}`, {
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    })
    commit('getSingleUser', data.data)
    console.log('Data actions', data);
    return data.data
  } catch (error) {
    console.error(error)
  }
}

export const deleteUser = async ({commit}, idUser) => {
  try {
    const data = await usersBack.delete(`/users/${idUser}`, {
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    })
    if(data) {
      commit('deleteUser', idUser)
    }
  } catch (error) {
    console.error(error)
  }
}
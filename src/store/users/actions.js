import usersBack from "@/api/usersApi"
import rolesBack from "@/api/rolesApi"
import usersRolesBack from "@/api/usersRolesApi"

axios.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export const getAllUsers = async ({ commit }, page) => {
  try {
    const { data } = await axios.get(`/usersRoles?page=${page || 1}`);
    const { usersWithRoles, total } = data || {};
    commit('getAllUsers', { usersWithRoles, total });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    commit('getAllUsers', { usersWithRoles: [], total: 0 });
  }
};

export const getAllRoles = async ({ commit }) => {
  try {
    const { data } = await axios.get('/roles');
    commit('getAllRoles', data || []);
  } catch (error) {
    console.error('Error al obtener roles:', error);
    commit('getAllRoles', []);
  }
};

export const createRoleAction = async ({ commit }, data) => {
  try {
    const { data: res } = await axios.post('/roles', data);
    commit('createRole', res);
    return res;
  } catch (error) {
    console.error('Error al crear el rol:', error);
    throw error;
  }
};

export const createUserRole = async ({ commit }, data) => {
  const { user, role } = data
  const resp = await usersBack.post('/users', user, {
    headers: {
      'Authorization': sessionStorage.getItem('token')
    }
  })
  const payload = {
    userId: resp.data.id,
    roleId: role
  }
  const { userRole } = await usersRolesBack.post('/userRoles', payload, {
    headers: {
      'Authorization': sessionStorage.getItem('token')
    }
  })
  commit('createUserRole', { userRole, role })
  return userRole
}
//Automatización correo electronico..
export const enviarCorreosSuperadminsAction = async (horaEnvioCorreo) => {
  try {
    const { data } = await axios.post('/enviar-correos-superadmins', { horaEnvioCorreo });
    return data;
  } catch (error) {
    console.error('Error al enviar correos:', error);
    throw error;
  }
};

export const updatedUserRole = async ({ commit }, userRole) => {
  const { userId, role } = userRole
  const { data } = await usersRolesBack.put('/userRoles', { userId, roleIds: role }, {
    headers: {
      'Authorization': sessionStorage.getItem('token')
    }
  })
  const { user } = data
  commit('updatedUserRole', { user, role })
  return userId
}

export const updatedUser = async ({ commit }, data) => {
  const { idUser, user } = data
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

export const getSingleUserEdit = async ({ commit }, idUser) => {
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

export const deleteUser = async ({ commit }, idUser) => {
  try {
    const data = await usersBack.delete(`/users/${idUser}`, {
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    })
    if (data) {
      commit('deleteUser', idUser)
    }
  } catch (error) {
    console.error(error)
  }
}
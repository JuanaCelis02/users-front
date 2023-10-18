export const getAllUsers = (state, data) => {
  const {usersWithRoles, total} = data
  state.users = usersWithRoles
  state.totalUsers = total
}

export const getAllRoles = (state, roles) => {
  state.roles = roles
}

export const createRole = (state, role) => {
  state.roles = [...state.roles, role]
}

export const createUserRole = (state, data) => {
  const {userRole} = data
  state.users = [...state.users, userRole]
}

export const updatedUserRole = (state, data) => {
  const {user} = data
  console.log('UserRole' , data);
  const index = state.users.map(e => e.id ).indexOf(user.id)
  state.users[index] = user
}

export const updatedUser = (state, user) => {
  const index = state.users.map(e => e.id ).indexOf(user.id)
  state.users[index] = user
}

export const getSingleUser = (state, data) => {
  state.userEdit = data
}

export const deleteUser = (state, idUser) => {
  state.users = state.users.filter((user) => user.id != idUser)
}
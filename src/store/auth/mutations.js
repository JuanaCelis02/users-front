export const loginMutation = (state, data) => {
  const {token, userId} = data
  state.token = token
  state.userId = userId
}

export const getSingleUserMutation = (state, data) => {
  state.userData = data
}

export const logOut = (state) => {
  state.token = ''
}
import { createStore } from 'vuex'

import login from './auth'
import users from './users'

const store = createStore({
  modules: {
    login,
    users,
  }
})

export default store

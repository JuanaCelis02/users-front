import state from './state'
import * as actions from './actions'
import * as mutations from './mutations'

const loginModule = {
  namespaced: true,
  actions,
  mutations,
  state
}

export default loginModule
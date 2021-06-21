const app = {
  state: {
    query:''
  },
  mutations: {
    SET_QUERY: (state, data) => {
      state.query = data
    }
  },
  actions: {
    SetQuery({ commit }, query) {
      commit('SET_QUERY', query)
    }
  }
}

export default app

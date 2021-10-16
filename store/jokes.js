export const state = () => ({
  jokes: []
})

export const mutations = {
  setJokes(state, jokes) {
    state.jokes = jokes;
  }
}

export const actions = {
  async fetch({commit}) {
    const jokes = await this.$axios.$get('https://icanhazdadjoke.com/search?limit=20',{
                                            headers: {
                                              Accept: 'application/json'
                                            }
                                          }
                                        )
    commit('setJokes', jokes.results)
  }
}

export const getters = {
    jokes: s => s.jokes
}

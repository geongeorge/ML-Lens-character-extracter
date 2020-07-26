export const state = () => ({
  baseUrl: 'http://localhost:5000',
})

export const mutations = {
  setUrl(state, url) {
    state.baseUrl = url
  },
}

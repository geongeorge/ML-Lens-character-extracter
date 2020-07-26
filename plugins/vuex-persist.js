// ~/plugins/vuex-persist.js
import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    /* your options */
    key: 'vuex',
    storage: window.localStorage,
  }).plugin(store)
}

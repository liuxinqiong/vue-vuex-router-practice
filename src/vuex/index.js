import vue from 'vue'
import vuex from 'vuex'

import a from './modules/a'
import b from './modules/b'

vue.use(vuex)
const store = new vuex.Store({
  modules: {
    b
  }
})

store.registerModule('a',a);

export default store

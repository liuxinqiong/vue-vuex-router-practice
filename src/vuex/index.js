import vue from 'vue'
import vuex from 'vuex'

import a from './modules/a'
import b from './modules/b'

import myPlugin from './plugins/myPlugin'

vue.use(vuex)
const store = new vuex.Store({
  modules: {
    b
  },
  plugins:[myPlugin]
})

store.registerModule('a',a);

export default store

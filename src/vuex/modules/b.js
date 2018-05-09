import { ADD_COUNT } from '@/vuex/mutation-types'

export default {
    namespaced:true,
    state:{
        count: 0
    },
    mutations:{
        [ADD_COUNT](state){
            console.log('b')
            state.count++
        }
    },
    action:{

    }
}

import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import _ from 'lodash'




//state
import T1 from './t1.js'
import userInfo from './userInfo'
import goBackUrl from './goBackUrl.js'
import history from './history.js'

import getters from './getters.js'
import mutations from './mutations.js'

import pageInfo from './pageInfo.js'
import storage from './storage.js'
import processing from './processing.js'




Vue.use(Vuex)

// /需要持久化存储的模块
const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    key:'vuexLocal',
    modules: ['storage']
})

const store = new Vuex.Store({
    // state:{
    //     pagePath:"",
    //     pageName:"",
    //     pageTitle:"",
    //     historyUser:[],
    //     historyNews:[]
    // },
    mutations:mutations,
    getters:getters,
    modules: {
        T1,
        pageInfo,
        userInfo,
        goBackUrl,
        history,
        storage,
        processing
    },
    plugins: [vuexLocal.plugin]
})


export default store
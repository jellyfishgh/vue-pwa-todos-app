import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import storage from './storage'
import { STORAGE_KEY } from './config'
import * as types from './mutation-types'

export const storageData = store => {
  store.subscribe(({payload}) => {
    storage({
      key: STORAGE_KEY,
      data: payload,
      db: 'local'
    })
  })
}

export const state = {
  items: storage({
    key: STORAGE_KEY,
    defaultData: [],
    db: 'local'
  })
}

export const mutations = {
  [types.SAVE_TODO_ITEMS](state, items) {
    state.items = items
  }
}

export const getters = {
  items: ({items}) => items
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  plugins: [storageData],
  strict: process.env.NODE_ENV !== 'production'
})

import { defineStore } from 'pinia'

export const useTopics = defineStore('topics', {
  state () {
    return {
      all: [],
      good: [],
      share: [],
      ask: [],
      job: []
    }
  },
  actions: {
    updateList (key, data) {
      this[key] = data
    }
  }
})

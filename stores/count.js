import { defineStore } from "pinia"

const useCountStore = defineStore("count", {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++
    }
  }
})

export default useCountStore

// store.ts
import type { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  styles: any,
  matchingStyles: any,
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    styles: {},
    matchingStyles: {},
  },
  mutations: {
    setStyles (state, styles) {
        state.styles = styles
    },
    setMatchingStyles (state, matchingStyles) {
        state.matchingStyles = matchingStyles
    },
  },
  getters: {
    getStyles (state) {
        return state.styles
    },
    getMatchingStyles (state) {
        return state.matchingStyles
    },
    getStringMatchingStyles (state) {
        let result = "";
        for (let [key, value] of Object.entries(state.matchingStyles)) {
            // @ts-ignore:next-line
            result += `${key} { ${value.join('; ')} }`
        }
        return result
    },
  }
})

// define your own `useStore` composition function
export function useStore () {
  return baseUseStore(key)
}
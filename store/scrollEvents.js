const state = {
    reachedEnd: false,
    scrollY: false
  };
  
  const getters = {
    reachedEnd(state) {
      return state.reachedEnd;
    },
  
    scrollY(state) {
      return state.scrollY;
    }
  };
  
  const mutations = {
    setEvent(state, event) {
      state[event.name] = event.value;
    }
  };
  
  const actions = {
    setEvent({ commit }, event) {
      commit("setEvent", event);
    }
  };
  
  export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
  };
  
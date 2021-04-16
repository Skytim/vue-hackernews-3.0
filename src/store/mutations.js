export default {
  SET_ACTIVE_TYPE: (state, { type }) => {
    state.activeType = type
  },

  SET_LIST: (state, { type, data }) => {
    state.lists[type] = data
  },

  SET_ITEMS: (state, { data }) => {
    data.forEach(item => {
      if (item) {
        state.items[item.id] = item;
      }
    })
  },

  SET_USER: (state, { id, user }) => {
    state.users[id] = user || false; /* false means user not found */
  }
}
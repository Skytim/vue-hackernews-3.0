export default {
  SET_ACTIVE_TYPE: (state, { type }) => {
    state.activeType = type
  },

  SET_LIST: (state, { type, data }) => {
    state.lists[type] = data
  },

  SET_ITEMS: (state, { items }) => {
    items.forEach(item => {
      if (item) {
        state.items[item.id] = item;
      }
    })
  },

  SET_USER: (state, { userId, user }) => {
    state.users[userId] = user.data || {}; /* false means user not found */
  }
}
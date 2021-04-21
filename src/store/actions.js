import {
    fetchIdsByType,
    fetchItems,
    fetchUser
} from '../apis/index'


export default {
    // ensure data for rendering given list type
    FETCH_LIST_DATA: ({ commit, dispatch }, { type }) => {
        commit('SET_ACTIVE_TYPE', { type })
        return fetchIdsByType(type)
            .then(ids => {
                let data = ids.data;
                commit('SET_LIST', { type, data })
            })
            .then(() => dispatch('ENSURE_ACTIVE_ITEMS'))
    },

    // ensure all active items are fetched
    ENSURE_ACTIVE_ITEMS: ({ dispatch, getters }) => {
        return dispatch('FETCH_ITEMS', {
            ids: getters.activeIds
        })
    },

    FETCH_ITEMS: ({ commit, state }, { ids }) => {
        // on the client, the store itself serves as a cache.
        // only fetch items that we do not already have, or has expired (3 minutes)
        const now = Date.now()
        ids = ids.filter(id => {
            const item = state.items[id]
            if (!item) {
                return true
            }
            if (now - item.__lastUpdated > 1000 * 60 * 0.5) {
                return true
            }
            return false
        })
        if (ids.length) {
            return fetchItems(ids).then(items => {
                commit('SET_ITEMS', { items })
            })
        } else {
            return Promise.resolve()
        }
    },

    FETCH_USER: ({ commit, state }, { userId }) => {
        return state.users[userId]
            ? Promise.resolve(state.users[userId])
            : fetchUser(userId).then(user => commit('SET_USER', { userId, user }))
    }
}

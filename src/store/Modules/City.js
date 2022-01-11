const state = {
    allCity: ['Москва', 'Казань', 'Якутск', 'Токио', 'Сеул'],
    currentCity: []
}

const actions = {
}


const mutations = {
}

const getters = {
    allCity(state) {
        return state.allCity
    },
    currentCity (state) {
        return state.currentCity
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}
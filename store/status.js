export const state = () => ({
  answers: [],
  quizsetId: 0,
  quizId: 0
})

export const mutations = {
  add_answer (state, answer) {
    state.answers.push(answer)
  },
  init (state) {
    state.answers = []
    state.quizsetId = 0
    state.quizId = 0
  },
  update (state, status) {
    state.quizsetId = status.quizsetId
    state.quizId = status.quizId
  }
}

export const actions = {
  add_answer ({ commit }, answer) {
    commit('add_answer', answer)
  },
  init ({ commit }) {
    commit('init')
  },
  update ({ commit }, status) {
    commit('update', status)
  }
}

export const getters = {
  answers (state) {
    return state.answers
  },
  ids (state) {
    return {quizsetId:state.quizsetId, quizId:state.quizId}
  }
}

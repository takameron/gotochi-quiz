<template>
  <section>
    <h1>問題</h1>
    {{ getQuiz(ids.quizsetId, ids.quizId).photo }}<br>
    {{ getQuiz(ids.quizsetId, ids.quizId).text }}<br>
    {{ getQuiz(ids.quizsetId, ids.quizId).question }}<br>
    <div v-for="choice in getQuiz(ids.quizsetId, ids.quizId).choices" :key="choice">
      <button @click="moveAnswer(ids.quizsetId, ids.quizId, choice, getQuiz(ids.quizsetId, ids.quizId).answer)">{{ choice }}</button>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    ids() {
      return this.$store.getters['status/ids']
    }
  },
  methods: {
    getQuiz (quizsetId, quizId) {
      const list = this.$store.getters['quiz/list'].slice()
      const quizset = list.find(quizset => quizset.id === quizsetId)
      if (typeof quizset === 'undefined') {
        return '問題セットの取得に失敗'
      }
      const quiz = quizset.quizzes.find(quiz => quiz.id === quizId)
      if (typeof quiz === 'undefined') {
        return 'クイズの取得に失敗'
      }
      return quiz
    },
    moveAnswer(quizsetId, quizId, choice, answer) {
      const correct = choice === answer
      this.$store.dispatch('status/add_answer', {quizsetId, quizId, correct})
      this.$router.push('/answer')
    }
  }
}
</script>

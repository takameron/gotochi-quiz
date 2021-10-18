<template>
  <v-container>
    <v-row class="pa-4">
      <v-col cols="12" class="text-center">
        <v-chip large color="orange" text-color="white" class="text-h5">第{{ ids.quizId }}問</v-chip>
      </v-col>
      <v-col cols="12" class="text-center">
        <v-img :src="getQuiz(ids.quizsetId, ids.quizId).photo" class="rounded"></v-img>
      </v-col>
      <v-col cols="12" class="text-center text-h5">{{ getQuiz(ids.quizsetId, ids.quizId).question }}</v-col>
      <v-col
        v-for="choice in getQuiz(ids.quizsetId, ids.quizId).choices"
        :key="choice"
        class="border"
        xs="12"
        sm="6"
        cols="12"
      >
        <v-btn
          depressed
          color="error"
          width="100%"
          @click="moveAnswer(ids.quizsetId, ids.quizId, choice, getQuiz(ids.quizsetId, ids.quizId).answer)"
        >{{ choice }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
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

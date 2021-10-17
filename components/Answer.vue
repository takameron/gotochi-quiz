<template>
  <v-container>
    <v-row class="pa-4">
      <v-col cols="12" class="text-center">
        <v-chip large color="orange" text-color="white" class="text-h5">答え</v-chip>
      </v-col>
      <v-col
        cols="12"
        class="text-center text-h5"
        :class="correct ? 'red--text' : 'blue--text'"
      >{{ correct | convResultText }}</v-col>
      <v-col cols="12" class="text-center text-h5">{{ answer }}</v-col>
      <v-btn depressed color="error" width="100%" @click="moveNext()">次へ</v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  filters: {
    convResultText (correct) {
      if (correct)
        return '正解'
      else
        return '残念'
    }
  },
  computed: {
    answer() {
      const ids = this.$store.getters['status/ids']
      const list = this.$store.getters['quiz/list'].slice()
      const quizset = list.find(quizset => quizset.id === ids.quizsetId)
      if (typeof quizset === 'undefined') {
        return '問題セットの取得に失敗'
      }
      const quiz = quizset.quizzes.find(quiz => quiz.id === ids.quizId)
      if (typeof quiz === 'undefined') {
        return 'クイズの取得に失敗'
      }
      return quiz.answer
    },
    correct() {
      const ids = this.$store.getters['status/ids']
      const answers = this.$store.getters['status/answers']
      const answer = answers.find(answer => answer.quizsetId === ids.quizsetId && answer.quizId === ids.quizId)
      if (typeof answer === 'undefined') {
        return '回答の取得に失敗'
      }
      return answer.correct
    }
  },
  methods: {
    moveNext() {
      // 問題 or 結果
      const ids = this.$store.getters['status/ids']
      const list = this.$store.getters['quiz/list'].slice()
      const quizset = list.find(quizset => quizset.id === ids.quizsetId)
      if (typeof quizset === 'undefined') {
        return '問題セットの取得に失敗'
      }
      if (ids.quizId === quizset.quizzes.length)
        this.$router.push('/result')
      else {
        this.$store.dispatch('status/update', {quizsetId:ids.quizsetId, quizId:ids.quizId+1})
        this.$router.push('/question')
      }
    }
  }
}
</script>

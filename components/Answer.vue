<template>
  <section>
    <h1>答え</h1>
    <div class="answer-iscorrect">{{ correct | convResultText }}</div>
    {{ answer }}<br>
    <div style="white-space: pre-wrap;" v-text="description" /><br>
    <button @click="moveNext()">次へ</button>
  </section>
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
    },
    description() {
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
      return quiz.description
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

<style>

/* <template></template>内のid属性やclass属性をつけたものに対して、CSSでスタイルを当てる */

  /* ↓例↓ */
  .answer-iscorrect {
    color: red;
  }
</style>

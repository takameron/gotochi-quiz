<template>
  <section>
    <h1>結果</h1>
    {{ quiz_num }}問中{{ correct_num }}問正解！<br>
    <button @click="moveTop()">問題一覧に戻る</button>
  </section>
</template>

<script>
  export default {
    computed: {
      quiz_num() {
        const ids = this.$store.getters['status/ids']
        const list = this.$store.getters['quiz/list'].slice()
        const quizset = list.find(quizset => quizset.id === ids.quizsetId)
        if (typeof quizset === 'undefined') {
          return '問題セットの取得に失敗'
        }
        return quizset.quizzes.length
      },
      correct_num() {
        const ids = this.$store.getters['status/ids']
        const answers = this.$store.getters['status/answers']
        const correctAnswers = answers.filter(answer => answer.quizsetId === ids.quizsetId && answer.correct === true)
        if (typeof correctAnswers === 'undefined') {
          return '回答の取得に失敗'
        }
        return correctAnswers.length
      }
    },
    methods: {
      moveTop() {

        // ランキング用に保存処理を入れるのも良いかも

        this.$router.push('/')
      }
    }
  }
</script>

<template>
  <section>
    <div v-for="quizset in list" :key="quizset.id">
      <button @click="moveQuestion(quizset.id)">{{ quizset.title }}</button>
    </div>
    <div class="copyright">
      このアプリは以下の著作物を改変して利用しています。 福井県オープンデータライブラリ、福井県、<a href="https://creativecommons.org/licenses/by/2.1/jp/">クリエイティブ・コモンズ・ライセンス 表示 2.1</a>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    list() {
      return this.$store.getters['quiz/list'].slice()
    }
  },
  methods: {
    moveQuestion(id) {
      this.$store.dispatch('status/update', {quizsetId:id, quizId:1})
      this.$router.push('/question')
    }
  }
}
</script>

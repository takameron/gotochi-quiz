<template>
  <v-container>
    <v-row class="pa-4">
      <v-col
        v-for="quizset in list"
        :key="quizset.id"
        class="border"
        xs="12"
        sm="12"
        cols="12"
      >
        <v-btn
          width="100%"
          @click="moveQuestion(quizset.id)"
        >{{ quizset.title }}（{{ getQuizNum(quizset.id) }}問）</v-btn>
      </v-col>

      <v-footer class="copyright">
        このアプリは以下の著作物を改変して利用しています。 <a href="https://www.pref.fukui.lg.jp/doc/toukei-jouhou/opendata/category.html">福井県オープンデータライブラリ</a>、福井県、<a href="https://creativecommons.org/licenses/by/2.1/jp/">クリエイティブ・コモンズ・ライセンス 表示 2.1</a>
      </v-footer>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    list() {
      return this.$store.getters['quiz/list'].slice()
    }
  },
  methods: {
    getQuizNum(quizsetId) {
      const list = this.$store.getters['quiz/list'].slice()
      const quizset = list.find(quizset => quizset.id === quizsetId)
      if (typeof quizset === 'undefined') {
        return '問題セットの取得に失敗'
      }
      return quizset.quizzes.length
    },
    moveQuestion(id) {
      this.$store.dispatch('status/init')
      this.$store.dispatch('status/update', {quizsetId:id, quizId:1})
      this.$router.push('/question')
    }
  }
}
</script>

<template>
  <section>
    <div v-for="quizset in list" :key="quizset.id">
      <button @click="moveQuestion(quizset.id)">{{ quizset.title }}</button>
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
      this.$store.dispatch('status/init')
      this.$store.dispatch('status/update', {quizsetId:id, quizId:1})
      this.$router.push('/question')
    }
  }
}
</script>

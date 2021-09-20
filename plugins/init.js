export default ({ store }, inject) => {
  if (process.server) { // SSRでのみ動作
    store.dispatch('quiz/set') // 問題データをセット
  }
}

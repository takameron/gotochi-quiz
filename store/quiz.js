export const state = () => ({
   list: []
})

export const mutations = {
  // ===== クイズの追加処理を行う =====
  set (state) {
    /* //データ構造
    const quiz_set = {
      id:0,
      title: "", // クイズセットのタイトル
      quizzes: [] // クイズの配列
    }

    const quiz = {
      id: 0,
      question: "", // 問題文
      text: "", // 問題に付随する文章があればそのテキスト
      photo: "", // 写真がある場合はそのパス
      choices: [], // 選択肢
      answer: "" // 答え
    }
    */

    // ===== 処理手順 =====
    // 以下、問題セットの数だけループ
    //    CSVファイル読み出し
    //    quiz_setを作成
    //    quiz_setのidとtitleを設定
    //    以下、問題の数だけループ
    //        quizの作成
    //        quizの項目を埋める
    //        quizをquiz_set.quizzesに追加
    //    quiz_setをstate.listに追加( state.list.push(quiz_set) )


    // ===== とりあえず開発時用に固定値を入れておく 始 =====

    const quizSet1 = {
      id: 1,
      title: "問題セット1",
      quizzes: []
    }

    const quiz1 = {}
    quiz1.id = 1
    quiz1.question = "〇〇の意味は？"
    quiz1.photo = "https://res.cloudinary.com/tsukayaku/image/upload/Blog-personal/thumbnail/default.jpg"
    quiz1.choices = ["答え1","答え2","答え3","答え4"]
    quiz1.answer = "答え2"

    quizSet1.quizzes.push(quiz1)

    const quiz2 = {}
    quiz2.id = 2
    quiz2.question = "〇〇はなぜ？"
    quiz2.photo = "https://res.cloudinary.com/tsukayaku/image/upload/v1583049405/Blog-personal/contour_extraction_of_GIMP/processed.jpg"
    quiz2.choices = ["答え1","答え2","答え3","答え4"]
    quiz2.answer = "答え3"

    quizSet1.quizzes.push(quiz2)
    state.list.push(quizSet1)

    const quizSet2 = {
      id: 2,
      title: "問題セット2",
      quizzes: []
    }

    const quiz3 = {}
    quiz3.id = 1
    quiz3.question = "□□の読み方は？"
    quiz3.photo = "https://res.cloudinary.com/tsukayaku/image/upload/Blog-personal/thumbnail/default.jpg"
    quiz3.choices = ["答え1","答え2","答え3","答え4"]
    quiz3.answer = "答え4"

    quizSet2.quizzes.push(quiz3)

    const quiz4 = {}
    quiz4.id = 2
    quiz4.question = "〇〇はどれ？"
    quiz4.photo = "https://res.cloudinary.com/tsukayaku/image/upload/v1583049405/Blog-personal/contour_extraction_of_GIMP/processed.jpg"
    quiz4.choices = ["答え1","答え2","答え3","答え4"]
    quiz4.answer = "答え1"

    quizSet2.quizzes.push(quiz4)
    state.list.push(quizSet2)
    // ===== とりあえず開発時用に固定値を入れておく 終 =====
  }
}

export const actions = {
  set ({ commit }) {
    commit('set')
  }
}

export const getters = {
  list (state) {
    return state.list
  }
}

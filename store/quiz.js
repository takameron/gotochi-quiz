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
      answer: "", // 答え
      description // 説明
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

    // ===== 福井ふるさと百景 始 =====
    const csvHyakkei = require('../data/hyakkei.csv')

    const quizsetHyakkei = {
      id: 1,
      title: "福井ふるさと百景",
      quizzes: []
    }

    let lines = []
    csvHyakkei.forEach((val, i) => {
      const line = {} // 1列の連想配列

      line.num_p = val[0].split('_')[0]
      line.num_c = val[0].split('_')[1]
      line.hyakkei = val[1]
      line.point = val[2]
      line.description = val[3]
      line.longitude = val[4]
      line.latitude = val[5]
      line.hasPhoto = val[6]
      line.img1 = val[7]
      line.img2 = val[8]
      line.img3 = val[9]
      line.img4 = val[10]
      line.img5 = val[11]

      if (i !== 0) // 1列目はスキップ
        lines.push(line)
    })

    // 問題生成
    for (let i = 1; i <= 10; i++) // 10問分
    {
      const quiz = {}
      quiz.id = i
      quiz.question = "これはどこ？"

      const hasPhotos = lines.filter(line => line.hasPhoto)
      const ansIndex = Math.floor(Math.random() * hasPhotos.length) - 1
      quiz.photo = hasPhotos[ansIndex].img1
      quiz.answer = hasPhotos[ansIndex].hyakkei
      quiz.description = hasPhotos[ansIndex].point + '\n' + hasPhotos[ansIndex].description

      const hyakkeies = [] // 百景だけを抽出
      lines.forEach((val) => {
        hyakkeies.push(val.hyakkei)
      })
      const choices = getRandomArray(hyakkeies, 3) // 適当に3つ抽出
      choices.push(quiz.answer) // 答えを追加
      quiz.choices = getShuffledArray(choices) // ごちゃまぜにする

      quizsetHyakkei.quizzes.push(quiz)
    }

    state.list.push(quizsetHyakkei)
    // ===== 福井ふるさと百景 終 =====

    // ===== 『若狭路ご膳』登録メニュー提供店 始 =====
    const csvWakasaji = require('../data/wakasaji.csv')

    const quizsetWakasaji = {
      id: 2,
      title: "『若狭路ご膳』登録メニュー提供店",
      quizzes: []
    }

    lines = []
    csvWakasaji.forEach((val, i) => {
      const line = {} // 1列の連想配列

      line.num = val[0]
      line.name = val[1]
      line.zipcode = val[2]
      line.area = val[3]
      line.address = val[4]
      line.business_hours = val[5]
      line.regular_holiday = val[6]
      line.menu1 = val[7]
      line.price1 = val[8]
      line.menu2 = val[9]
      line.price2 = val[10]
      line.menu3 = val[11]
      line.price3 = val[12]
      line.menu4 = val[13]
      line.price4 = val[14]
      line.menu5 = val[15]
      line.price5 = val[16]
      line.contents = val[17]
      line.remarks = val[18]
      line.phone_number = val[19]
      line.number_of_seats = val[20]
      line.parking_number = val[21]
      line.longitude = val[22]
      line.latitude = val[23]
      line.img1 = val[24]
      line.img2 = val[25]
      line.img3 = val[26]
      line.img4 = val[27]

      if (i !== 0) // 1列目はスキップ
        lines.push(line)
    })

    // 問題生成
    for (let i = 1; i <= 10; i++) // 10問分
    {
      const quiz = {}
      quiz.id = i
      quiz.question = "これはどのお店？"

      const hasPhotos = lines.filter(line => line.img1)
      const ansIndex = Math.floor(Math.random() * hasPhotos.length)
      quiz.photo = hasPhotos[ansIndex].img1
      quiz.answer = hasPhotos[ansIndex].name
      quiz.description = hasPhotos[ansIndex].contents + '\n' + hasPhotos[ansIndex].address + '\n' + '営業時間：' + hasPhotos[ansIndex].business_hours + '\n' + '定休日：' +  hasPhotos[ansIndex].regular_holiday

      const names = [] // 店舗名だけを抽出
      lines.forEach((val) => {
        names.push(val.name)
      })
      const choices = getRandomArray(names, 3) // 適当に3つ抽出
      choices.push(quiz.answer) // 答えを追加
      quiz.choices = getShuffledArray(choices) // ごちゃまぜにする

      quizsetWakasaji.quizzes.push(quiz)
    }

    state.list.push(quizsetWakasaji)
    // ===== 『若狭路ご膳』登録メニュー提供店 終 =====
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

// 任意の個数の要素をランダムに取り出す
// 【引数】
//   array : 配列
//   num   : 個数
// 【戻り値】
//   num個の要素を含む配列
function getRandomArray(array, num)
{
  const rndArray = []

  for (let i = 0; i < num; i++)
  {
    rndArray.push(array[Math.floor(Math.random() * array.length)])
  }

  return rndArray
}

// 配列ランダムに並び変える
// ref:https://stackoverflow.com/a/12646864
// 【引数】
//   array : 最小値
// 【戻り値】
//   並び替えた配列
function getShuffledArray(array)
{
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

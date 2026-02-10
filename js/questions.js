window.QUESTIONS = [

  // ===== フェーズ1：内向 / 外向（裏判定・非表示）=====
  {
    id: "Q0-1",
    type: "polarity",
    text: "悩みごとがある時、楽になるのは？",
    choices: [
      { text: "誰かに話す", polarity: "out" },
      { text: "一人で考える", polarity: "in" }
    ]
  },
  {
    id: "Q0-2",
    type: "polarity",
    text: "ストレス発散するには？",
    choices: [
      { text: "身体を動かす", polarity: "out" },
      { text: "しずかに過ごす", polarity: "in" }
    ]
  },
  {
    id: "Q0-3",
    type: "polarity",
    text: "考えがまとまらない時の癖は？",
    choices: [
      { text: "人と話したり相談する", polarity: "out" },
      { text: "一人で考えるか調べる", polarity: "in" }
    ]
  },

  // ===== フェーズ2：10タイプ判定 =====
  {
    id: "Q1",
    text: "これまで自然と任されることが多かった役割は？",
    choices: [
      { text: "アイディアを出したり新しいことをはじめる役", score: "expand_drive" },
      { text: "人や仕組みを育て、長く続ける役", score: "grow_stack" },
      { text: "人前で説明・発信・代表して話す役", score: "influence_send" },
      { text: "誰かの相談に乗る役", score: "inner_resonance" },
      { text: "人間関係や場を安定させる調整役", score: "place_stable" }
    ]
  },

  {
    id: "Q2",
    text: "褒められる理由で一番多いのは？",
    choices: [
      { text: "テキパキとすすめてくれている、仕事がはやい", score: "expand_drive" },
      { text: "じっくり粘り強く継続している", score: "grow_stack" },
      { text: "分かりやすく伝えてくれる", score: "influence_send" },
      { text: "話をちゃんと聞いてくれる", score: "inner_resonance" },
      { text: "安心して任せられる", score: "place_stable" }
    ]
  },

  {
    id: "Q3",
    text: "正直、長く続けると消耗する仕事は？",
    choices: [
      { text: "同じことを繰り返す仕事", score: "expand_drive" },
      { text: "短期成果を求められる仕事", score: "grow_stack" },
      { text: "常に人前に立ち続ける仕事", score: "inner_resonance" },
      { text: "裁量や表現の余地がない仕事", score: "influence_send" },
      { text: "前に進める裁量がなく、その場を丸く収めることだけ求められる仕事", score: "place_stable" }
    ]
  },

  {
    id: "Q4",
    text: "特に予定がない休日、自然に時間を使うのは？",
    choices: [
      { text: "新しい場所に行く／初めての体験を入れる", score: "expand_drive" },
      { text: "本を読む・学ぶ・調べるなど、知的なインプット", score: "grow_stack" },
      { text: "文章を書く・投稿するなど、表現すること", score: "influence_send" },
      { text: "信頼できる1人と話す", score: "inner_resonance" },
      { text: "部屋の片づけ、持ち物や環境を整える", score: "place_stable" },
      { text: "予定や考えを整理して、頭の中をスッキリさせる", score: "precision_build" },
      { text: "いろんな人と会って、雑談や情報交換をする", score: "flow_cycle" },
      { text: "特に何もせず、休む・回復に使う", score: "resource_store" }
    ]
  },

  {
    id: "Q5",
    text: "お金や仕事で一番ストレスになるのは？",
    choices: [
      { text: "やりたいことやアイデアがあるのに、お金が原因で動けない・前に進まない状態", score: "expand_drive" },
      { text: "時間をかけて積み上げたものが、途中で止まったり、続かなくなること", score: "grow_stack" },
      { text: "発信・提案・アウトプットをしているのに、数字・反応・成果として返ってこないこと", score: "influence_send" },
      { text: "仕事の内容や価値はあるのに、単価が上がらない／正当に評価されない状態", score: "inner_resonance" },
      { text: "収入や仕事量が安定せず、毎月の見通しが立たない状態", score: "place_stable" },
      { text: "将来が不安になること", score: "base_hold" }
    ]
  },

  {
    id: "Q6",
    text: "悩んだ時、一番最初にやりがちなのは？",
    choices: [
      { text: "細かいことは考えず、とりあえず1つ動いてみる（例：連絡する／着手する）", score: "expand_drive" },
      { text: "これまで積み上げてきたことを、今後どう育てるか考える", score: "grow_stack" },
      { text: "複数人に話して意見や視点を集める", score: "flow_cycle" },
      { text: "信頼できる1人に相談する", score: "inner_resonance" },
      { text: "ノートやメモに書き出して整理する", score: "precision_build" }
    ]
  },

  {
    id: "Q7",
    text: "仕事やお金で『うまくいっている』と感じる瞬間は？",
    choices: [
      { text: "一気に成果が上がった時", score: "expand_drive" },
      { text: "積み上げが形になった時", score: "grow_stack" },
      { text: "共感や反応が増えた時", score: "influence_send" },
      { text: "相手が安心してくれた時", score: "inner_resonance" },
      { text: "組織が安定して回っている時", score: "place_stable" }
    ]
  },

  {
    id: "Q8",
    text: "仕事をしていて、手応えを感じやすいのはどんな時？",
    choices: [
      { text: "新しいことをやっている時", score: "expand_drive" },
      { text: "慣れていて勝手がわかっている仕事をしている時", score: "grow_stack" },
      { text: "伝えたいことを表現している時", score: "influence_send" },
      { text: "誰かの話を深く聞いている時", score: "inner_resonance" },
      { text: "場や流れを整えている時", score: "place_stable" }
    ]
  },

  {
    id: "Q9",
    text: "『これは自分の仕事じゃない』と感じやすいのは？",
    choices: [
      { text: "事務作業ばかり", score: "expand_drive" },
      { text: "即断即決の連続", score: "grow_stack" },
      { text: "目立たない裏方作業", score: "influence_send" },
      { text: "一方的な指示、ビジネスライクな環境", score: "inner_resonance" },
      { text: "競争の激しい環境", score: "place_stable" }
    ]
  },

  {
    id: "Q10",
    text: "人から頼まれた時、比較的ストレスが少ない対応は？",
    choices: [
      { text: "リーダーシップをとる", score: "expand_drive" },
      { text: "人や組織をじっくり育てる", score: "grow_stack" },
      { text: "わかりやすく説明する", score: "influence_send" },
      { text: "誰かの悩みごとを聞いて共感する", score: "inner_resonance" },
      { text: "全体や組織のバランスを取る", score: "place_stable" }
    ]
  },

  {
    id: "Q11",
    text: "1週間の中で、これがあると調子がいいのは？",
    choices: [
      { text: "新しい企画や行動を試す時間", score: "expand_drive" },
      { text: "いつものテーマに集中する時間", score: "grow_stack" },
      { text: "発信・表現する時間", score: "influence_send" },
      { text: "誰かと丁寧に関わり、感謝や信頼を感じる時", score: "inner_resonance" },
      { text: "振り返り、状況整理", score: "place_stable" }
    ]
  },

  {
    id: "Q12",
    text: "周囲から『あなたに期待されている』と感じるのは？",
    choices: [
      { text: "リーダーシップをとったり物事を前にすすめること", score: "expand_drive" },
      { text: "まわりを育てること", score: "grow_stack" },
      { text: "分かりやすく伝えること", score: "influence_send" },
      { text: "気持ちや感情のケアをすること", score: "inner_resonance" },
      { text: "場やチームを安定させること", score: "place_stable" }
    ]
  },

  {
    id: "Q13",
    text: "最も強いストレスを感じるのは？",
    choices: [
      { text: "動けず停滞している状態", score: "expand_drive" },
      { text: "継続や積み上げを感じられない時", score: "grow_stack" },
      { text: "発信や表現ができていない状態", score: "influence_send" },
      { text: "一人で抱え込んでいる状態", score: "inner_resonance" },
      { text: "環境が合わないと感じる時", score: "place_stable" }
    ]
  },

  {
    id: "Q14",
    text: "長く続けたい生き方に近いのは？",
    choices: [
      { text: "つねに挑戦", score: "expand_drive" },
      { text: "人や組織を育てる", score: "grow_stack" },
      { text: "宣伝活動や伝え続ける", score: "influence_send" },
      { text: "誰かのサポート、支えあう、チームワーク", score: "inner_resonance" },
      { text: "乱れた物事や環境を整える、秩序をあたえる", score: "place_stable" }
    ]
  },

  {
    id: "Q15",
    text: "これができていると安心するのは？",
    choices: [
      { text: "行動できている、進んでいる", score: "expand_drive" },
      { text: "継続できている、積み上げられている", score: "grow_stack" },
      { text: "反応やレスポンス、賞賛をもらえる", score: "influence_send" },
      { text: "信頼関係がある、あたたかみを感じる", score: "inner_resonance" },
      { text: "生活や場が安定している、物事が秩序だっている", score: "place_stable" }
    ]
  }
];

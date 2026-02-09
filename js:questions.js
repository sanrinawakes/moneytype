window.QUESTIONS = [

  // ===== フェーズ1：内向 / 外向（裏判定・非表示）=====
  {
    id: "Q0-1",
    type: "polarity",
    text: "悩みごとがある時、楽になるのは？",
    choices: [
      { text: "誰かに出す／外に出す", polarity: "out" },
      { text: "一人で考える／静かにする", polarity: "in" }
    ]
  },
  {
    id: "Q0-2",
    type: "polarity",
    text: "負荷が一気に増えた時の処理は？",
    choices: [
      { text: "外に出して処理（共有・相談・分担）", polarity: "out" },
      { text: "内に引き取って処理（整理・集中）", polarity: "in" }
    ]
  },
  {
    id: "Q0-3",
    type: "polarity",
    text: "考えがまとまらない時の癖は？",
    choices: [
      { text: "話す・書くなど外に出す", polarity: "out" },
      { text: "一人で考えてまとめる", polarity: "in" }
    ]
  },

  // ===== フェーズ2：10タイプ判定 =====
  {
    id: "Q1",
    text: "これまで自然と任されることが多かった役割は？",
    choices: [
      { text: "新しい企画や動きを立ち上げる役", score: "expand_drive" },
      { text: "人や仕組みを育て、長く続ける役", score: "grow_stack" },
      { text: "人前で説明・発信・代表して話す役", score: "influence_send" },
      { text: "一対一で相談に乗る役", score: "inner_resonance" },
      { text: "人や場を安定させる調整役", score: "place_stable" }
    ]
  },

  {
    id: "Q2",
    text: "『助かりました』と言われる理由で一番多いのは？",
    choices: [
      { text: "動きが早く、前に進めてくれる", score: "expand_drive" },
      { text: "続けてくれた／積み上げてくれた", score: "grow_stack" },
      { text: "分かりやすく伝えてくれた", score: "influence_send" },
      { text: "話をちゃんと聞いてくれた", score: "inner_resonance" },
      { text: "安心して任せられた", score: "place_stable" }
    ]
  },

  {
    id: "Q3",
    text: "正直、長く続けると消耗する仕事は？",
    choices: [
      { text: "同じことを繰り返す仕事", score: "expand_drive" },
      { text: "短期成果を強く求められる仕事", score: "grow_stack" },
      { text: "常に人前に立ち続ける仕事", score: "inner_resonance" },
      { text: "大人数を相手にする仕事", score: "influence_send" },
      { text: "全体の空気や調整ばかりの仕事", score: "place_stable" }
    ]
  },

  {
    id: "Q4",
    text: "特に予定がない休日、自然に時間を使うのは？",
    choices: [
      { text: "新しい場所・初めての体験", score: "expand_drive" },
      { text: "学ぶ・読む・仕込み", score: "grow_stack" },
      { text: "発信・表現する", score: "influence_send" },
      { text: "信頼できる1人と話す", score: "inner_resonance" },
      { text: "家や生活を整える", score: "place_stable" },
      { text: "作業や仕組みを整える", score: "precision_build" },
      { text: "人と会い、情報交換する", score: "flow_cycle" },
      { text: "休む・回復に使う", score: "resource_store" }
    ]
  },

  {
    id: "Q5",
    text: "お金や仕事で一番ストレスになるのは？",
    choices: [
      { text: "やりたい動きがあるのに動けない", score: "expand_drive" },
      { text: "積み上げてきたものが止まる", score: "grow_stack" },
      { text: "発信や提案に反応がない", score: "influence_send" },
      { text: "信頼関係がギクシャクする", score: "inner_resonance" },
      { text: "生活や場が不安定になる", score: "place_stable" },
      { text: "将来が不安で守りに入る", score: "base_hold" }
    ]
  },

  {
    id: "Q6",
    text: "悩んだ時、一番最初にやりがちなのは？",
    choices: [
      { text: "とにかく行動する", score: "expand_drive" },
      { text: "時間を置いて考える", score: "grow_stack" },
      { text: "複数人に話して意見を集める", score: "flow_cycle" },
      { text: "信頼できる1人に相談する", score: "inner_resonance" },
      { text: "書き出して整理する", score: "precision_build" },
      { text: "リスクを考えて守る", score: "base_hold" },
      { text: "決めて一気に片づける", score: "decide_opt" },
      { text: "今は動かず回復する", score: "resource_store" }
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
      { text: "全体が安定して回った時", score: "place_stable" }
    ]
  },

  {
    id: "Q8",
    text: "仕事で『これは自分らしい』と感じる瞬間は？",
    choices: [
      { text: "新しい動きを作っている時", score: "expand_drive" },
      { text: "同じテーマを深めている時", score: "grow_stack" },
      { text: "伝えたいことを表現している時", score: "influence_send" },
      { text: "誰かの話を深く聞いている時", score: "inner_resonance" },
      { text: "場や流れを整えている時", score: "place_stable" }
    ]
  },

  {
    id: "Q9",
    text: "『これは自分の仕事じゃない』と感じやすいのは？",
    choices: [
      { text: "守りや管理ばかり", score: "expand_drive" },
      { text: "即断即決の連続", score: "grow_stack" },
      { text: "目立たない裏方作業", score: "influence_send" },
      { text: "一方的な指示・押し付け", score: "inner_resonance" },
      { text: "競争やギスギスした環境", score: "place_stable" }
    ]
  },

  {
    id: "Q10",
    text: "人から頼まれた時、比較的ストレスが少ない対応は？",
    choices: [
      { text: "すぐ着手・実行する", score: "expand_drive" },
      { text: "長期で育てて関わる", score: "grow_stack" },
      { text: "整理して説明する", score: "influence_send" },
      { text: "話を聞いて整理する", score: "inner_resonance" },
      { text: "全体のバランスを取る", score: "place_stable" }
    ]
  },

  {
    id: "Q11",
    text: "1週間の中で、これがあると調子がいいのは？",
    choices: [
      { text: "新しい企画や行動を試す時間", score: "expand_drive" },
      { text: "同じテーマに集中する時間", score: "grow_stack" },
      { text: "発信・表現する時間", score: "influence_send" },
      { text: "一対一で向き合う時間", score: "inner_resonance" },
      { text: "運営・調整・整備の時間", score: "place_stable" }
    ]
  },

  {
    id: "Q12",
    text: "周囲から『あなたに期待されている』と感じるのは？",
    choices: [
      { text: "前に進めてくれる", score: "expand_drive" },
      { text: "続けて育ててくれる", score: "grow_stack" },
      { text: "分かりやすく伝えてくれる", score: "influence_send" },
      { text: "相談に乗ってくれる", score: "inner_resonance" },
      { text: "場やチームを安定させてくれる", score: "place_stable" }
    ]
  },

  {
    id: "Q13",
    text: "最も強いストレスを感じるのは？",
    choices: [
      { text: "動けず停滞している状態", score: "expand_drive" },
      { text: "積み上げが止まっている状態", score: "grow_stack" },
      { text: "発信や表現ができていない状態", score: "influence_send" },
      { text: "一人で抱え込んでいる状態", score: "inner_resonance" },
      { text: "調整や世話が増えすぎている状態", score: "place_stable" }
    ]
  },

  {
    id: "Q14",
    text: "長く続けたい生き方に近いのは？",
    choices: [
      { text: "広げ続ける", score: "expand_drive" },
      { text: "育て続ける", score: "grow_stack" },
      { text: "伝え続ける", score: "influence_send" },
      { text: "支え続ける", score: "inner_resonance" },
      { text: "整え続ける", score: "place_stable" }
    ]
  },

  {
    id: "Q15",
    text: "これができていると安心するのは？",
    choices: [
      { text: "動き続けられている", score: "expand_drive" },
      { text: "積み上がっている", score: "grow_stack" },
      { text: "反応や共感がある", score: "influence_send" },
      { text: "信頼関係がある", score: "inner_resonance" },
      { text: "生活や場が安定している", score: "place_stable" }
    ]
  }
];

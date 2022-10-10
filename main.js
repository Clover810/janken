// 0=グー 1=チョキ 2=パー
// 勝敗表
// 引き分け 0
// 勝ち -1,2
// 負け -2,1

let player, playerhand, cpu, cpuhand, ans, data, checksum;
let score = 0;
let highscore = 0;
let autosavedata = 1;
let money = 0;

function save() {
  let json = JSON.stringify(score, undefined, 1);
  localStorage.setItem('score',  json);
  let json2 = JSON.stringify(highscore, undefined, 1);
  localStorage.setItem('highscore', json2);
  audio2 ();
  }

function load() {
  score = localStorage.getItem('score');
  score = JSON.parse(score);
  highscore = localStorage.getItem('highscore');
  highscore = JSON.parse(highscore);
  alert ("ロード成功");
}

function savedel() {
  let a = window.confirm ("セーブデータを本当に削除しますか？\nデータはバックアップから復元可能です");
  if (a == true) {
    score = 0;
    highscore = 0;
    let json = JSON.stringify(score, undefined, 1);
    localStorage.setItem('score',  json);
    let json2 = JSON.stringify(highscore, undefined, 1);
    localStorage.setItem('highscore',  json2);
    alert ("セーブデータを削除しました");
  } else {
    alert ("キャンセルしました");
  }
}

function autosave() {
  if (autosavedata == 0) {
    autosavedata = 1;
    document.getElementById("Auto").innerHTML = "ON";
    document.getElementById("Autoinfo").innerHTML = "現在オートセーブは有効です";
  } else if (autosavedata == 1) {
    autosavedata = 0;
    document.getElementById("Auto").innerHTML = "OFF";
    document.getElementById("Autoinfo").innerHTML = "現在オートセーブは無効です";
  }
}

function janken(player) {
  audio();
  // cpuの手を決める
  cpu = Math.floor( Math.random() * 3 );
  // 勝敗計算
  ans = player - cpu;
  //プレイヤーの手を文字列化
  if (player == 0) {
    playerhand = "✊";
  } else if (player == 1) {
    playerhand = "✌";
  } else if (player == 2) {
    playerhand = "✋";
  } else {
    playerhand = "unknown";
  }

  //cpuの手を文字列化
  if (cpu == 0) {
    cpuhand = "✊";
  } else if (cpu == 1) {
    cpuhand = "✌";
  } else if (cpu == 2) {
    cpuhand = "✋";
  } else {
    cpuhand = "unknown";
  }

  //勝敗判断
  if (ans == 0) {
    alert ("【引き分け】\n1スコアアップ\nあなたの手: " + playerhand + "\nCPUの手: " + cpuhand);
    score += 1;
    if (score >= highscore) {
      highscore = score;
    }
  } else if (ans == -1 || ans == 2) {
    alert ("【あなたの勝ち】\n2スコアアップ\nあなたの手: " + playerhand + "\nCPUの手: " + cpuhand);
    score += 2;
    if (score >= highscore) {
      highscore = score;
    }
  } else if (ans == -2 || ans == 1) {
    alert ("【あなたの負け】\n1スコアダウン\nあなたの手: " + playerhand + "\nCPUの手: " + cpuhand);
    score -= 1;
    if (score <= 0) {
      score = 0;
    }
    if (score >= highscore) {
      highscore = score;
    }
  } else {
    alert ("想定外の数値です\nans: " + ans + "\nplayer: " + player + "\ncpu: " + cpu + "\nplayerhand: " + playerhand);
  }
  return alert;
  save();
}

function textload() {
  document.getElementById("Score").innerHTML = "スコア: " + score;
  document.getElementById("HighScore").innerHTML = "ハイスコア: " + highscore;
}

function importsave() {
  data = window.prompt ("セーブデータ1/2を入力", "");
  data2 = window.prompt ("セーブデータ2/2を入力", "");
  data = Number (data);
  data2 = Number (data2);
  checksum = window.prompt ("不正防止コードを入力", "");
  checksum = Number (checksum);
  if (checksum == ((data ^ 49728772) & (data2 ^ 68603839) | 73184280 * 2764)) {
    score = data;
    highscore = data2;
    alert ("インポート成功");
  } else {
    alert ("インポート失敗\n不正防止コードが違います\nデータ1/2: " + data + "\nデータ2/2: " + data2 + "\n不正防止コード: " + checksum);
  }
}

function exportsave() {
  window.prompt ("セーブデータ1/2をコピーして保管して下さい", score);
  window.prompt ("セーブデータ2/2をコピーして保管して下さい", highscore);
  window.prompt ("不正防止コードをコピーして保管して下さい", ((score ^ 49728772) & (highscore ^ 68603839) | 73184280 * 2764));
}

function audio() {
  document.getElementById('click_audio').currentTime = 0;
  document.getElementById('click_audio').play();
}

function audio2() {
  document.getElementById('save_audio').currentTime = 0;
  document.getElementById('save_audio').play();
}

//課金カード交換
function moneyget(money) {
  if (score >= money) {
    a = window.confirm (money + "円分の課金カードと交換しますか？", "");
    if (a == true) {
      score -= money;
      alert (money + "円分の課金カードと交換しました\nこのメッセージをスクショして\nClover114514810にてTwitterでDMを下さい");
    } else {
      alert (交換をキャンセルしました);
    }
  } else {
    alert ((money - score) + "スコア足りません");
  }
}

//スコア等の反映
setInterval(() => {
  textload();
  }, 100);

//オートセーブ
setInterval(() => {
  if (autosavedata == 1) {
    save();
  }
}, 60000);
// 0=グー 1=チョキ 2=パー
// 勝敗表
// 引き分け 0
// 勝ち -1,2
// 負け -2,1

let player, playerhand, cpu, cpuhand, ans, mode, json;
let score = 0;
let autosavedata = 1;

function save() {
  let json = JSON.stringify(score, undefined, 1);
  localStorage.setItem('key',  json);
  alert ("セーブ成功");
}

function load() {
  score = localStorage.getItem('key');
  score = JSON.parse(score);
  alert ("ロード成功");
}

function savedel() {
  score = 0;
  let json = JSON.stringify(score, undefined, 1);
  localStorage.setItem('key',  json);
  alert ("セーブデータを削除しました");
}

function autosave() {
  if (autosavedata == 0) {
    autosavedata = 1;
    document.getElementById("Auto").innerHTML = "オン";
  } else if (autosavedata == 1) {
    autosavedata = 0;
    document.getElementById("Auto").innerHTML = "オフ";
  }
}

function janken(player) {
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
  } else if (ans == -1 || ans == 2) {
    alert ("【あなたの勝ち】\n2スコアアップ\nあなたの手: " + playerhand + "\nCPUの手: " + cpuhand);
    score += 2;
  } else if (ans == -2 || ans == 1) {
    alert ("【あなたの負け】\n1スコアダウン\nあなたの手: " + playerhand + "\nCPUの手: " + cpuhand);
    score -= 1;
  } else {
    alert ("想定外の数値です\nans: " + ans + "\nplayer: " + player + "\ncpu: " + cpu + "\nplayerhand: " + playerhand);
  }
  return alert;
  save();
}

function debug() {
  mode = window.prompt ("【デバッグモードを選択】\n① 変数書き換え\n② 変数表示", "半角数字で入力");
  if (mode == 1) {
    player = window.prompt ("playerの値を入力", "");
    playerhand = window.prompt ("playerhandの値を入力", "");
    cpu = window.prompt ("cpuの値を入力", "");
    cpuhand = window.prompt ("cpuhandの値を入力", "");
    ans = window.prompt ("ansの値を入力", "");
    alert ("正常に書き換えが完了しました");
  } else if (mode == 2) {
    alert ("player: " + player + "\nplayerhand: " + playerhand + "\ncpu: " + cpu + "\ncpuhand: " + cpuhand + "\nans: " + ans);
  } else {
    alert ("キャンセルしました");
  }
}

function textload() {
  document.getElementById("Score").innerHTML = score + " スコア";
}

setInterval(() => {
  textload();
  }, 100);

setInterval(() => {
  if (autosavedata == 1) {
    let json = JSON.stringify(score, undefined, 1);
    localStorage.setItem('key',  json);
    alert ("オートセーブ完了！");
  }
}, 60000);
// 0=グー 1=チョキ 2=パー
// 勝敗表
// 引き分け 0
// 勝ち -1,2
// 負け -2,1

// 通常変数定義
let player, playerhand, cpu, cpuhand, ans, data, checksum;
let score = 0;
let highscore = 0;
let autosavedata = 0;
let money = 0;
let seed = Math.floor( Math.random() * 1099511627775 );
let today = new Date();
let power = 1;
let powerdummy = 0;
let robot = 0;
let powerupcost = 100;
let robotcost = 1000;

// 0=スコア 1=ハイスコア 2=オートセーブ 3=パワー 4=ロボット 5=パワーダミー
let game = [0, 0, 1, 1, 0, 0];

// 0=パワーアップ
let cost = [100, 1000];

//シード値を16進数変換
seed = (seed).toString(16);

function getseed() {
  seed = Math.floor( Math.random() * 1099511627775 );
  seed = (seed).toString(16);
}

function save() {
  game[0] = score;
  game[1] = highscore;
  game[2] = autosavedata;
  game[3] = power;
  game[4] = robot;
  game[5] = powerdummy;
  cost[0] = powerupcost;
  cost[1] = robotcost;
  let json = JSON.stringify(game, undefined, 1);
  let json2 = JSON.stringify(cost, undefined, 1);
  localStorage.setItem('game',  json);
  localStorage.setItem('cost', json2)
  audio2 ();
  }

function load() {
  let json = localStorage.getItem('game');
  let json2 = localStorage.getItem('cost');
  let game = JSON.parse(json);
  let cost = JSON.parse(json2);
  score = game[0];
  highscore = game[1];
  autosavedata = game[2];
  power = game[3];
  robot = game[4];
  powerdummy = game[5];
  powerupcost = cost[0];
  robotcost = cost[1];
  if (autosavedata == 0) {
    document.getElementById("Auto").innerHTML = "OFF";
    document.getElementById("Autoinfo").innerHTML = "現在オートセーブは無効です";
  }
  alert ("ロード完了！\nバックアップ機能は現在調整中です\nバックアップ機能は次のアップデートまで\nしばらくお待ち下さい");
}

function savedel() {
  let a = window.confirm ("セーブデータを本当に削除しますか？\nデータはバックアップから復元可能です");
  if (a == true) {
    score = 0;
    highscore = 0;
    autosavedata = 1;
    power = 1;
    robot = 0;
    powerdummy = 0;
    powerupcost = 100;
    robotcost = 1000;
    localStorage.clear();
    game[0] = 0;
    game[1] = 0;
    game[2] = 1;
    game[3] = 1;
    game[4] = 0;
    game[5] = 0;
    cost[0] = 100;
    cost[1] = 1000;
    let json = JSON.stringify(game, undefined, 1);
    let json2 = JSON.stringify(cost, undefined, 1);
    localStorage.setItem('game',  json);
    localStorage.setItem('cost',  json2);
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
  // プレイヤーの手を文字列化
  if (player == 0) {
    playerhand = "✊";
  } else if (player == 1) {
    playerhand = "✌";
  } else if (player == 2) {
    playerhand = "✋";
  } else {
    playerhand = "unknown";
  }

  // cpuの手を文字列化
  if (cpu == 0) {
    cpuhand = "✊";
  } else if (cpu == 1) {
    cpuhand = "✌";
  } else if (cpu == 2) {
    cpuhand = "✋";
  } else {
    cpuhand = "unknown";
  }

  // 勝敗判断
  if (ans == 0) {
    alert ("【引き分け】\n" + (power) + "スコアアップ\nあなたの手: " + playerhand + "\nCPUの手: " + cpuhand);
    score += power;
    if (score >= highscore) {
      highscore = score;
    }
  } else if (ans == -1 || ans == 2) {
    alert ("【あなたの勝ち】\n" + (2*power) + "スコアアップ\nあなたの手: " + playerhand + "\nCPUの手: " + cpuhand);
    score += 2*power;
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
  document.getElementById("scorepersecond").innerHTML = (robot / 10) + " Score per second";
  document.getElementById("Poweruplvl").innerHTML = "Lv." + powerdummy;
  document.getElementById("Powerupcost").innerHTML = "コスト: " + powerupcost + " Score";
  document.getElementById("Robotlvl").innerHTML = "Lv." + robot;
  document.getElementById("Robotcost").innerHTML = "コスト: " + robotcost + " Score";
}

function importsaveSTOP() {
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

function exportsaveSTOP() {
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

// 課金カード交換
function moneyget(money) {
  if (score >= money) {
    a = window.confirm (money + "円分の課金カードと交換しますか？", "");
    if (a == true) {
      score -= money;
      getseed ();
      alert (money + "円分の課金カードと交換しました\nこのメッセージをスクショして\nClover114514810にてTwitterでDMを下さい\nSEED: " + seed + "\n" + today.getFullYear() + "/" + (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
    } else {
      alert ("交換をキャンセルしました");
    }
  } else {
    alert ((money - score) + "スコア足りません");
  }
}

// ショップ処理
function shop(shopselector) {
  if (shopselector == 0) {
    a = window.confirm ("購入しますか？\nコスト: " + powerupcost);
    if (a == true) {
      if (score >= powerupcost) {
        score -= powerupcost;
        power += 1;
        powerdummy += 1;
        powerupcost = Math.floor(1.3**(powerdummy+1)*100);
        alert ("購入成功\nパワー: " + (powerdummy-1) + "→" + powerdummy);
      } else {
        alert ((powerupcost - score) + " スコア足りません");
      }
    }
  } else if (shopselector == 1) {
    a = window.confirm ("購入しますか？\nコスト: " + robotcost);
    if (a == true) {
      if (score >= robotcost) {
        score -= robotcost;
        robot += 1;
        robotcost = Math.floor(1.15**robot*1000);
        alert ("購入成功\nロボット: " + (robot-1) + "→" + robot);
      } else {
        alert ((robotcost - score) + " スコア足りません");
      }
    }
  }
}

function cheat() {
  a = window.prompt("開発者コードを入力して下さい", "");
  if (a == "Dct9EKn7HjatC4fG3Rtcxz8N") {
    alert ("認証成功");
    score = Infinity;
    highscore = Infinity;
    game[0] = Infinity;
    game[1] = Infinity;
  } else {
    alert ("開発者コードが違います");
  }
}

// スコア等の反映
setInterval(() => {
  textload();
  }, 100);

// オートセーブ
setInterval(() => {
  if (autosavedata == 1) {
    save();
  }
}, 60000);

// ロボット
setInterval(() => {
  score += robot;
  }, 10000);

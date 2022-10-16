// 0=グー 1=チョキ 2=パー
// 勝敗表
// 引き分け 0
// 勝ち -1,2
// 負け -2,1

// 変数初期化
let player, playerhand, cpu, cpuhand, ans;
let score = 0;
let highscore = 0;
let autosavedata = 0;
let sps = 0;
let power = 1;
let powerdummy = 0;
let robot = 0;
let portal = 0;
let universe = 0;
let js = 0;
let brain;
let powerupcost = 10;
let robotcost = 100;
let portalcost = 1000;
let universecost = 10000;
let jscost = 100000;
let braincost = 1000000000000;
let HeavenChips = 0;

// 0=スコア 1=ハイスコア 2=オートセーブ 3=sps 4=ヘブンチップ
let game = [0, 0, 1, 0, 0];

// 0=パワーアップ 1=ロボット 2=ポータル 3=宇宙 4=JavaScript 5=大脳
let cost = [10, 100, 1000, 10000, 100000, 1000000000000];

// 0=パワーアップ 1=パワーアップダミー 2=ロボット 3=ポータル 4=宇宙 5=JavaScript 6=大脳
let level = [1, 0, 0, 0, 0, 0, 0];

function save() {
  game[0] = score;
  game[1] = highscore;
  game[2] = autosavedata;
  game[3] = sps;
  game[4] = HeavenChips;
  cost[0] = powerupcost;
  cost[1] = robotcost;
  cost[2] = portalcost;
  cost[3] = universecost;
  cost[4] = jscost;
  cost[5] = braincost;
  level[0] = power;
  level[1] = powerdummy;
  level[2] = robot;
  level[3] = portal;
  level[4] = universe;
  level[5] = js;
  level[6] = brain;
  let json = JSON.stringify(game, undefined, 1);
  let json2 = JSON.stringify(cost, undefined, 1);
  let json3 = JSON.stringify(level, undefined, 1);
  localStorage.setItem('game', json);
  localStorage.setItem('cost', json2);
  localStorage.setItem('level', json3);
  audio2 ();
  }

function load() {
  let json = localStorage.getItem('game');
  let json2 = localStorage.getItem('cost');
  let json3 = localStorage.getItem('level');
  let game = JSON.parse(json);
  let cost = JSON.parse(json2);
  let level = JSON.parse(json3);
  score = game[0];
  highscore = game[1];
  autosavedata = game[2];
  sps = game[3];
  HeavenChips = game[4];
  powerupcost = cost[0];
  robotcost = cost[1];
  portalcost = cost[2];
  universecost = cost[3];
  jscost = cost[4];
  braincost = cost[5];
  power = level[0];
  powerdummy = level[1];
  robot = level[2];
  portal = level[3];
  universe = level[4];
  js = level[5];
  brain = level[6];
  
  if (autosavedata == 0) {
    document.getElementById("Auto").innerHTML = "OFF";
    document.getElementById("Autoinfo").innerHTML = "現在オートセーブは無効です";
  }
  alert ("ロード完了！");
}

function savedel() {
  let a = window.confirm ("セーブデータを本当に削除しますか？\n削除したデータは元に戻せません");
  if (a == true) {
    score = 0;
    highscore = 0;
    autosavedata = 1;
    power = 1;
    robot = 0;
    powerdummy = 0;
    portal = 0;
    universe = 0;
    js = 0;
    brain = 0;
    powerupcost = 10;
    robotcost = 100;
    portalcost = 1000;
    universecost = 10000;
    jscost = 100000;
    braincost = 1000000000000;
    sps = 0;
    HeavenChips = 0;
    localStorage.clear();
    game[0] = 0;
    game[1] = 0;
    game[2] = 1;
    game[3] = 0;
    game[4] = 0;
    cost[0] = 10;
    cost[1] = 100;
    cost[2] = 1000;
    cost[3] = 10000;
    cost[4] = 100000;
    cost[5] = 1000000000000;
    level[0] = 1;
    level[1] = 0;
    level[2] = 0;
    level[3] = 0;
    level[4] = 0;
    level[5] = 0;
    level[6] = 0;
    let json = JSON.stringify(game, undefined, 1);
    let json2 = JSON.stringify(cost, undefined, 1);
    let json3 = JSON.stringify(level, undefined, 1);
    localStorage.setItem('game',  json);
    localStorage.setItem('cost',  json2);
    localStorage.setItem('level',  json3);
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
  let rndm = Math.floor( Math.random() * (101 - 1) + 1 );
  if (rndm == 1) {
    document.getElementById('dyd').currentTime = 0;
    document.getElementById('dyd').play();
  } else {
    audio();
  }
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
  } else if (ans == -1 || ans == 2) {
    alert ("【あなたの勝ち】\n" + (2*power) + "スコアアップ\nあなたの手: " + playerhand + "\nCPUの手: " + cpuhand);
    score += 2*power;
  } else if (ans == -2 || ans == 1) {
    alert ("【あなたの負け】\n1スコアダウン\nあなたの手: " + playerhand + "\nCPUの手: " + cpuhand);
    score -= 1;
    if (score <= 0) {
      score = 0;
    }
  } else {
    alert ("想定外の数値です\nans: " + ans + "\nplayer: " + player + "\ncpu: " + cpu + "\nplayerhand: " + playerhand);
  }
}

function textload() {
  if (score >= highscore) {
    highscore = score;
  }
  document.getElementById("Score").innerHTML = "スコア: " + score.toFixed(1);
  document.getElementById("HighScore").innerHTML = "ハイスコア: " + highscore.toFixed(1);
  document.getElementById("scorepersecond").innerHTML = "Score per second: " + Math.floor(sps*10);
  document.getElementById("HeavenChips").innerHTML = "HeavenChips: " + HeavenChips;
  document.getElementById("Poweruplvl").innerHTML = "Lv." + (powerdummy+1);
  document.getElementById("Powerupcost").innerHTML = "コスト: " + powerupcost + " Score";
  document.getElementById("Robotlvl").innerHTML = "Lv." + robot;
  document.getElementById("Robotcost").innerHTML = "コスト: " + robotcost + " Score";
  document.getElementById("Portallvl").innerHTML = "Lv." + portal;
  document.getElementById("Portalcost").innerHTML = "コスト: " + portalcost + " Score";
  document.getElementById("Universelvl").innerHTML = "Lv." + universe;
  document.getElementById("Universecost").innerHTML = "コスト: " + universecost + " Score";
  document.getElementById("JSlvl").innerHTML = "Lv." + js;
  document.getElementById("JScost").innerHTML = "コスト: " + jscost + " Score";
  document.getElementById("Brainlvl").innerHTML = "Lv." + brain;
  document.getElementById("Braincost").innerHTML = "コスト: " + braincost + " Score";
}

function audio() {
  document.getElementById('click_audio').currentTime = 0;
  document.getElementById('click_audio').play();
}

function audio2() {
  document.getElementById('save_audio').currentTime = 0;
  document.getElementById('save_audio').play();
}

function audioyjsp() {
  document.getElementById('yjsp').currentTime = 0;
  document.getElementById('yjsp').play();
}

function stopbgm() {
  document.getElementById('inm_bgm').pause();
  document.getElementById('inm_bgm').currentTime = 0;
  document.getElementById('dyd_bgm').pause();
  document.getElementById('dyd_bgm').currentTime = 0;
  document.getElementById('am223_bgm').pause();
  document.getElementById('am223_bgm').currentTime = 0;
  document.getElementById('hirusagari_bgm').pause();
  document.getElementById('hirusagari_bgm').currentTime = 0;
  document.getElementById('oikakeko_bgm').pause();
  document.getElementById('oikakeko_bgm').currentTime = 0;
}

function playbgm() {
  let BGM = document.getElementById('BGMID');
  if (BGM.value == "inm") {
    stopbgm();
    document.getElementById('inm_bgm').play();
    document.getElementById('inm_bgm').loop = true;
  } else if (BGM.value == "dyd") {
    stopbgm();
    document.getElementById('dyd_bgm').play();
    document.getElementById('dyd_bgm').loop = true;
  } else if (BGM.value == "am223") {
    stopbgm();
    document.getElementById('am223_bgm').play();
    document.getElementById('dyd_bgm').loop = true;
  } else if (BGM.value == "hirusagari") {
    stopbgm();
    document.getElementById('hirusagari_bgm').play();
    document.getElementById('hirusagari_bgm').loop = true;
  } else if (BGM.value == "oikakeko") {
    stopbgm();
    document.getElementById('oikakeko_bgm').play();
    document.getElementById('oikakeko_bgm').loop = true;
  } else if (BGM.value == "none") {
    stopbgm();
  }
}

// ショップ処理
function shop(shopselector) {
  if (shopselector == 0) {
    a = window.confirm ("パワーアップを購入しますか？\nコスト: " + powerupcost + "\n勝利・引き分けの獲得スコアが1増える\n\n【説明】\n力が湧いてくる");
    if (a == true) {
      if (score >= powerupcost) {
        score -= powerupcost;
        power += 1;
        powerdummy += 1;
        powerupcost = Math.floor(1.5**(powerdummy+1)*10);
        alert ("購入成功\nパワー: " + (power-1) + "→" + power);
      } else {
        alert ((powerupcost - score) + " スコア足りません");
      }
    }
  } else if (shopselector == 1) {
    a = window.confirm ("ロボットを購入しますか？\nコスト: " + robotcost + "\nSps: 1\n\n【説明】\n永遠に自動でスコアを稼いでくれます");
    if (a == true) {
      if (score >= robotcost) {
        score -= robotcost;
        robot += 1;
        robotcost = Math.floor(1.15**robot*100);
        alert ("購入成功\nロボット: " + (robot-1) + "→" + robot);
      } else {
        alert ((robotcost - score) + " スコア足りません");
      }
    }
  } else if (shopselector == 2) {
    a = window.confirm ("ポータルを購入しますか？\nコスト: " + portalcost + "\nSps: 10\n\n【説明】\n異世界からスコアを取り出してきます");
    if (a == true) {
      if (score >= portalcost) {
        score -= portalcost;
        portal += 1;
        portalcost = Math.floor(1.15**portal*1000);
        alert ("購入成功\nポータル: " + (portal-1) + "→" + portal);
      } else {
        alert ((portalcost - score) + " スコア足りません");
      }
    }
  } else if (shopselector == 3) {
    a = window.confirm ("宇宙を購入しますか？\nコスト: " + universecost + "\nSps: 1000\n\n【説明】\n宇宙の全物質をスコアに変換する");
    if (a == true) {
      if (score >= universecost) {
        score -= universecost;
        universe += 1;
        universecost = Math.floor(1.15**universe*10000);
        alert ("購入成功\n宇宙: " + (universe-1) + "→" + universe);
      } else {
        alert ((universecost - score) + " スコア足りません");
      }
    }
  } else if (shopselector == 4) {
    a = window.confirm ("JavaScriptを購入しますか？\nコスト: " + jscost + "\nSps: 10000\n\n【説明】\nこのゲームのJavaScriptコードを書き換えて\nスコアを作り出す (メタの領域)");
    if (a == true) {
      if (score >= jscost) {
        score -= jscost;
        js += 1;
        jscost = Math.floor(1.3**js*100000);
        alert ("購入成功\nJavaScript: " + (js-1) + "→" + js);
      } else {
        alert ((jscost - score) + " スコア足りません");
      }
    }
  } else if (shopselector == 5) {
    a = window.confirm ("大脳を購入しますか？\nコスト: " + braincost + "\nSps: 10000000000\n\n【説明】\n大脳が想像した物を全てスコアに変換する");
    if (a == true) {
      if (score >= braincost) {
        score -= braincost;
        brain += 1;
        braincost = Math.floor(3**brain*1000000000000);
        alert ("購入成功\n大脳: " + (brain-1) + "→" + brain);
      } else {
        alert ((braincost - score) + " スコア足りません");
      }
    }
  }
}

function cheat() {
  a = window.prompt("開発者コードを入力して下さい", "");
  if (a == "Dct9EKn7HjatC4fG3Rtcxz8N") {
    alert ("認証成功");
    score = 9000000000000;
    game[0] = 9000000000000;
  } else {
    alert ("開発者コードが違います");
  }
}

function spsload() {
  sps = Spsto(robot) + Spsto(portal*10) + Spsto(universe*1000) + Spsto(js*10000) + Spsto(brain*10000000000);
  score += sps;
}

function Spsto (number) {
  if (HeavenChips <= 0) {
    number = number/10;
    return number;
  } else {
    number = number/10*(HeavenChips*10);
    return number;
  }
}

function tensei() {
  if (sps*10 >= 100000*(HeavenChips+1)*2) {
  a = window.confirm ("転生するとHeavenChipsが獲得できます\nHeavenChipsは来世の施設効率がアップします\nその代わりに今のセーブデータが\nリセットされます");
  if (a == true) {
    audioyjsp();
    // データを削除
    score = 0;
    highscore = 0;
    autosavedata = 1;
    power = 1;
    robot = 0;
    powerdummy = 0;
    portal = 0;
    universe = 0;
    js = 0;
    powerupcost = 10;
    robotcost = 100;
    portalcost = 1000;
    universecost = 10000;
    jscost = 100000;
    sps = 0;
    localStorage.clear();
    game[0] = 0;
    game[1] = 0;
    game[2] = 1;
    game[3] = 0;
    cost[0] = 10;
    cost[1] = 100;
    cost[2] = 1000;
    cost[3] = 10000;
    cost[4] = 100000;
    level[0] = 1;
    level[1] = 0;
    level[2] = 0;
    level[3] = 0;
    level[4] = 0;
    level[5] = 0;
    let json = JSON.stringify(game, undefined, 1);
    let json2 = JSON.stringify(cost, undefined, 1);
    let json3 = JSON.stringify(level, undefined, 1);
    localStorage.setItem('game',  json);
    localStorage.setItem('cost',  json2);
    localStorage.setItem('level',  json3);
    // 転生の処理
    HeavenChips += 1;
    alert ("転生しました\n合計HeavenChips: " + HeavenChips);
    save();
  }
  } else {
    alert ("転生するにはSpsが" + 100000*(HeavenChips+1)*2 + "以上必要です");
  }
}

// スコア等の反映
setInterval(() => {
  textload();
  spsload();
  }, 100);

// オートセーブ
setInterval(() => {
  if (autosavedata == 1) {
    save();
  }
}, 60000);
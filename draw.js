var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var player_count = "O";
var player = document.getElementById("player");
var xplayer = document.getElementById("x_line");
var oplayer = document.getElementById("o_line");
var sqrt_i = Infinity;
var width_unit = c.width / 11;
var height_unit = c.height / 11;
var unit = c.height / 11;

var xline = 0;
var oline = 0;
var step_count = 0;

function setborad() {
  arr = new Array(9);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(3);
    for (var j = 0; j < arr[i].length; j++) {
      arr[i][j] = new Array(3);
      for (var k = 0; k < arr[i][j].length; k++) {
        arr[i][j][k] = "";
      }
    }
  }
  return arr;
}

function randomsetborad() {
  arr = new Array(9);
  var items = Array("X", "O");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(3);
    for (var j = 0; j < arr[i].length; j++) {
      arr[i][j] = new Array(3);
      for (var k = 0; k < arr[i][j].length; k++) {
        arr[i][j][k] = items[Math.floor(Math.random() * items.length)];
      }
    }
  }
  borad[8][2][2] = "";
  return arr;
}

function seticount() {
  arr = new Array(9);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = 0;
  }
  return arr;
}

function draw_table() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, c.width, c.height);

  for (let x = 0; x < c.width; x += width_unit) {
    ctx.strokeStyle = "#f55";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, c.height);
    ctx.stroke();
  }
  for (let y = 0; y < c.height; y += height_unit) {
    ctx.strokeStyle = "#f55";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(c.width, y);
    ctx.stroke();
  }

  for (let x = 2 * width_unit; x < c.width - width_unit; x += width_unit) {
    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x, height_unit);
    ctx.lineTo(x, c.height - height_unit);
    ctx.stroke();
  }

  for (let y = 2 * height_unit; y < c.height - height_unit; y += height_unit) {
    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(width_unit, y);
    ctx.lineTo(c.width - width_unit, y);
    ctx.stroke();
  }

  for (
    let x = 4 * width_unit;
    x < c.width - 3 * width_unit;
    x += 3 * width_unit
  ) {
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(x, height_unit);
    ctx.lineTo(x, c.height - height_unit);
    ctx.stroke();
  }

  for (
    let y = 4 * height_unit;
    y < c.height - 3 * height_unit;
    y += 3 * height_unit
  ) {
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(width_unit, y);
    ctx.lineTo(c.width - width_unit, y);
    ctx.stroke();
  }
}

function draw_chese(sqrt_x, sqrt_y) {
  var r = (height_unit / 10) * 4;
  for (var i = 0; i < borad.length; i++) {
    for (var j = 0; j < borad[i].length; j++) {
      for (var k = 0; k < borad[i][j].length; k++) {
        x = (i % 3) * 3 * width_unit + (j + 1) * width_unit + width_unit / 2;
        y =
          Math.floor(i / 3) * 3 * height_unit +
          (k + 1) * height_unit +
          height_unit / 2;

        if (borad[i][j][k] == "O") {
          ctx.beginPath();
          ctx.arc(x, y, r, 0, 2 * Math.PI, false);
          ctx.lineWidth = 3;
          ctx.strokeStyle = "#FF0000";
          ctx.stroke();
        } else if (borad[i][j][k] == "X") {
          ctx.beginPath();
          ctx.moveTo(x - unit * 0.3, y - unit * 0.3);
          ctx.lineTo(x + unit * 0.3, y + unit * 0.3);
          ctx.moveTo(x + unit * 0.3, y - unit * 0.3);
          ctx.lineTo(x - unit * 0.3, y + unit * 0.3);
          ctx.lineWidth = 3;
          ctx.strokeStyle = "#0000FF";
          ctx.stroke();
        }
      }
    }
  }
  sqrt_i = sqrt_x + sqrt_y * 3;
  if (i_count[sqrt_i] < 9) {
    sqrt_x = (sqrt_i % 3) * 3 * unit + 1.25 * unit;
    sqrt_y = Math.floor(sqrt_i / 3) * 3 * unit + 1.25 * unit;
    ctx.beginPath();
    ctx.strokeStyle = "#00FF00";
    ctx.strokeRect(sqrt_x, sqrt_y, 2.5 * unit, 2.5 * unit);
    ctx.lineWidth = 3;
    // console.log(sqrt_x);
    ctx.stroke();
    i_count[sqrt_i]++;
  } else {
    sqrt_i = Infinity;
  }
}

function check_borad(event) {
  var rect = event.target.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;

  // console.log(unit);
  // console.log(x);
  // console.log(y);

  //   ctx.beginPath();
  //   ctx.strokeStyle = "#FF00FF";
  //   ctx.strokeRect(x, y, unit, unit);
  //   ctx.lineWidth = 3;
  //   ctx.stroke();

  var i =
    Math.floor((x - width_unit) / (3 * width_unit)) +
    Math.floor((y - height_unit) / (3 * height_unit)) * 3;
  x = Math.floor((x - width_unit - (i % 3) * (3 * width_unit)) / width_unit);
  y = Math.floor(
    (y - height_unit - Math.floor(i / 3) * (3 * height_unit)) / height_unit
  );

  // console.log(i);
  // console.log(x);
  // console.log(y);
  if (i == sqrt_i || sqrt_i == Infinity) {
    if (borad[i][x][y] == "") {
      borad[i][x][y] = player_count;
      // console.log(borad);
      draw_table();
      draw_chese(x, y);
      check_three();
      // write_data(i, x, y);

      if (player_count == "X") {
        player_count = "O";
      } else if (player_count == "O") {
        player_count = "X";
      }
      step_count++;
      if (step_count == 81) {
        check_win(user_name);
      }
      player.innerHTML = "<h1>Player: " + player_count + "</h1>";
    }
  }
}

function check_three() {
  xline = oline = 0;
  //打直
  for (var i = 0; i < borad.length; i++) {
    for (var j = 0; j < borad[i].length; j++) {
      if (borad[i][j][0] != "") {
        if (
          borad[i][j][0] == borad[i][j][1] &&
          borad[i][j][0] == borad[i][j][2]
        ) {
          // console.log('hi');
          ctx.beginPath();
          if (borad[i][j][0] == "X") {
            ctx.strokeStyle = "#00FFFF";
            xline++;
          } else if (borad[i][j][0] == "O") {
            ctx.strokeStyle = "#FF00FF";
            oline++;
          }
          var x =
            (i % 3) * 3 * width_unit + (j + 1) * width_unit + width_unit / 2;
          var y =
            Math.floor(i / 3) * 3 * height_unit +
            (0 + 1) * height_unit +
            height_unit / 2;

          ctx.moveTo(x, y - 0.25 * unit);
          ctx.lineTo(x, y + 2 * unit + 0.25 * unit);
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }
    }
  }
  //打橫
  for (var i = 0; i < borad.length; i++) {
    for (var k = 0; k < borad[k].length; k++) {
      if (borad[i][0][k] != "") {
        if (
          borad[i][0][k] == borad[i][1][k] &&
          borad[i][0][k] == borad[i][2][k]
        ) {
          // console.log('hi');
          ctx.beginPath();
          if (borad[i][0][k] == "X") {
            ctx.strokeStyle = "#00FFFF";
            xline++;
          } else if (borad[i][0][k] == "O") {
            ctx.strokeStyle = "#FF00FF";
            oline++;
          }
          var x =
            (i % 3) * 3 * width_unit + (0 + 1) * width_unit + width_unit / 2;
          var y =
            Math.floor(i / 3) * 3 * height_unit +
            (k + 1) * height_unit +
            height_unit / 2;

          ctx.moveTo(x - 0.25 * unit, y);
          ctx.lineTo(x + 2 * unit + 0.25 * unit, y);
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }
    }
  }
  //左上右下
  for (var i = 0; i < borad.length; i++) {
    if (borad[i][0][0] != "") {
      if (
        borad[i][0][0] == borad[i][1][1] &&
        borad[i][0][0] == borad[i][2][2]
      ) {
        ctx.beginPath();
        if (borad[i][0][0] == "X") {
          ctx.strokeStyle = "#00FFFF";
          xline++;
        } else if (borad[i][0][0] == "O") {
          ctx.strokeStyle = "#FF00FF";
          oline++;
        }
        var x =
          (i % 3) * 3 * width_unit + (0 + 1) * width_unit + width_unit / 2;
        var y =
          Math.floor(i / 3) * 3 * height_unit +
          (0 + 1) * height_unit +
          height_unit / 2;

        ctx.moveTo(x - 0.25 * unit, y - 0.25 * unit);
        ctx.lineTo(x + 2 * unit + 0.25 * unit, y + 2 * unit + 0.25 * unit);
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    }
  }
  //右上左下
  for (var i = 0; i < borad.length; i++) {
    if (borad[i][2][0] != "") {
      if (
        borad[i][2][0] == borad[i][1][1] &&
        borad[i][2][0] == borad[i][0][2]
      ) {
        ctx.beginPath();
        if (borad[i][2][0] == "X") {
          ctx.strokeStyle = "#00FFFF";
          xline++;
        } else if (borad[i][2][0] == "O") {
          ctx.strokeStyle = "#FF00FF";
          oline++;
        }
        var x =
          (i % 3) * 3 * width_unit + (0 + 1) * width_unit + width_unit / 2;
        var y =
          Math.floor(i / 3) * 3 * height_unit +
          (0 + 1) * height_unit +
          height_unit / 2;

        ctx.moveTo(x + 2 * unit + 0.25 * unit, y - 0.25 * unit);
        ctx.lineTo(x - 0.25 * unit, y + 2 * unit + 0.25 * unit);
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    }
  }
  xplayer.innerHTML = "X: " + xline;
  oplayer.innerHTML = "O: " + oline;
}

function check_win(user_name) {
  if (xline > oline) {
    console.log("X win!!");
  } else {
    if (oline > xline) {
      console.log("O win!!");
    } else {
      console.log("Tie!!");
    }
  }
  db.ref("users/" + user_name).on("value", function(snapshot) {
    console.log(snapshot.val().score);
    if (oline > snapshot.val().score) {
      write_data(user_name, oline);
    }
  });
}

function write_data(name, oline) {
  var updates = {};
  updates["users/" + name + "/score"] = oline;
  db.ref().update(updates);
  show_data();
}

function show_data() {
  // db.ref("users/").on("value", function(snapshot) {
  //   console.log(snapshot.val());
  // });
  db.ref("users/").on("value", function(snapshot) {
    keys = Object.keys(snapshot.val());
    values = Object.values(snapshot.val());
    dict2 = [];
    for (let i = 0; i < keys.length; i++) {
      // var score = exist_users[i]["score"];
      // console.log(keys[i]);
      // console.log(values[i]['score']);
      dict2.push({
        user_name: keys[i],
        score: values[i]["score"]
      });
    }
    // console.log(dict2);

    dict2 = dict2.sort(function(a, b) {
      return a.score < b.score ? 1 : -1;
    });
    // console.log(dict2);

    var x = "<tr><th><h1>User</h1></th><th><h1>Score</h1></th></tr>";
    for (let i = 0; i < dict2.length - 1; i++) {
      // var score = exist_users[i]["score"];
      // console.log(keys[i]);
      // console.log(values[i]["score"]);
      if (i < 3) {
        x +=
          "<tr><td class='top3'><h2>" +
          dict2[i].user_name +
          "</h2></td><td class='top3'><h2>" +
          dict2[i].score +
          "</h2></td></tr>";
      } else {
        x +=
          "<tr><td><h2>" +
          dict2[i].user_name +
          "</h2></td><td><h2>" +
          dict2[i].score +
          "</h2></td></tr>";
      }
    }
    x += "</table>";
    document.getElementById("data").innerHTML = x;
  });
}

// function show_data(data_val) {
//   keys = Object.keys(data_val);
//   msgs = "";

//   for (var i = keys.length - 1; i >= 0; i--) {
//     msgs +=
//       data_val[keys[i]]["i_step"] + ": " + data_val[keys[i]]["x_step"] + "<br>";
//   }
//   // $("#data").html(msgs);
//   console.log(msgs);
// }
/*$(document).ready(function() {
  $("#push_test").click(function() {
    var name = $("#push_name").val();
    var msg = $("#push_msg").val();
    push(name, msg);
  });
  function display_msgs(data_val) {
    keys = Object.keys(data_val);
    msgs = "";

    for (var i = keys.length - 1; i >= 0; i--) {
      msgs +=
        data_val[keys[i]]["username"] +
        ": " +
        data_val[keys[i]]["message"] +
        "<br>";
    }
    $("#data").html(msgs);
  }
  db.ref("message/").on("value", function(snapshot) {
    display_msgs(snapshot.val());
  });
});*/

var borad = setborad();
// var borad = randomsetborad();
console.log(borad);
var i_count = seticount();
console.log(i_count);
// borad[4][0][0] = borad[4][0][1] = borad[4][0][2] = borad[4][1][0] = borad[4][1][2] = borad[4][2][0] = borad[4][2][1] = borad[4][2][2] = 'O';
// borad[1][0][0] = borad[1][1][1] = borad[1][2][2] = 'X';
// borad[5][2][0] = borad[5][1][1] = borad[5][0][2] = 'O';
// borad[8][2][2] = '';

// check_three();

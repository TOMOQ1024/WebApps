(() => {
  const rootPath = getFileRef("Tetris", "root");
  const width = 10;
  const height = 20;
  let cvs;
  let menu;
  let count;
  let img = new Image();
  let shapes = {};
  let ids = ["i", "j", "l", "o", "s", "t", "z"];
  let next = [];//  5 int elements
  let hold;//  int
  let level, score;
  let x0, y0;
  let v = (x, y) => ({ x: x, y: y });
  let r;//  rotate
  let s;//  sum
  let cells = [];
  let Tcrnt;
  let Tghost;
  let touch;
  let itv0;
  let itv;
  let acc = 0;
  let mode;
  /*
    "w":wait
    "p":play
    "d":delete lines
    "b":break(pause)
  */



  const WR = [
    document.createElement("div"),
    document.createElement("div"),
    document.createElement("div"),
    document.createElement("div")
  ];

  WR[0].className = "cvs-single";

  WR[1].style.whiteSpace = "normal";

  WR[0].id = "wrapper";
  WR[1].id = "lmenu_wrapper";
  WR[2].id = "cvs_wrapper";
  WR[3].id = "rmenu_wrapper";

  WR[0].style.display = "inline-block";
  WR[1].style.display = "inline-block";
  WR[2].style.display = "inline-block";
  WR[3].style.display = "inline-block";

  document.querySelector("#main").appendChild(WR[0]);
  WR[0].appendChild(WR[1]);
  WR[0].appendChild(WR[2]);
  WR[0].appendChild(WR[3]);

  let LEN = Math.round(Math.min(window.innerWidth / (6 + width + 1 + 6), (window.innerHeight - 100) / (height + 1)) * 0.95);
  //  divの設定
  {
    WR[0].style.backgroundImage = `url(${rootPath}assets/e0e0e0-c.png)`;
    WR[0].style.backgroundSize = 50/(6 + width+1 + 6)+"% "+50/(height+1)+"%";
    WR[0].style.width = LEN*(6 + width+1 + 6)+"px";
    WR[0].style.height = LEN*(height+1)+"px";
    WR[1].style.verticalAlign = "top";
    WR[1].style.width = LEN*6+"px";
    WR[1].style.height = LEN*(height+1)+"px";
    WR[2].style.verticalAlign = "top";
    WR[2].style.width = LEN*(width+1)+"px";
    WR[2].style.height = LEN*(height+1)+"px";
    WR[3].style.verticalAlign = "top";
    WR[3].style.width = LEN*6+"px";
    WR[3].style.height = LEN*(height+1)+"px";
  }
  //  二次元連想配列
  cvs = {
    l0: {
      ele: document.createElement("canvas"),
      wr: WR[1],
      w: 5,
      h: 5
    },
    l1: {
      ele: document.createElement("canvas"),
      wr: WR[1],
      w: 5,
      h: 2
    },
    l2: {
      ele: document.createElement("canvas"),
      wr: WR[1],
      w: 5,
      h: 2
    },
    l3: {
      ele: document.createElement("canvas"),
      wr: WR[1],
      w: 5,
      h: 5
    },
    c0: {
      ele: document.createElement("canvas"),
      wr: WR[2],
      w: width,
      h: height
    },
    r0: {
      ele: document.createElement("canvas"),
      wr: WR[3],
      w: 5,
      h: (height - 3)
    }
  };
  for (let k in cvs) {
    cvs[k].ctx = cvs[k].ele.getContext("2d");
    cvs[k].ele.style.margin = `${LEN/2}px`;
    cvs[k].ele.style.backgroundImage = `url(${rootPath}assets/000020-o.png)`;
    cvs[k].ele.style.backgroundSize = LEN / (k.match(/.[^0]/) ? 2 : 1) + "px";
    if (k.match(/[^c]0/))
      cvs[k].ele.style.backgroundPosition = LEN / 2 + "px " + LEN / 2 + "px";

    cvs[k].ele.width = LEN * cvs[k].w;
    cvs[k].ele.height = LEN * cvs[k].h;

    cvs[k].ctx.fillStyle = "#00ffff";
    cvs[k].ctx.font = LEN + "px serif";
    cvs[k].ctx.textAlign = "center";
    cvs[k].ctx.textBaseline = "middle";

    cvs[k].wr.append(cvs[k].ele);
  }




  function Tetromino(id, x, y) {
    let self = this;
    self.x = x;
    self.y = y;
    self.id = id;
    self.t = [];
    for (let i = 0; i < 4; i++) {
      self.t.push(shapes[ids[id]][i]);
    }
    self.tile = (i) => ({ x: self.t[i].x + self.x, y: self.t[i].y + self.y });
    self.update = () => {
      let bool = 1;
      for (let i = 0; i < 4; i++) {
        if (self.tile(i).y === 19) {
          bool = 0;
          break;
        }
        if (-1 <= self.tile(i).y) {
          if (cells[self.tile(i).y + 1][self.tile(i).x] !== -1) {
            bool = 0;
            break;
          }
        }
      }
      if (bool) {
        self.y++;
        for (let i = 0; i < 4; i++)self.tile(i).y += 1;
      } else {
        for (let i = 0; i < 4; i++) {
          if (self.tile(i).y < 0) bool = 1;
        }
        if (bool) {
          Gameover();
        } else {
          for (let i = 0; i < 4; i++) {
            cells[self.tile(i).y][self.tile(i).x] = self.id;
          }
          mode = "d";
          hold[0] = 0;
          Render();
          DeleteLines();
        }
      }
      self.gupdate();
    }
    self.gupdate = () => {
      for (let i = 0; i <= height - self.y; i++) {
        let bool = 1;
        for (let j = 0; j < 4; j++) {
          X = self.tile(j).x;
          Y = self.tile(j).y + i;
          if (Y < 0) {
            continue;
          }
          if (height <= Y) {
            bool = 0;
            break;
          }
          if (cells[Y][X] !== -1) {
            //console.log(X,Y);
            bool = 0;
            break;
          }
        }
        if (!bool) {
          Tghost.y = self.y + i - 1;
          break;
        }
      }
    }
  }




  window.onload = () => {
    Init();
    Main();

    window.onkeydown = (e) => {
      if (mode === "p") {
        let k = e.key;
        //console.log(k);
        if (k === "s") Ctrl("c");
        if (k === "f") Ctrl("a");
        if (k === "j") Ctrl("l");
        if (k === "l") Ctrl("r");
        if (k === " ") Ctrl("d");
        if (k === "d") Ctrl("h");
        if (k === "k") acc = 1;
      }
    }
    window.onkeyup = (e) => {
      let k = e.key;
      if (k === "k") acc = 0;
    }

    //  スマホ操作
    //  https://dianxnao.com/javascript%E3%81%A7%E3%82%B9%E3%83%AF%E3%82%A4%E3%83%97%E5%87%A6%E7%90%86%E3%82%92%E3%81%99%E3%82%8B/
    window.addEventListener("touchstart", function (e) {
      e.preventDefault();
      touch[0] = e.touches[0].pageX;
      touch[1] = e.touches[0].pageY;
      touch[2] = e.touches[0].pageX;
      touch[3] = e.touches[0].pageY;
    });
    window.addEventListener("touchmove", function (e) {
      e.preventDefault();
      touch[2] = e.touches[0].pageX;
      touch[3] = e.touches[0].pageY;
      if (
        (touch[3] - touch[1] > LEN * 3)
        && (Math.abs(touch[2] - touch[0]) < LEN * 3)
      ) {
        console.log(acc);
        acc = 1;
      } else {
        acc = 0;
      }
    });
    window.addEventListener("touchend", function (e) {
      console.log("touch");
      console.log(touch);
      if (touch[2] - touch[0] > LEN * 3) {
        //  >
        if (touch[1] - touch[3] > LEN * 3) Ctrl("a");
        else if (touch[3] - touch[1] > LEN * 3) false;
        else Ctrl("r");
      } else if (touch[0] - touch[2] > LEN * 3) {
        //  <
        if (touch[1] - touch[3] > LEN * 3) Ctrl("c");
        else if (touch[3] - touch[1] > LEN * 3) false;
        else Ctrl("l");
      } else if (touch[1] - touch[3] > LEN * 3) Ctrl("h");
      else if (touch[3] - touch[1] > LEN * 3) Ctrl("d");
      touch = [0, 0, 0, 0];
      acc = 0;
    });
  }


  function Init() {
    count = 0;
    mode = "w";
    img.src = rootPath + "assets/Tetris.png";
    x0 = 5;
    y0 = -5;
    cells = [];
    shapes = {
      i: [v(0, -2), v(0, -1), v(0, 0), v(0, 1)],
      j: [v(0, -1), v(0, 0), v(0, 1), v(-1, 1)],
      l: [v(0, -1), v(0, 0), v(0, 1), v(1, 1)],
      o: [v(-1, -1), v(0, -1), v(-1, 0), v(0, 0)],
      s: [v(0, -1), v(1, -1), v(-1, 0), v(0, 0)],
      t: [v(0, -1), v(-1, 0), v(0, 0), v(1, 0)],
      z: [v(-1, -1), v(0, -1), v(0, 0), v(1, 0)]
    };
    next = [
      Math.floor(Math.random() * 7),
      Math.floor(Math.random() * 7),
      Math.floor(Math.random() * 7),
      Math.floor(Math.random() * 7),
      Math.floor(Math.random() * 7)
    ]
    hold = [0, -1];
    level = 1;
    score = 0;
    lines = 0;
    touch = [0, 0, 0, 0];
    itv0 = 100;
    itv = itv0;
    acc = 0;

    r = (V) => v(V.y, -V.x);
    s = (V1, V2) => v(V1.x + V2.x, V1.y + V2.y);
    for (let y = 0; y < height; y++) {
      cells.push([]);
      for (let x = 0; x < width; x++) {
        cells[y].push(-1);
      }
    }
    Main();
  }


  function Update() {
    if (mode === "w") {
      //console.log("reset");
      Tghost = new Tetromino(next[0], x0, y0);
      Tcrnt = new Tetromino(next.shift(), x0, y0);
      next.push(Math.floor(Math.random() * 7));
      mode = "p";
    }
    if (mode === "p") {
      //  play
      Tcrnt.update();
    }
  }


  function Render() {
    //  menu
    {
      cvs.l0.ctx.fillText("HOLD", LEN * 2.5, LEN / 2);
      cvs.l1.ctx.fillText("LEVEL", LEN * 2.5, LEN / 2);
      cvs.l2.ctx.fillText("SCORE", LEN * 2.5, LEN / 2);
      cvs.r0.ctx.fillText("NEXT", LEN * 2.5, LEN / 2);
      //  hold
      if (hold[1] >= 0) {
        let hshapes = {
          i: [v(0, -2), v(0, -1), v(0, 0), v(0, 1)],
          j: [v(0, -1), v(0, 0), v(0, 1), v(-1, 1)],
          l: [v(0, -1), v(0, 0), v(0, 1), v(1, 1)],
          o: [v(-1, -1), v(0, -1), v(-1, 0), v(0, 0)],
          s: [v(0, -1), v(1, -1), v(-1, 0), v(0, 0)],
          t: [v(0, -1), v(-1, 0), v(0, 0), v(1, 0)],
          z: [v(-1, -1), v(0, -1), v(0, 0), v(1, 0)]
        };
        for (let j = 0; j < 7; j++) {
          for (let k = 0; k < 4; k++) {
            if (j === 0 || j === 1 || j === 3) {
              hshapes[ids[j]][k] = r(r(r(hshapes[ids[j]][k])));
            } else if (j === 2) {
              hshapes[ids[j]][k] = r(hshapes[ids[j]][k]);
            }
          }
        }
        let shape = hshapes[ids[hold[1]]];
        for (let j = 0; j < 4; j++) {
          Draw(cvs.l0.ctx, hold[1], 1.5 + shape[j].x, 2.5 + shape[j].y);
          if (hold[0]) Draw(cvs.l0.ctx, 7, 1.5 + shape[j].x, 2.5 + shape[j].y);
        }
      }
      //  level
      {
        cvs.l1.ctx.fillStyle = "#fff";
        cvs.l1.ctx.fillText(level, LEN * 2.5, LEN * 3 / 2);
        cvs.l1.ctx.fillStyle = "#0ff";
      }
      //  score
      {
        cvs.l2.ctx.fillStyle = "#fff";
        cvs.l2.ctx.fillText(score, LEN * 2.5, LEN * 3 / 2);
        cvs.l2.ctx.fillStyle = "#0ff";
      }
      //  ctrl
      {
        cvs.l3.ctx.drawImage(img, 64 * 0, 64 * 2, 64 * 3, 64 * 3, 0, 0, LEN * 5, LEN * 5);
        cvs.l3.fillStyle = "gray";
        cvs.l3.ctx.beginPath();
        cvs.l3.ctx.arc(
          Math.max(Math.min(LEN * 2.5 + (touch[2] - touch[0]) / 3, LEN * 4.5), LEN / 2),
          Math.max(Math.min(LEN * 2.5 + (touch[3] - touch[1]) / 3, LEN * 4.5), LEN / 2),
          LEN / 2, 0, 2 * Math.PI
        );
        cvs.l3.ctx.fill();
      }
      //  next
      for (let i = 0; i < 5; i++) {
        let nshapes = {
          i: [v(0, -2), v(0, -1), v(0, 0), v(0, 1)],
          j: [v(0, -1), v(0, 0), v(0, 1), v(-1, 1)],
          l: [v(0, -1), v(0, 0), v(0, 1), v(1, 1)],
          o: [v(-1, -1), v(0, -1), v(-1, 0), v(0, 0)],
          s: [v(0, -1), v(1, -1), v(-1, 0), v(0, 0)],
          t: [v(0, -1), v(-1, 0), v(0, 0), v(1, 0)],
          z: [v(-1, -1), v(0, -1), v(0, 0), v(1, 0)]
        };
        for (let j = 0; j < 7; j++) {
          for (let k = 0; k < 4; k++) {
            if (j === 0 || j === 1 || j === 3) {
              nshapes[ids[j]][k] = r(r(r(nshapes[ids[j]][k])));
            } else if (j === 2) {
              nshapes[ids[j]][k] = r(nshapes[ids[j]][k]);
            }
          }
        }
        let shape = nshapes[ids[next[i]]];
        for (let j = 0; j < 4; j++) {
          Draw(cvs.r0.ctx, next[i], 1.5 + shape[j].x, i * 3 + 2.5 + shape[j].y);
          //
        }
      }
    }

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        Draw(cvs.c0.ctx, cells[y][x], x, y);
      }
    }

    if (mode !== "w") {
      for (let i = 0; i < 4; i++) {
        Draw(cvs.c0.ctx, Tghost.id, Tghost.tile(i).x, Tghost.tile(i).y);
        Draw(cvs.c0.ctx, 7, Tghost.tile(i).x, Tghost.tile(i).y);
      }

      for (let i = 0; i < 4; i++) {
        Draw(cvs.c0.ctx, Tcrnt.id, Tcrnt.tile(i).x, Tcrnt.tile(i).y);
      }
    }
  }


  function Main() {
    if (mode !== "b") {
      if (mode !== "d") {
        for (let k in cvs) {
          cvs[k].ctx.clearRect(0, 0, LEN * cvs[k].w, LEN * cvs[k].h);
        }
      }
      if (count === 0) {
        Update();
      }
      if (mode !== "d") Render();
      count = (count + 1) % Math.floor(itv / (1 + acc * 9));
    }

    requestAnimationFrame(Main);
  }



  function Ctrl(C) {
    let bool = 1;
    if (C === "l") {
      for (let i = 0; i < 4; i++) {
        if (Tcrnt.tile(i).x === 0) {
          bool = 0;
          break;
        }
        if (Tcrnt.tile(i).y < 0) continue;
        if (cells[Tcrnt.tile(i).y][Tcrnt.tile(i).x - 1] !== -1) {
          bool = 0;
          break;
        }
      }
      if (bool) {
        Tcrnt.x--;
        Tghost.x--;
      }
    }
    if (C === "r") {
      for (let i = 0; i < 4; i++) {
        if (Tcrnt.tile(i).x === width - 1) {
          bool = 0;
          break;
        }
        if (Tcrnt.tile(i).y < 0) continue;
        if (cells[Tcrnt.tile(i).y][Tcrnt.tile(i).x + 1] !== -1) {
          bool = 0;
          break;
        }
      }
      if (bool) {
        Tcrnt.x++;
        Tghost.x++;
      }
    }
    if (C === "c") {
      for (let i = 0; i < 4; i++) {
        X = Tcrnt.x + r(Tcrnt.t[i]).x;
        Y = Tcrnt.y + r(Tcrnt.t[i]).y;
        //console.log(X,Y);
        if (X < 0 || width <= X || height <= Y) {
          bool = 0;
          break;
        }
        if (Y < 0) continue;
        if (cells[Y][X] !== -1) {
          bool = 0;
          break;
        }
      }
      if (bool) {
        for (let i = 0; i < 4; i++) {
          Tcrnt.t[i] = r(Tcrnt.t[i]);
          Tghost.t[i] = r(Tghost.t[i]);
        }
      }
    }
    if (C === "a") {
      for (let i = 0; i < 4; i++) {
        X = Tcrnt.x + r(r(r(Tcrnt.t[i]))).x;
        Y = Tcrnt.y + r(r(r(Tcrnt.t[i]))).y;
        //console.log(X,Y);
        if (X < 0 || width <= X || height <= Y) {
          bool = 0;
          break;
        }
        if (Y < 0) continue;
        if (cells[Y][X] !== -1) {
          bool = 0;
          break;
        }
      }
      if (bool) {
        for (let i = 0; i < 4; i++) {
          Tcrnt.t[i] = r(r(r(Tcrnt.t[i])));
          Tghost.t[i] = r(r(r(Tghost.t[i])));
        }
      }
    }
    if (C === "d") {
      Tcrnt.y = Tghost.y;
      Tcrnt.update();
    }
    if (C === "h") {
      if (!hold[0]) {
        if (hold[1] === -1) {
          //  未設定
          hold[1] = Tcrnt.id;
          mode = "w";
        } else {
          hold[2] = hold[1];
          hold[1] = Tcrnt.id;
          Tghost = new Tetromino(hold[2], x0, y0);
          Tcrnt = new Tetromino(hold.pop(), x0, y0);
          Tcrnt.gupdate();

          console.log(Tghost);
        }
        hold[0] = 1 - hold[0];
      }
    }
    Tcrnt.gupdate();
  }




  function Draw(ctx, id, x, y) {
    ctx.drawImage(img, 64 * (id % 4), 64 * Math.floor(id / 4), 64, 64, LEN * x, LEN * y, LEN, LEN);
  }

  function DeleteLines() {
    let dl = [];
    for (let i = 0; i < height; i++) {
      if (cells[i].every(n => 0 <= n)) {
        dl.push(i);
      }
    }

    if (!dl.length) {
      mode = "w";
      return false;
    }

    ChangeScore(dl.length);
    for (let i = 0; i < dl.length; i++) {
      cvs.c0.ctx.clearRect(0, LEN * dl[i], LEN * width, LEN);
    }
    setTimeout(() => {
      for (let i = 0; i < dl.length; i++) {
        for (let j = 0; j < width; j++) {
          Draw(cvs.c0.ctx, cells[dl[i]][j], j, dl[i]);
        }
      }
      setTimeout(() => {
        for (let i = 0; i < dl.length; i++) {
          cvs.c0.ctx.clearRect(0, LEN * dl[i], LEN * width, LEN);
        }
        setTimeout(() => {
          while (dl.length) {
            for (let i = dl[0] - 1; 0 <= i; i--) {
              for (let j = 0; j < width; j++) {
                cells[i + 1][j] = cells[i][j];
              }
            }
            dl.shift();
          }
          mode = "w";
        }, 500);
      }, 500);
    }, 500);
  }

  function ChangeScore(dll) {
    score += dll ** 2 * level * 100;
    lines += dll;
    level = Math.floor(lines / 10) + 1;
    itv = Math.floor(itv0 / level);
  }

  function Gameover() {
    alert(
      "Gameover!\n" +
      "Score : " + score + "\n" +
      "You erased " + lines + " line" + (lines > 1 ? "s" : "") + "!"
    );
    mode = "b";
  }
})();
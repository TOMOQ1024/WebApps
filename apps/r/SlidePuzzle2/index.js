(() => {
  const rootPath = getFileRef("Slide Puzzle 2", "root");
  let ArrowImgs = [
    new Image(),
    new Image(),
    new Image(),
    new Image()
  ];
  ArrowImgs[0].src = rootPath + "assets/l1.png";
  ArrowImgs[1].src = rootPath + "assets/u1.png";
  ArrowImgs[2].src = rootPath + "assets/r1.png";
  ArrowImgs[3].src = rootPath + "assets/d1.png";
  let Tile = new Image();
  Tile.src = rootPath + "assets/ffc000-c.png";//#ffc000:yellow




  //length : ゲーム画面のサイズ
  let length = 1000;

  let level = 3;
  let map = [];
  let copied = 0;
  let ctrl = true;
  let time = [0, 0, []];

  let WRAPPER = document.querySelector("#main");

  function IncLv() {
    LEVEL.innerText = ++level;
    WRAPPER_C.style.top = length / (level + 1) / 2 + "px";
    WRAPPER_C.style.left = length / (level + 1) / 2 + "px";
    WRAPPER_C.style.width = level * 100 / (level + 1) + "%";// = length*level*101/(level+1)
    WRAPPER_C.style.height = level * 100 / (level + 1) + "%";
    document.querySelector("#SETTING").style.backgroundSize = 100 / level + "%";
    document.body.style.fontSize = length / 9 + "px";
    //document.querySelector(".SETTING").style.fontSize = "1.5em";// document.querySelector(".SETTING").clientWidth/4 + "px";
    //document.querySelector("#START").style.fontSize = "1.5em";// document.querySelector("#START").clientWidth/5 + "px";
  }
  function DecLv() {
    if (2 < level) {
      LEVEL.innerText = --level;
      WRAPPER_C.style.top = length / (level + 1) / 2 + "px";
      WRAPPER_C.style.left = length / (level + 1) / 2 + "px";
      WRAPPER_C.style.width = level * 100 / (level + 1) + "%";// = length*level*101/(level+1)
      WRAPPER_C.style.height = level * 100 / (level + 1) + "%";
      document.querySelector("#SETTING").style.backgroundSize = 100 / level + "%";
      document.body.style.fontSize = length / 9 + "px";
      //document.querySelector(".SETTING").style.fontSize = "1.5em";// document.querySelector(".SETTING").clientWidth/4 + "px";
      //document.querySelector("#START").style.fontSize = "1.5em";// document.querySelector("#START").clientWidth/5 + "px";
    }
  }

  setTimeout(function () {
    //document.querySelector(".SETTING").style.textAlign = "center";
    IncLv();
    DecLv();
  }, 10);


  let cvs = new Array();
  let ctx = new Array();
  let img = new Image();
  let splitImg = [];
  let copiedImg = new Image();
  let ghost_img = new Image();
  let ghost_cvs;
  let ghost_ctx;




  function Start() {
    //canvas
    for (let y = 0; y < level; y++) {
      cvs[y] = [];
      ctx[y] = [];
      map[y] = [];
      for (let x = 0; x < level; x++) {
        WRAPPER_C.insertAdjacentHTML(
          "beforeend",
          "<canvas" +
          /*" id=\"CVS" + x + "_" + y + "\"" +*/
          " class=\"CVS X" + x + " Y" + y + "\"" +
          " style=\"" +
          " top:" + length / (level + 1) * y + "px;" +
          " left:" + length / (level + 1) * x + "px;" +
          " z-index:1;" +
          "\"" +
          " ></canvas>"
        );
        cvs[y][x] = WRAPPER_C.lastElementChild;
        cvs[y][x].width = length / (level + 1);
        cvs[y][x].height = length / (level + 1);
        ctx[y][x] = cvs[y][x].getContext("2d");
        map[y][x] = y * level + x + 1;  // +1はインデックスが0で始まるのを表示用数値に調整するため
      }
      WRAPPER_C.insertAdjacentHTML("beforeend", "<br>");
    }
    WRAPPER_C.insertAdjacentHTML(
      "beforeend",
      "<canvas" +
      " id=\"GHOST_CVS\"" +
      " width=\"" + length / (level + 1) + "\"" +
      " height=\"" + length / (level + 1) + "\"" +
      " style=\"" +
      " position: absolute;" +
      " \"" +
      ">"
    );
    ghost_cvs = document.querySelector("#GHOST_CVS");
    ghost_ctx = ghost_cvs.getContext("2d");

    //もとになる画像の作成
    setTimeout(function () {
      let baseCvs = document.createElement("canvas");
      baseCvs.width = 66 * level;
      baseCvs.height = 66 * level;
      let baseCtx = baseCvs.getContext("2d");
      for (let y = 0; y < level; y++) {
        for (let x = 0; x < level; x++) {
          baseCtx.drawImage(Tile, x * 66 + 1, y * 66 + 1);
          baseCtx.fillStyle = "#000000";
          baseCtx.font = "bold " + 66 * (level / 10 >= 1 ? 0.5 : 0.7) + "px serif";
          baseCtx.textAlign = "center";
          baseCtx.fillText(String(y * level + x + 1), x * 66 + 66 / 2 + 1, y * 66 + 66 * (level / 10 >= 1 ? 0.7 : 0.75) + 1);
        }
      }

      img.src = baseCvs.toDataURL();

      //splitImg
      splitImg[0] = 0;
      setTimeout(function () {
        for (let y = 0; y < level; y++) {
          for (let x = 0; x < level; x++) {
            ctx[y][x].scale(length * level / (level + 1) / img.width, length * level / (level + 1) / img.height);
            ctx[y][x].drawImage(img, -x * img.width / level, -y * img.width / level);
            ctx[y][x].scale((level + 1) * img.width / length / level, (level + 1) * img.height / length / level);
            splitImg[y * level + x + 1] = new Image();
            splitImg[y * level + x + 1].src = cvs[y][x].toDataURL();
          }
        }
      }, 100);
    }, 100);

    //ボタンの生成
    //上下
    for (let x = 0; x < level; x++) {
      WRAPPER.insertAdjacentHTML(
        "beforeend",
        "<input" +
        " type=\"image\"" +
        " class=\"BTN SLIDE_Y+_" + x + "\"" +
        " style=\"" +
        " top:0px;" +
        " left:" + length / (level + 1) * (x + 0.5) + "px;" +
        " width: " + length / (level + 1) + "px;" +
        " height: " + length / (level + 1) / 2 + "px;" +
        " transform: translateY(" + (-length / (level + 1) / 2) + "px);" +
        "\"" +
        " src=\"images/d1.png\"" +
        " onclick=\"Slide()\"" +
        " onload=\"FadeIn()\"" +
        " >" +
        "<input" +
        " type=\"image\"" +
        " class=\"BTN SLIDE_Y-_" + x + "\"" +
        " style=\"" +
        " bottom:0px;" +
        " left:" + length / (level + 1) * (x + 0.5) + "px;" +
        " width: " + length / (level + 1) + "px;" +
        " height: " + length / (level + 1) / 2 + "px;" +
        " transform: translateY(" + length / (level + 1) / 2 + "px);" +
        "\"" +
        " src=\"images/u1.png\"" +
        " onclick=\"Slide()\"" +
        " onload=\"FadeIn()\"" +
        " >"
      );
    }
    //左右
    for (let y = 0; y < level; y++) {
      WRAPPER.insertAdjacentHTML(
        "beforeend",
        "<input" +
        " type=\"image\"" +
        " class=\"BTN SLIDE_X+_" + y + "\"" +
        " style=\"" +
        " left:0px;" +
        " top:" + length / (level + 1) * (y + 0.5) + "px;" +
        " height: " + length / (level + 1) + "px;" +
        " width: " + length / (level + 1) / 2 + "px;" +
        " transform: translateX(" + (-length / (level + 1) / 2) + "px);" +
        "\"" +
        " src=\"images/r1.png\"" +
        " onclick=\"Slide()\"" +
        " onload=\"FadeIn()\"" +
        " >" +
        "<input" +
        " type=\"image\"" +
        " class=\"BTN SLIDE_X-_" + y + "\"" +
        " style=\"" +
        " right:0px;" +
        " top:" + length / (level + 1) * (y + 0.5) + "px;" +
        " height: " + length / (level + 1) + "px;" +
        " width: " + length / (level + 1) / 2 + "px;" +
        " transform: translateX(" + length / (level + 1) / 2 + "px);" +
        "\"" +
        " src=\"images/l1.png\"" +
        " onclick=\"Slide()\"" +
        " onload=\"FadeIn()\"" +
        " >"
      );
    }

    //シャッフル
    setTimeout(function () {
      let bool = [true, true];
      while (bool[0]) {
        for (let i = 0; i < level * level; i++) {
          Slide(true, (i % 2 ? "X" : "Y") + (Math.floor(Math.random() * 2) ? "+" : "-"), Math.floor(Math.random() * level));
        }
        for (let y = 0; y < level; y++) {
          for (let x = 0; x < level; x++) {
            if (map[y][x] !== y * level + x + 1) {
              bool[1] = false;
            }
          }
        }
        if (!bool[1]) bool[0] = false;
      }
    }, 300);
  }



  function Slide(no_animations, angle, id) {
    if (!ctrl) return false;
    //shuffleはランダム生成時にtrue,ボタンクリック時にundefined
    //angleは方向(0<=angle<=3, (angle*90)degを表す)
    //idはxまたはy

    //初期化
    ghost_img.src = "";
    copiedImg.src = "";
    no_animations = !!no_animations;

    //ボタン入力時の引数の初期化
    if (!no_animations) {
      //CODE = [angle,XorY]
      let CODE = event.target.className.match(/[XY][+-]_\d+/)[0].split("_");
      angle = CODE[0];
      id = Number(CODE[1]);
    }
    //idarrを定義
    //  消滅するキャンバスから始まり,
    //  ゴーストが入るキャンバスで終わる
    console.log("" + no_animations + "," + angle + "," + id);

    if (no_animations) {
      //アニメーション不要
      /*
        移動パネルをコピー
        中身を一マスずつずらす
        端にコピーしたタイルを入れる
      */
      switch (angle) {

        case "X+":
          //>
          copied = map[id][level - 1];
          //ghost_img.src = splitImg[copied].src;
          for (let i = level - 1; i > 0; i--) {
            ctx[id][i].clearRect(0, 0, length / (level + 1), length / (level + 1));
            ctx[id][i].drawImage(splitImg[map[id][i - 1]], 0, 0);
            map[id][i] = map[id][i - 1];
          }
          ctx[id][0].clearRect(0, 0, length / (level + 1), length / (level + 1));
          ctx[id][0].drawImage(splitImg[copied], 0, 0);
          map[id][0] = copied;
          break;

        case "X-":
          //<
          copied = map[id][0];
          for (let i = 0; i < level - 1; i++) {
            ctx[id][i].clearRect(0, 0, length / (level + 1), length / (level + 1));
            ctx[id][i].drawImage(splitImg[map[id][i + 1]], 0, 0);
            map[id][i] = map[id][i + 1];
          }
          ctx[id][level - 1].clearRect(0, 0, length / (level + 1), length / (level + 1));
          ctx[id][level - 1].drawImage(splitImg[copied], 0, 0);
          map[id][level - 1] = copied;
          break;

        case "Y+":
          //v
          copied = map[level - 1][id];
          for (let i = level - 1; i > 0; i--) {
            ctx[i][id].clearRect(0, 0, length / (level + 1), length / (level + 1));
            ctx[i][id].drawImage(splitImg[map[i - 1][id]], 0, 0);
            map[i][id] = map[i - 1][id];
          }
          ctx[0][id].clearRect(0, 0, length / (level + 1), length / (level + 1));
          ctx[0][id].drawImage(splitImg[copied], 0, 0);
          map[0][id] = copied;
          break;

        case "Y-":
          //^
          copied = map[0][id];
          for (let i = 0; i < level - 1; i++) {
            ctx[i][id].clearRect(0, 0, length / (level + 1), length / (level + 1));
            ctx[i][id].drawImage(splitImg[map[i + 1][id]], 0, 0);
            map[i][id] = map[i + 1][id];
          }
          ctx[level - 1][id].clearRect(0, 0, length / (level + 1), length / (level + 1));
          ctx[level - 1][id].drawImage(splitImg[copied], 0, 0);
          map[level - 1][id] = copied;
          break;

      }
    } else {
      //Slide(true,angle,id);
      ctrl = false;
      if (time[0] === 0) time[0] = Number(String(new Date().getTime()));
      switch (angle) {

        case "X+":
          //>
          copied = map[id][level - 1];
          ghost_img.src = splitImg[copied].src;
          ghost_cvs.style.top = length / (level + 1) * id + "px";
          ghost_cvs.style.left = -length / (level + 1) + "px";
          ghost_ctx.drawImage(ghost_img, 0, 0);
          ghost_cvs.style.visibility = "visible";
          setTimeout(function () {
            ghost_cvs.style.transition = "0.3s";
            ghost_cvs.style.transform = "translateX(" + length / (level + 1) + "px)";
            for (let i = level - 1; i >= 0; i--) {
              cvs[id][i].style.transform = "translateX(" + length / (level + 1) + "px)";
              cvs[id][i].style.filter = "";
            }
            setTimeout(function () {
              for (let i = level - 1; i >= 0; i--) {
                cvs[id][i].style.transition = "none";
                cvs[id][i].style.transform = "";
                ctx[id][i].clearRect(0, 0, length / (level + 1), length / (level + 1));
                if (i) {
                  ctx[id][i].drawImage(splitImg[map[id][i - 1]], 0, 0);
                  map[id][i] = map[id][i - 1];
                } else {
                  ctx[id][i].drawImage(splitImg[copied], 0, 0);
                }
              }
              map[id][0] = copied;
              setTimeout(function () {
                for (let i = level - 1; i >= 0; i--) {
                  cvs[id][i].style.transition = "";
                }
                ghost_cvs.style.transition = "";
                ghost_cvs.style.visibility = "hidden";
                ghost_cvs.style.top = "";
                ghost_cvs.style.left = "";
                ghost_cvs.style.transform = "none";
                ctrl = true;
              }, 30);
            }, 300);
          }, 30);
          break;

        case "X-":
          //<
          copied = map[id][0];
          ghost_img.src = splitImg[copied].src;
          ghost_cvs.style.top = length / (level + 1) * id + "px";
          ghost_cvs.style.right = -length / (level + 1) + "px";
          ghost_ctx.drawImage(ghost_img, 0, 0);
          ghost_cvs.style.visibility = "visible";
          setTimeout(function () {
            ghost_cvs.style.transition = "0.3s";
            ghost_cvs.style.transform = "translateX(" + -length / (level + 1) + "px)";
            for (let i = 0; i < level; i++) {
              cvs[id][i].style.transform = "translateX(" + -length / (level + 1) + "px)";
              cvs[id][i].style.filter = "";
            }
            setTimeout(function () {
              for (let i = 0; i < level; i++) {
                cvs[id][i].style.transition = "none";
                cvs[id][i].style.transform = "";
                ctx[id][i].clearRect(0, 0, length / (level + 1), length / (level + 1));
                if (i !== level - 1) {
                  ctx[id][i].drawImage(splitImg[map[id][i + 1]], 0, 0);
                  map[id][i] = map[id][i + 1];
                } else {
                  ctx[id][i].drawImage(splitImg[copied], 0, 0);
                }
              }
              map[id][level - 1] = copied;
              setTimeout(function () {
                for (let i = 0; i < level; i++) {
                  cvs[id][i].style.transition = "";
                }
                ghost_cvs.style.transition = "";
                ghost_cvs.style.visibility = "hidden";
                ghost_cvs.style.top = "";
                ghost_cvs.style.right = "";
                ghost_cvs.style.transform = "none";
                ctrl = true;
              }, 30);
            }, 300);
          }, 30);
          break;

        case "Y+":
          //v
          copied = map[level - 1][id];
          ghost_img.src = splitImg[copied].src;
          ghost_cvs.style.left = length / (level + 1) * id + "px";
          ghost_cvs.style.top = -length / (level + 1) + "px";
          ghost_ctx.drawImage(ghost_img, 0, 0);
          ghost_cvs.style.visibility = "visible";
          setTimeout(function () {
            ghost_cvs.style.transition = "0.3s";
            ghost_cvs.style.transform = "translateY(" + length / (level + 1) + "px)";
            for (let i = level - 1; i >= 0; i--) {
              cvs[i][id].style.transform = "translateY(" + length / (level + 1) + "px)";
              cvs[i][id].style.filter = "";
            }
            setTimeout(function () {
              for (let i = level - 1; i >= 0; i--) {
                cvs[i][id].style.transition = "none";
                cvs[i][id].style.transform = "";
                ctx[i][id].clearRect(0, 0, length / (level + 1), length / (level + 1));
                if (i) {
                  ctx[i][id].drawImage(splitImg[map[i - 1][id]], 0, 0);
                  map[i][id] = map[i - 1][id];
                } else {
                  ctx[i][id].drawImage(splitImg[copied], 0, 0);
                }
              }
              map[0][id] = copied;
              setTimeout(function () {
                for (let i = level - 1; i >= 0; i--) {
                  cvs[i][id].style.transition = "";
                }
                ghost_cvs.style.transition = "";
                ghost_cvs.style.visibility = "hidden";
                ghost_cvs.style.left = "";
                ghost_cvs.style.top = "";
                ghost_cvs.style.transform = "none";
                ctrl = true;
              }, 30);
            }, 300);
          }, 30);
          break;

        case "Y-":
          //^
          copied = map[0][id];
          ghost_img.src = splitImg[copied].src;
          ghost_cvs.style.left = length / (level + 1) * id + "px";
          ghost_cvs.style.bottom = -length / (level + 1) + "px";
          ghost_ctx.drawImage(ghost_img, 0, 0);
          ghost_cvs.style.visibility = "visible";
          setTimeout(function () {
            ghost_cvs.style.transition = "0.3s";
            ghost_cvs.style.transform = "translateY(" + -length / (level + 1) + "px)";
            for (let i = 0; i < level; i++) {
              cvs[i][id].style.transform = "translateY(" + -length / (level + 1) + "px)";
              cvs[i][id].style.filter = "";
            }
            setTimeout(function () {
              for (let i = 0; i < level; i++) {
                cvs[i][id].style.transition = "none";
                cvs[i][id].style.transform = "";
                ctx[i][id].clearRect(0, 0, length / (level + 1), length / (level + 1));
                if (i !== level - 1) {
                  ctx[i][id].drawImage(splitImg[map[i + 1][id]], 0, 0);
                  map[i][id] = map[i + 1][id];
                } else {
                  ctx[i][id].drawImage(splitImg[copied], 0, 0);
                }
              }
              map[level - 1][id] = copied;
              setTimeout(function () {
                for (let i = 0; i < level; i++) {
                  cvs[i][id].style.transition = "";
                }
                ghost_cvs.style.transition = "";
                ghost_cvs.style.visibility = "hidden";
                ghost_cvs.style.left = "";
                ghost_cvs.style.bottom = "";
                ghost_cvs.style.transform = "none";
                ctrl = true;
              }, 30);
            }, 300);
          }, 30);
          break;

      }

      setTimeout(function () {
        Check();
      }, 360);
    }
  }


  function Check() {
    let bool = true;
    for (let y = 0; y < level; y++) {
      for (let x = 0; x < level; x++) {
        if (map[y][x] === y * level + x + 1) {
          cvs[y][x].style.filter = "brightness(0.5)";
        } else {
          cvs[y][x].style.filter = "";
          bool = false;
        }
      }
    }

    if (bool) {
      //clear
      time[1] = Number(String(new Date().getTime()));
      time[2][0] = time[1] - time[0];
      time[2][1] = time[2][0] % 1000;//cs
      time[2][2] = (time[2][0] - time[2][1]) / 1000 % 60//sec
      time[2][3] = (time[2][0] - time[2][1] - time[2][2] * 1000) / 60000//min
      setTimeout(function () {
        cvs.forEach(function (y) {
          y.forEach(function (x) {
            x.style.filter = "brightness(1.0)";
          });
        });

        setTimeout(function () {
          alert("Congratulations!\nTime : " + time[2][3] + "分" + String(time[2][2]).padStart(2, '0') + '.' + String(time[2][1]).padStart(3, '0') + "秒");
          time = [0, 0, []];
        }, 300);
      }, 300);
    }
  }


  function FadeIn() {
    event.target.style.transform = "none";
    event.target.style.opacity = "1.0";
  }
})();
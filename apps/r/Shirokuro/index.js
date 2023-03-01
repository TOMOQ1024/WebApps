
(() => {
  loadScript("/src/Vec2.js");
  loadScript("/src/Utils.js");
  loadScript("/src/Mouse.js");
  loadScript("/src/Scene.js");
  loadScript("/src/Object2D.js");
  const rootPath = getFileRef("Shirokuro", "root");
  let width = 5;
  let height = 5;
  let cells = [];
  let img = [new Image(), new Image()];
  img[0].src = rootPath+"assets/202020-c.png";
  img[1].src = rootPath+"assets/e0e0e0-c.png";
  let objs = {};
  let time = [0, 0, []];
  let cvs = document.createElement("canvas");
  cvs.style.backgroundImage = `url(${img[0].src})`;
  cvs.style.backgroundSize = `${100/width}% ${100/height}%`;
  cvs.className = "cvs-single";
  cvs.width = cvs.height = 1000;
  let ctx = cvs.getContext("2d");
  document.getElementById("main").appendChild(cvs);
  let mouse;
  let sceneMgr;
  
  setTimeout(()=>{
    mouse = new Mouse(cvs);
    sceneMgr = new SceneManager({
      ctx: ctx,
      mouse: mouse,
      title: new Scene({
        onMounted: ()=>{
          let self = sceneMgr.crntScene;
          self.addObjects({
            name: "title",
            obj: new TextObj2D({
              text: "Shirokuro",
              x: cvs.width / 2,
              y: cvs.height / 2,
              fontSize: 120,
              color: "white",
              onclick: ()=>{
                sceneMgr.setScene("settings");
              }
            }),
          });
        },
      }),

      settings: new Scene({
        onMounted: ()=>{
          let self = sceneMgr.crntScene;
          self.addObjects(
            {
              name: "title",
              obj: new TextObj2D({
                text: "Settings",
                x: cvs.width / 2,
                y: cvs.height / 10,
                fontSize: 120,
                color: "white",
              })
            },{
              name: "width",
              obj: new TextObj2D({
                x: cvs.width / 2,
                y: cvs.height * 2 / 5,
                fontSize: 190,
                fontWeight: "bold",
                color: "white",
              })
            },{
              name: "height",
              obj: new TextObj2D({
                x: cvs.width / 2,
                y: cvs.height * 3 / 5,
                fontSize: 190,
                fontWeight: "bold",
                color: "white",
              })
            },{
              name: "decWidth",
              obj: new TriangleObj2D({
                x: cvs.width * 1 / 5,
                y: cvs.height * 2 / 5,
                w: cvs.width / 8,
                h: cvs.height / 8,
                angle: Math.PI,
                color: "white",
                onclick:()=>{
                  width = Math.max(1, width - 1);
                },
              })
            },{
              name: "incWidth",
              obj: new TriangleObj2D({
                x: cvs.width * 4 / 5,
                y: cvs.height * 2 / 5,
                w: cvs.width / 8,
                h: cvs.height / 8,
                color: "white",
                onclick: ()=>{
                  ++width;
                },
              })
            },{
              name: "decHeight",
              obj: new TriangleObj2D({
                x: cvs.width * 1 / 5,
                y: cvs.height * 3 / 5,
                w: cvs.width / 8,
                h: cvs.height / 8,
                angle: Math.PI,
                color: "white",
                onclick:()=>{
                  height = Math.max(1, height - 1);
                },
              })
            },{
              name: "incHeight",
              obj: new TriangleObj2D({
                x: cvs.width * 4 / 5,
                y: cvs.height * 3 / 5,
                w: cvs.width / 8,
                h: cvs.height / 8,
                color: "white",
                onclick: ()=>{
                  ++height;
                },
              })
            },{
              name: "start",
              obj: new TextObj2D({
                text: "Start",
                x: cvs.width / 2,
                y: cvs.height * 9 / 10,
                fontSize: 120,
                color: "white",
                onclick: ()=>{
                  sceneMgr.setScene("game");
                }
              }),
            },
          );
        },
        update: ()=>{
          let self = sceneMgr.crntScene;
          self.objs.width.setText(width);
          self.objs.height.setText(height);
        }
      }),
      game: new Scene({
        onMounted: ()=>{
          let self = sceneMgr.crntScene;
          self.addObjects({
            name: "title",
            obj: new TextObj2D({
              text: "(game scene)",
              x: cvs.width / 2,
              y: cvs.height / 2,
              fontSize: 120,
              color: "white",
              onclick: ()=>{
                sceneMgr.setScene("result");
              }
            }),
          },
          ...(()=>{
            cells = [];
            for(let y=0; y<height; y++){
              cells.push([]);
              for(let x=0; x<width; x++){
                cells[y].push(0);
              }
            }
            console.log(cells);
            for(let y=0; y<height; y++){
              for(let x=0; x<width; x++){
                if(Math.random() < 0.5){
                  Flip(x, y);
                }
              }
            }
            console.log(cells);
            return [];
            //return [{name:"temp", obj: new RectObj2D()}]
          })()
          );
        },
      }),

      result: new Scene({
        onMounted: ()=>{
          let self = sceneMgr.crntScene;
          self.addObjects({
            name: "go back",
            obj: new TextObj2D({
              text: "Go back",
              x: cvs.width / 2,
              y: cvs.height / 2,
              fontSize: 120,
              color: "white",
              onclick: ()=>{
                sceneMgr.setScene("title");
              }
            }),
          });
        },
      }),
    });

    sceneMgr.setScene("game");
    console.log(sceneMgr);
    GameLoop();
  }, 100);



  function Flip(x0, y0){
    const dir = Utils.directions;
    let x, y;

    cells[y0][x0] ^= 1;
    for(let i=0; i<4; i++){
      x = x0 + dir[i].x;
      y = y0 + dir[i].y;
      if(Utils.isIn_v(x, y, 0, 0, width, height)){
        cells[y][x] ^= 1;
      }
    }
  }

  function GameLoop(){
    sceneMgr.update();
    sceneMgr.render();
    requestAnimationFrame(GameLoop);
  }
})();

(() => {
  Inc(0); Dec(0);
  function Inc(i) {
    if (i) {
      document.querySelector(".height").innerText = ++height;
      if (height === 2) {
        document.querySelectorAll(".btn_d")[1].style.filter = "";
      }
    } else {
      document.querySelector(".width").innerText = ++width;
      if (width === 2) {
        document.querySelectorAll(".btn_d")[0].style.filter = "";
      }
    }
    document.querySelector(".pop_up").style.backgroundSize = 100 / width + "% " + 100 / height + "%";
  }
  function Dec(i) {
    if (i) {
      if (height > 1) {
        document.querySelector(".height").innerText = --height;
        if (height === 1) {
          document.querySelectorAll(".btn_d")[1].style.filter = "brightness(0.5)";
        }
      }
    } else {
      if (width > 1) {
        document.querySelector(".width").innerText = --width;
        if (width === 1) {
          document.querySelectorAll(".btn_d")[0].style.filter = "brightness(0.5)";
        }
      }
    }
    document.querySelector(".pop_up").style.backgroundSize = 100 / width + "% " + 100 / height + "%";
  }



  function Start() {
    WRAPPER.innerHTML = "";
    WRAPPER.append(cvs.ele);


    //  mapの初期化
    for (let y = 0; y < height; y++) {
      map.push([]);
      for (let x = 0; x < width; x++) {
        map[y].push(0);
        cvs.ctx.drawImage(img[0], LENGTH / width * x, LENGTH / height * y, LENGTH / width, LENGTH / height);
      }
    }


    //ランダム
    for (let i = 0; i < width * height; i++) {
      Flip(1, Math.floor(Math.random() * height), Math.floor(Math.random() * width));
    }





  }




  //クリック, シャッフル時の動作
  function Flip(s, y, x) {
    if (s) {
      //シャッフル時(アニメーションなし)
      map[y][x] = 1 - map[y][x];
      cvs.ctx.drawImage(img[map[y][x]], LENGTH / width * x, LENGTH / height * y, LENGTH / width, LENGTH / height);
      if (x < width - 1) {
        map[y][x + 1] = 1 - map[y][x + 1];
        cvs.ctx.drawImage(img[map[y][x + 1]], LENGTH / width * (x + 1), LENGTH / height * y, LENGTH / width, LENGTH / height);
      }
      if (0 < y) {
        map[y - 1][x] = 1 - map[y - 1][x];
        cvs.ctx.drawImage(img[map[y - 1][x]], LENGTH / width * x, LENGTH / height * (y - 1), LENGTH / width, LENGTH / height);
      }
      if (0 < x) {
        map[y][x - 1] = 1 - map[y][x - 1];
        cvs.ctx.drawImage(img[map[y][x - 1]], LENGTH / width * (x - 1), LENGTH / height * y, LENGTH / width, LENGTH / height);
      }
      if (y < height - 1) {
        map[y + 1][x] = 1 - map[y + 1][x];
        cvs.ctx.drawImage(img[map[y + 1][x]], LENGTH / width * x, LENGTH / height * (y + 1), LENGTH / width, LENGTH / height);
      }
    } else {
      //クリック時(アニメーションあり)
      map[y][x] = 1 - map[y][x];
      cvs.ctx.drawImage(img[map[y][x]], LENGTH / width * x, LENGTH / height * y, LENGTH / width, LENGTH / height);
      setTimeout(function () {
        if (x < width - 1) {
          map[y][x + 1] = 1 - map[y][x + 1];
          cvs.ctx.drawImage(img[map[y][x + 1]], LENGTH / width * (x + 1), LENGTH / height * y, LENGTH / width, LENGTH / height);
        }
        setTimeout(function () {
          if (0 < y) {
            map[y - 1][x] = 1 - map[y - 1][x];
            cvs.ctx.drawImage(img[map[y - 1][x]], LENGTH / width * x, LENGTH / height * (y - 1), LENGTH / width, LENGTH / height);
          }
          setTimeout(function () {
            if (0 < x) {
              map[y][x - 1] = 1 - map[y][x - 1];
              cvs.ctx.drawImage(img[map[y][x - 1]], LENGTH / width * (x - 1), LENGTH / height * y, LENGTH / width, LENGTH / height);
            }
            setTimeout(function () {
              if (y < height - 1) {
                map[y + 1][x] = 1 - map[y + 1][x];
                cvs.ctx.drawImage(img[map[y + 1][x]], LENGTH / width * x, LENGTH / height * (y + 1), LENGTH / width, LENGTH / height);
              }
              Check();
            }, 50);
          }, 50);
        }, 50);
      }, 50);
    }
  }


  //クリック
  cvs.ele.onclick = e => {
    if (time[0] === 0) time[0] = Number(String(new Date().getTime()));
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - Math.floor(rect.left);
    let y = e.clientY - Math.floor(rect.top);
    //cvs.ctx.beginPath();
    //cvs.ctx.arc(x,y,5,0,Math.PI*2,false);
    //cvs.ctx.fill();
    Flip(0, Math.floor(y / (LENGTH / height)), Math.floor(x / (LENGTH / width)));
  }


  function Check() {
    let first_data = map[0][0];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (map[y][x] !== first_data) {
          return false;
        }
      }
    }

    clear_code = first_data;

    time[1] = Number(String(new Date().getTime()));
    time[2][0] = time[1] - time[0];
    time[2][1] = time[2][0] % 1000;//cs
    time[2][2] = (time[2][0] - time[2][1]) / 1000 % 60//sec
    time[2][3] = (time[2][0] - time[2][1] - time[2][2] * 1000) / 60000//min
    setTimeout(function () {
      alert(
        "Congratulations!\n" +
        "Clear-" + String(clear_code).padStart(2, "0") + "\n" +
        "Time : " +
        time[2][3] + "分" +
        String(time[2][2]).padStart(2, '0') + '.' + String(time[2][1]).padStart(3, '0') + "秒"
      );
      time = [0, 0, []];
    }, 100);
  }
});
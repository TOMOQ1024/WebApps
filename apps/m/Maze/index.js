(() => {
  //
  const rootPath = getFileRef("Maze", "root");
  let width = 5;
  let height = 5;
  let texture = 0;
  let style = 1;
  let mode = 0;//   -1:密, 0~4:normal, 5~9:auto solve, 10~:animation
  let time = [0, 0, []];
  let ctrl = 0;
  let player = {};
  let cells;//  0:壁, 1:未, 2:過, 3:既, 4:解, 5:始, 6:終
  const img = new Image();
  img.src = rootPath+"assets/Maze.png";


  let len = 100;
  let cvs = document.createElement("canvas");
  cvs.onclick = (e)=>{OnClick(e)};
  document.getElementById("main").appendChild(cvs);
  cvs.width = len * (width * 2 + 1);
  cvs.height = len * (height * 2 + 1);
  cvs.className = "cvs-single";
  cvs.style.backgroundImage = `url(${rootPath}assets/202020-o.png)`;
  cvs.style.backgroundSize = "calc(100%/11) calc(100%/11)";
  cvs.style.zIndex = "10";
  let ctx = cvs.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "black";
  ctx.shadowOffsetX = len / 8;
  ctx.shadowOffsetY = len / 8;
  ctx.shadowBlur = len / 5;




  setTimeout(Draw, 100);








  //  //
  function OnClick(e) {
    const rect = cvs.getBoundingClientRect();
    const x = (e.clientX - rect.left) * 11 / rect.width;
    const y = (e.clientY - rect.top) * 11 / rect.height;
    let rr = (a, b) => a * a + 2 * b * b + a * Math.abs(a) - 1;
    let i;

    if (1 < y && y < 3) {
      //  width
      i = width + 3 * Math.sign(Math.round((x - 5.5) / 2)) - 4 * Math.round((x - 5.5) / 2);
      if (i < 2) width = height - 1 ? 1 : 2;
      else width = i;
    } else if (3 < y && y < 5) {
      //  height
      i = height + 3 * Math.sign(Math.round((x - 5.5) / 2)) - 4 * Math.round((x - 5.5) / 2);
      if (i < 2) height = width - 1 ? 1 : 2;
      else height = i;
    } else if (6.5 < y && y < 8.5) {
      if (1 < x && x < 3) texture = 1 - texture;
      if (6 < x && x < 8) style = 1 - style;
    } else if (rr(Math.abs(x - 5.5) - 2.5, y - 10) < 0) {
      //  start
      if (mode < 0) {
        width = 57;
        height = 57;
      }
      cvs.width = len * (width * 2 + 1);
      cvs.height = len * (height * 2 + 1);
      if (!texture) cvs.style.background = "#202020";
      ctx.shadowColor = "transparent";
      ctx.shadowOffsetX = len / 8;
      ctx.shadowOffsetY = len / 8;
      ctx.shadowBlur = len / 5;
      setTimeout(function () {
        Main();
      }, 100);
      return false;
    }

    mode = 6 < x && x < 8 && 6.5 < y && y < 8.5 ? mode + 1 : (width === 32 && height === 32 ? -1 : 0);
    Draw();
    cvs.style.backgroundSize = "" + 100 / (width * 2 + 1) + "% " + 100 / (height * 2 + 1) + "%";
  }

  //  draw in settings (this will be overridden later)
  function Draw() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = "cyan";
    ctx.font = "bold " + len + "px serif";
    ctx.fillText("LEVEL", len * 5.5, len * .5);
    ctx.drawImage(img, 0, 128, 128, 64, len * .5, len, len * 4, len * 2);
    ctx.drawImage(img, 0, 128, 128, 64, len * .5, len * 3, len * 4, len * 2);
    ctx.globalAlpha = 2 < Math.sign((height - 1) ** 2) + width ? 1 : .5;
    ctx.drawImage(img, 192, 128, 128, 64, len * 6.5, len, len * 4, len * 2);
    ctx.globalAlpha = 2 < Math.sign((width - 1) ** 2) + height ? 1 : .5;
    ctx.drawImage(img, 192, 128, 128, 64, len * 6.5, len * 3, len * 4, len * 2);
    ctx.globalAlpha = 1;

    ctx.fillText("TEXTURE", len * 3, len * 6);
    ctx.drawImage(img, 128, 128, 64, 64, len, len * 6.5, len * 2, len * 2);
    if (texture) {
      ctx.drawImage(img, 0, 0, 128, 128, len * 3, len * 6.5, len * 2, len * 2);
    } else {
      ctx.drawImage(img, 192, 0, 128, 128, len * 3, len * 6.5, len * 2, len * 2);
    }
    ctx.fillText("STYLE", len * 8, len * 6);
    ctx.drawImage(img, 128, 128, 64, 64, len * 6, len * 6.5, len * 2, len * 2);
    if (style) {
      ctx.drawImage(img, 0, 0, 64, 64, len * 8, len * 6.5, len * .5, len * .5);
      ctx.drawImage(img, 0, 0, 64, 64, len * 8.5, len * 6.5, len, len * .5);
      ctx.drawImage(img, 0, 0, 64, 64, len * 9.5, len * 6.5, len * .5, len * .5);
      ctx.drawImage(img, 64, 0, 64, 64, len * 8, len * 7, len * .5, len);
      ctx.drawImage(img, 64, 0, 64, 64, len * 8.5, len * 7, len, len);
      ctx.drawImage(img, 64, 0, 64, 64, len * 9.5, len * 7, len * .5, len);
      ctx.drawImage(img, 0, 0, 64, 64, len * 8, len * 8, len * .5, len * .5);
      ctx.drawImage(img, 0, 0, 64, 64, len * 8.5, len * 8, len, len * .5);
      ctx.drawImage(img, 0, 0, 64, 64, len * 9.5, len * 8, len * .5, len * .5);
    } else {
      ctx.drawImage(img, 0, 0, 64, 64, len * 24 / 3, len * 19.5 / 3, len * 2 / 3, len * 2 / 3);
      ctx.drawImage(img, 0, 0, 64, 64, len * 26 / 3, len * 19.5 / 3, len * 2 / 3, len * 2 / 3);
      ctx.drawImage(img, 0, 0, 64, 64, len * 28 / 3, len * 19.5 / 3, len * 2 / 3, len * 2 / 3);
      ctx.drawImage(img, 64, 0, 64, 64, len * 24 / 3, len * 21.5 / 3, len * 2 / 3, len * 2 / 3);
      ctx.drawImage(img, 64, 0, 64, 64, len * 26 / 3, len * 21.5 / 3, len * 2 / 3, len * 2 / 3);
      ctx.drawImage(img, 64, 0, 64, 64, len * 28 / 3, len * 21.5 / 3, len * 2 / 3, len * 2 / 3);
      ctx.drawImage(img, 0, 0, 64, 64, len * 24 / 3, len * 23.5 / 3, len * 2 / 3, len * 2 / 3);
      ctx.drawImage(img, 0, 0, 64, 64, len * 26 / 3, len * 23.5 / 3, len * 2 / 3, len * 2 / 3);
      ctx.drawImage(img, 0, 0, 64, 64, len * 28 / 3, len * 23.5 / 3, len * 2 / 3, len * 2 / 3);
    }

    ctx.font = "bold " + len * 1.5 + "px serif";
    ctx.fillText(width, len * 5.5, len * 2);
    ctx.fillText(height, len * 5.5, len * 4);

    ctx.fillStyle = "#e0e0e0";
    ctx.beginPath();
    if (mode < 0) {
      ctx.arc(len * 9.5, len * 10, len * .75, Math.PI / 2, -Math.PI / 2, true);
      ctx.arc(len * 1.5, len * 10, len * .75, -Math.PI / 2, Math.PI / 2, true);
    } else {
      ctx.arc(len * 8, len * 10, len * .75, Math.PI / 2, -Math.PI / 2, true);
      ctx.arc(len * 3, len * 10, len * .75, -Math.PI / 2, Math.PI / 2, true);
    }
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#808080";
    ctx.beginPath();
    if (mode < 0) {
      ctx.arc(len * 9.5, len * 10, len * .65, Math.PI / 2, -Math.PI / 2, true);
      ctx.arc(len * 1.5, len * 10, len * .65, -Math.PI / 2, Math.PI / 2, true);
    } else {
      ctx.arc(len * 8, len * 10, len * .65, Math.PI / 2, -Math.PI / 2, true);
      ctx.arc(len * 3, len * 10, len * .65, -Math.PI / 2, Math.PI / 2, true);
    }
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "cyan";
    ctx.font = "bold " + len * 1.25 + "px serif";
    ctx.fillText(4 < mode ? (9 < mode ? "(ΦωΦ)" : "(^q^)") : (mode < 0 ? "STAY HOME" : "START"), len * 5.5, len * 10);
  }

  //  main
  function Main() {
    let touch = [0, 0, 0, 0];
    OnClick = () => { }
    Draw = (x, y, b) => {
      if (b) {
        //  builder描画
        ctx.fillStyle = "#ff00ff";
        if (style) {
          /*
          ctx.fillRect(
            len*(x+.2*Math.sign(x)-.4*(x%2)),
            len*(y+.2*Math.sign(y)-.4*(y%2)),
            len*(x*(x-width*2)?.6+.8*(x%2):.8),
            len*(y*(y-height*2)?.6+.8*(y%2):.8)
          );
          */
          ctx.fillRect(
            len * (x + .2 * Math.sign(x) - .4 * (x % 2)) + .25 * len * (x * (x - width * 2) ? .6 + .8 * (x % 2) : .8),
            len * (y + .2 * Math.sign(y) - .4 * (y % 2)) + .25 * len * (y * (y - height * 2) ? .6 + .8 * (y % 2) : .8),
            .5 * len * (x * (x - width * 2) ? .6 + .8 * (x % 2) : .8),
            .5 * len * (y * (y - height * 2) ? .6 + .8 * (y % 2) : .8)
          );
        } else {
          //ctx.fillRect(len*x,len*y,len,len);
          ctx.fillRect(len * (x + .25), len * (y + .25), len * .5, len * .5);
        }
      } else {
        let i = cells ? cells[y][x] : 0;
        if (style) {
          if (i === 1) {
            ctx.clearRect(len * (x + .2 * Math.sign(x) - .4 * (x % 2)), len * (y + .2 * Math.sign(y) - .4 * (y % 2)), len * (x * (x - width * 2) ? .6 + .8 * (x % 2) : .8), len * (y * (y - height * 2) ? .6 + .8 * (y % 2) : .8));
          } else if (Math.abs(i - 1) === 1) {
            ctx.drawImage(img, i * 32 + 192 - texture * 192, 0, 64, 64, len * (x + .2 * Math.sign(x) - .4 * (x % 2)), len * (y + .2 * Math.sign(y) - .4 * (y % 2)), len * (x * (x - width * 2) ? .6 + .8 * (x % 2) : .8), len * (y * (y - height * 2) ? .6 + .8 * (y % 2) : .8));
          } else if (i === 3) {
            ctx.clearRect(
              len * (x + .2 * Math.sign(x) - .4 * (x % 2)),
              len * (y + .2 * Math.sign(y) - .4 * (y % 2)),
              len * (x * (x - width * 2) ? .6 + .8 * (x % 2) : .8),
              len * (y * (y - height * 2) ? .6 + .8 * (y % 2) : .8)
            );
            ctx.globalAlpha = .5;
            ctx.drawImage(img, 256 - texture * 192, 0, 64, 64, len * (x + .2 * Math.sign(x) - .4 * (x % 2)), len * (y + .2 * Math.sign(y) - .4 * (y % 2)), len * (x * (x - width * 2) ? .6 + .8 * (x % 2) : .8), len * (y * (y - height * 2) ? .6 + .8 * (y % 2) : .8));
            ctx.globalAlpha = 1;
          } else if (4 < i) {
            ctx.drawImage(img, (i - 5) * 64 + 192 - texture * 192, 64, 64, 64, len * (x + .2 * Math.sign(x) - .4 * (x % 2)), len * (y + .2 * Math.sign(y) - .4 * (y % 2)), len * (x * (x - width * 2) ? .6 + .8 * (x % 2) : .8), len * (y * (y - height * 2) ? .6 + .8 * (y % 2) : .8));
          } else if (i === 4) {
            ctx.drawImage(img, 128, 64 - texture * 64, 64, 64, len * (x + .2 * Math.sign(x) - .4 * (x % 2)), len * (y + .2 * Math.sign(y) - .4 * (y % 2)), len * (x * (x - width * 2) ? .6 + .8 * (x % 2) : .8), len * (y * (y - height * 2) ? .6 + .8 * (y % 2) : .8));
          }
        } else {
          if (i === 1) {
            ctx.clearRect(len * x, len * y, len, len);
          } else if ((i - 1) ** 2 === 1) {
            ctx.drawImage(img, i * 32 + 192 - texture * 192, 0, 64, 64, len * x, len * y, len, len);
          } else if (i === 3) {
            ctx.clearRect(len * x, len * y, len, len);
            ctx.globalAlpha = .5;
            ctx.drawImage(img, 256 - texture * 192, 0, 64, 64, len * x, len * y, len, len);
            ctx.globalAlpha = 1;
          } else if (4 < i) {
            ctx.drawImage(img, (i - 5) * 64 + 192 - texture * 192, 64, 64, 64, len * x, len * y, len, len);
          } else if (i === 4) {
            ctx.drawImage(img, 128, 64 - texture * 64, 64, 64, len * x, len * y, len, len);
          }
        }
      }

    }

    if (9 < mode) {
      //  animation
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      for (let y = 0; y < height * 2 + 1; y++) {
        for (let x = 0; x < width * 2 + 1; x++) {
          Draw(x, y);
        }
      }
      Animation_Build();
    } else if (4 < mode) {
      //  auto solve
      Build();
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      for (let y = 0; y < height * 2 + 1; y++) {
        for (let x = 0; x < width * 2 + 1; x++) {
          Draw(x, y);
        }
      }
      OnClick = () => {
        Solve();
        OnClick = () => {
          for (let y = 0; y < height * 2 + 1; y++) {
            for (let x = 0; x < width * 2 + 1; x++) {
              if (cells[y][x] === 3) {
                //  関係のない道の初期化
                cells[y][x] = 1;
                Draw(x, y);
              }
            }
          }
          OnClick = () => { };
        }
      }
    } else {
      if (mode < 0) {
        //  密

        //  cells
        cells =
          (`
            0 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0
            0 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 5 1101111 1 1111111 1 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0
            0 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0101000 0 0000000 1 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0
            0 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 1 0111011 1 1111110 1 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0
            0 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 1 0000010 0 0000010 1 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0
            0 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 1 0111111 1 1101110 1 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0
            0 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 1 0000000 1 0001000 1 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0
            0 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 1 0111110 1 0111111 1 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0
            0 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 1 0101000 1 0100000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0
            0 1 1111011 1 1111111 1 1111111 1 1111111 1 1111111 1 1111111 1 1101111 1 0111111 1 1111111 1 1101111 1 1111011 1 1111111 1 1111111 1 1111111 1 0
            0 1 0001010 0 0000010 0 0000000 0 0000000 0 0001000 0 0000000 1 0000000 0 0001000 0 0000000 0 0100000 0 0001010 0 0000010 0 0100000 1 0100000 0 0
            0 1 0101111 1 1111011 1 1101110 1 1101111 1 1101110 1 0111110 1 0111011 1 1101011 1 0111110 1 0111111 1 1111110 1 1111010 1 1101110 1 0111111 1 0
            0 1 0100010 0 0100000 0 0001010 1 0001000 0 0101000 1 0001000 1 0101010 1 0101010 1 0100010 1 0100000 0 0000000 1 0001010 1 0000010 1 0000000 1 0
            0 1 0111010 1 0101111 1 1111011 1 0111011 1 0111011 1 0101010 1 0101010 1 0101010 1 0101010 1 1101111 1 1101111 1 0111010 1 0111110 1 0111110 1 0
            0 1 0101010 1 0001000 0 0000010 1 0100010 0 0100010 1 0101010 1 0001010 1 0101000 1 0101010 0 0001000 0 0101000 0 0100000 1 0001000 1 0100010 1 0
            0 1 0101010 1 1111111 1 0111010 1 0111010 1 1101110 1 1101010 1 1111010 1 0101111 1 0111011 1 1111011 1 1111010 1 1101110 1 0111011 1 0111010 1 0
            0 1 0101000 0 0001000 1 0101000 1 0000010 0 0001010 0 0001010 0 0000010 1 0100000 0 0000000 0 0000010 1 0000010 0 0001010 1 0100010 0 0100000 1 0
            0 1 0101111 1 1111110 1 1101110 1 1111111 1 1111011 1 1111111 1 1111110 1 0111111 1 1111111 1 1111110 1 1111111 1 1111011 1 0111111 1 0101111 1 0
            0 1 0000010 0 0000000 0 0000000 0 0000000 0 0000000 0 0000010 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 1 0101000 0 0
            0 1 0111111 1 0000000 0 0000000 0 0000000 0 0000000 0 0000011 1 1111000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 1 0101111 1 0
            0 1 0000000 1 0000000 0 0000000 0 0000000 0 0000000 0 0000010 0 0001000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 1 0100000 1 0
            0 1 1111110 1 0000000 0 0000000 0 0000000 0 0000000 0 0001110 1 1101110 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 1 0111111 1 0
            0 0 0000010 1 0000000 0 0000000 0 0000000 0 0000000 0 0001000 1 0101010 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 1 0000010 0 0
            0 1 1111010 1 0000000 0 0000000 0 0000000 0 0000000 0 0111011 1 0111011 1 1100000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 1 1111010 1 0
            0 1 0100010 1 0000000 0 0000000 0 0000000 0 0000000 0 0000010 0 0100010 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 1 0001010 1 0
            0 1 0101110 1 0000000 0 0000000 0 0001011 1 1111111 1 1111011 1 0111010 1 1111000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 1 0101010 1 0
            0 1 0100000 1 0000000 0 0000000 0 0001010 1 0001010 0 0001000 0 0001010 1 0001000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 1 0101010 1 0
            0 1 0111111 1 0000000 0 0000000 0 0001010 1 0111011 1 0001111 1 0111010 1 1101010 0 0000000 0 0000000 0 0000000 0 0001000 0 0000000 1 1101011 1 0
            0 0 0000000 1 0000000 0 0000000 0 0001000 1 0100000 1 0000000 1 0001010 0 0101010 0 0000000 0 0000000 0 0000000 0 0001000 0 0000000 0 0000000 0 0
            0 0 0000000 1 1100000 0 0000000 0 0001111 1 0101111 1 0000000 1 1101011 1 1101011 1 0000000 0 0000000 1 0100000 0 0111110 0 0000000 0 0000000 0 0
            0 0 0000000 0 0100000 0 0000000 0 0001000 1 0001000 0 0000000 0 0100000 0 0001010 0 0000000 0 0000000 1 0100000 0 0100010 0 0000000 0 0000000 0 0
            0 0 0000000 1 1101110 0 0000000 0 0001110 1 1101111 1 0000000 0 0111111 1 1101111 1 1100000 0 0000011 1 0111000 1 1101011 1 0000000 0 0000000 0 0
            0 0 0000000 1 0001000 0 0000000 0 0000010 0 0000010 0 0000000 0 0001000 0 0000010 0 0100000 0 0000010 1 0001000 0 0101000 1 0000000 0 0000000 0 0
            0 0 0000000 1 1101111 1 0000000 0 0001011 1 0111110 1 0000000 0 0001111 1 0111110 1 1101000 0 0001110 1 1101111 1 0101010 1 1100000 0 0000000 0 0
            0 0 0000000 0 0100010 1 0000000 0 0001000 0 0000010 1 0000000 0 0000010 1 0100010 1 0001000 0 0001000 1 0001000 1 0101010 1 0000000 0 0000000 0 0
            0 0 0000000 1 1111110 1 0000000 0 0001111 1 1111110 1 0000000 0 0000010 1 1101110 1 1111110 0 0111011 1 0111000 1 1101110 1 1111000 0 0000000 0 0
            0 0 0000000 1 0000000 1 0000000 0 0001000 0 0000010 1 0000000 0 0000000 0 0100010 1 0000010 0 0100000 0 0100000 0 0000010 0 0001000 0 0000000 0 0
            0 0 0000000 1 0101110 1 0000000 0 0001011 1 1101110 1 0000000 0 0000000 0 0101110 1 0000010 1 1111011 1 1100000 0 0111110 1 1101010 0 0000000 0 0
            0 0 0000000 1 0101000 1 0000000 0 0001010 0 0101010 1 0000000 0 0000000 0 0001000 0 0000010 1 0001010 0 0000000 0 0100010 1 0101010 0 0000000 0 0
            0 0 0000000 1 0111011 1 0000000 0 0001010 1 0101011 1 0000000 0 0000000 0 0001000 0 0000010 1 0111011 1 0000011 1 1111010 1 0111011 1 0000000 0 0
            0 0 0000000 1 0001010 1 0000000 0 0001000 1 0101000 0 0000000 0 0000000 0 0000000 0 0000010 0 0100010 1 0000010 0 0100010 1 0001000 1 0000000 0 0
            0 0 0000000 1 1101110 1 0000000 0 0001111 1 0111111 1 0000000 0 0000000 0 0000000 1 1111010 1 1101110 1 0111110 1 0100011 1 1101111 1 0100000 0 0
            0 0 0000000 0 0100000 1 0000000 0 0000000 1 0001000 1 0000000 0 0000000 0 0000000 1 0001010 1 0001000 1 0100000 1 0100000 1 0001000 0 0100000 0 0
            0 0 0000011 1 1111011 1 0000000 0 0001011 1 1101010 1 0000000 0 0000000 0 0000000 1 0101011 1 0111000 1 0101111 1 0100000 1 1101011 1 1100000 0 0
            0 0 0000010 0 0001010 0 0000000 0 0001010 0 0100010 1 0000000 0 0000000 0 0000000 1 0101000 0 0100000 1 0001000 0 0100000 0 0101010 0 0100000 0 0
            0 0 0000011 1 0111011 1 0000000 0 0001111 1 0111110 1 0000000 0 0000000 0 0000011 1 0111111 1 1100000 1 1111110 1 1100000 0 0101010 1 1111000 0 0
            0 0 0000010 1 0100010 1 0000000 0 0000000 1 0100010 1 0000000 0 0000000 0 0000010 1 0001000 1 0000000 0 0000010 0 0100000 0 0101000 1 0000000 0 0
            0 0 0000010 1 0101110 1 0000000 0 0001110 1 0101110 1 0000000 0 0000000 0 0001110 1 1101010 1 0000000 1 1101111 1 0100000 0 0101111 1 0111000 0 0
            0 0 0000010 1 0000010 1 0000000 0 0001010 0 0101000 1 0000000 0 0000000 0 0001000 0 0001010 1 0000000 1 0000000 1 0100000 0 0000000 1 0101000 0 0
            0 0 0000010 1 1101110 1 0000000 0 0001011 1 1101011 1 0000000 0 0000000 1 1111110 1 1111110 1 0000000 1 1111111 1 0100000 0 0001011 1 1101000 0 0
            0 0 0000010 0 0101000 0 0000000 0 0001000 0 0001010 1 0000000 0 0000000 0 0100000 1 0100000 0 0000000 0 0100000 0 0100000 0 0001010 1 0000000 0 0
            0 0 0001111 1 0101110 0 0000000 0 0001011 1 0111010 1 0000000 0 0000011 1 0101110 1 0100000 0 0000000 1 1101111 1 1100000 0 0001110 1 1111000 0 0
            0 0 0001000 0 0100010 0 0000000 0 0001000 1 0100010 1 0000000 0 0000000 1 0001000 1 0000000 0 0000000 1 0001000 0 0100000 0 0000010 0 0001000 0 0
            0 0 0001110 1 0101110 0 0000000 0 0001111 1 0101110 1 0000000 0 0001110 1 1111011 1 0000000 0 0000000 1 0111011 1 1100000 0 0000011 1 0111000 0 0
            0 0 0000010 1 0101000 0 0000000 0 0000010 0 0101000 1 0000000 0 0001010 1 0100010 0 0000000 0 0000000 1 0000010 0 0100000 0 0000000 0 0000000 0 0
            0 0 0111110 1 0101000 0 0000000 0 0001010 1 1101010 1 0000000 0 0111011 1 0101110 0 0000000 0 0000000 1 1101110 1 1100000 0 0000000 0 0000000 0 0
            0 0 0100000 1 0101000 0 0000000 0 0001010 0 0100010 1 0000000 0 0001000 0 0101000 0 0000000 0 0000000 0 0100000 1 0100000 0 0000000 0 0000000 0 0
            0 1 0101111 1 0101000 0 0000000 0 0001011 1 0111110 1 0000011 1 1101110 1 1111000 0 0000000 0 0000000 1 0111011 1 0100000 0 0000000 0 0000000 0 0
            0 1 0100010 1 0001000 0 0000000 0 0001000 0 0100000 1 0000010 0 0100010 1 0000000 0 0000000 0 0000000 1 0001010 0 0100000 0 0000000 0 0000000 0 0
            0 1 0111010 1 1111000 0 0000000 0 0001110 1 1101110 1 1111110 1 0111010 1 0000000 0 0000000 0 0000000 1 1111010 1 1100000 0 0000000 0 0000000 0 0
            0 1 0000010 1 0000000 0 0000000 0 0000010 0 0100010 1 0000000 1 0100010 0 0000000 0 0000000 0 0000000 0 0101010 0 0100000 0 0000000 0 0000000 0 0
            0 1 0111110 1 0100000 0 0000000 0 0001111 1 0111110 1 0111011 1 0101110 0 0000000 0 0000000 0 0000000 1 1101010 1 0100000 0 0000000 0 0000000 0 0
            0 1 0100010 1 0100000 0 0000000 0 0001000 0 0000000 0 0001010 0 0001000 0 0000000 0 0000000 0 0000000 1 0001000 1 0100000 0 0000000 0 0000000 0 0
            0 1 0101110 1 1100000 0 0000000 0 0001110 1 1111110 1 1111111 1 0111000 0 0000000 0 0000000 0 0000000 1 0101111 1 0100000 0 0000000 0 0000000 0 0
            0 1 0100000 1 0100000 0 0000000 0 0000010 1 0000010 1 0000000 0 0100000 0 0000000 0 0000000 0 0000000 1 0100000 1 0100000 0 0000000 0 0000000 0 0
            0 1 1101111 1 0100000 0 0000000 0 0000010 1 0111011 1 0111011 1 0111111 1 1111110 1 1111111 1 1111011 1 0111110 1 0100000 0 0000000 0 0000000 0 0
            0 0 0001000 0 0100000 0 0000000 0 0000010 1 0001010 1 0100010 1 0000000 0 0100010 1 0000000 0 0001010 1 0000010 0 0100000 0 0000000 0 0000000 0 0
            0 0 0001110 1 1100000 0 0000000 0 0001110 1 1101010 1 0111110 1 1101111 1 1101110 1 0111111 1 1101010 1 1101111 1 1100000 0 0000000 0 0000000 0 0
            0 0 0000010 0 0000000 0 0000000 0 0001000 1 0001010 1 0001000 0 0101000 1 0101000 1 0100010 1 0101010 0 0001000 0 0000000 0 0000000 0 0000000 0 0
            0 0 0000011 1 0000000 0 0000000 1 1111111 1 0111010 1 1111110 1 1101010 1 0101011 1 0101010 1 0101010 1 1111011 1 1100000 0 0000000 0 0000000 0 0
            0 0 0000000 1 0000000 0 0000000 0 0100000 1 0101000 0 0000010 1 0001010 0 0101010 1 0001010 1 0000010 1 0000010 1 0000000 0 0000000 0 0000000 0 0
            0 0 0000000 1 0000011 1 1111111 1 0101111 1 0101110 1 1101010 1 1111011 1 1101010 1 1111010 1 1111110 1 1111110 1 0000000 0 0000000 0 0000000 0 0
            0 0 0000000 1 0000010 0 0001000 0 0001000 0 0100010 1 0101000 0 0000000 0 0001010 0 0001000 0 0000000 0 0000000 1 0000000 0 0000000 0 0000000 0 0
            0 0 0000011 1 0111111 1 1101111 1 1111011 1 1100011 1 0111111 1 1111110 1 1101011 1 1101111 1 1111111 1 1111111 1 0000000 0 0000000 0 0000000 0 0
            0 0 0000010 0 0000010 0 0100000 0 0000010 0 0000000 0 0000000 0 0001000 1 0101010 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0
            0 0 0001111 1 1111110 1 1101110 1 1111110 0 0000000 0 0000000 0 0111011 1 0111010 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0
            0 0 0001000 0 0001000 0 0001000 1 0000000 0 0000000 0 0000000 0 0100010 0 0000010 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0
            0 0 0001111 1 1101111 1 1111011 1 0000000 0 0000000 0 0000000 0 0101110 1 0111010 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0
            0 0 0000010 0 0000000 0 0000010 0 0000000 0 0000000 0 0000000 0 0100010 1 0101010 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0
            0 0 0001111 1 1111011 1 1111110 0 0000000 0 0000000 0 0000000 0 0111010 1 1101010 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0
            0 0 0000000 1 0000000 1 0000000 0 0000000 0 0000000 0 0000000 0 0001010 0 0001010 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0
            0 0 0000011 1 1101111 1 0000000 0 0000000 0 0000000 0 0000000 0 0111011 1 0111110 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0
            0 0 0000000 1 0101000 0 0000000 0 0000000 0 0000000 0 0000000 0 0100000 1 0100000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0
            0 0 0000000 1 0101000 0 0000000 0 0000000 0 0000000 0 0000000 0 0101110 1 0111110 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0
            0 0 0000000 0 0101000 0 0000000 0 0000000 0 0000000 0 0000000 0 0101000 1 0000010 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0
            0 0 0000000 1 1101011 1 1100000 0 0000000 0 0000000 0 0000000 0 0111011 1 1101110 0 0000000 0 0000000 0 0000000 0 0000011 1 1101111 6 0000000 0 0
            0 0 0000000 1 0001000 0 0100000 0 0000000 0 0000000 0 0000000 0 0100010 0 0100010 0 0000000 0 0000000 0 0000000 0 0000010 0 0101000 0 0000000 0 0
            0 0 0000000 1 0111111 1 0100000 0 0000000 0 0000000 0 0000000 0 0101110 1 0111010 0 0000000 0 0000000 0 0000000 0 0000010 1 0101011 1 0000000 0 0
            0 0 0000000 1 0100000 1 0100000 0 0000000 0 0000000 0 0000000 0 0101000 1 0000010 0 0000000 0 0000000 0 0000000 0 0000010 1 0001000 1 0000000 0 0
            0 0 0000000 1 0101111 1 0100000 0 0000000 0 0000000 0 0000000 0 0101011 1 0111010 0 0000000 0 0000000 0 0000000 0 0000010 1 1111110 1 0000000 0 0
            0 0 0000000 1 0101000 1 0100000 0 0000000 0 0000000 0 0000000 0 0101000 1 0001010 0 0000000 0 0000000 0 0000000 0 0000010 0 0000010 1 0000000 0 0
            0 0 0000000 1 0101010 1 0100000 0 0000000 0 0000000 0 0000000 0 0101011 1 1101010 0 0000000 0 0000000 0 0000000 0 0000010 1 1111011 1 0000000 0 0
            0 0 0000000 1 0100010 1 0100000 0 0000000 0 0000000 0 0000000 0 0100010 0 0101010 0 0000000 0 0000000 0 0000000 0 0000010 1 0001000 1 0000000 0 0
            0 0 0000000 1 0111110 1 0100000 0 0000000 0 0000000 0 0000000 0 0111110 1 1101110 0 0000000 0 0000000 0 0000000 0 0000010 1 1101011 1 0000000 0 0
            0 0 0000000 1 0000010 1 0100000 0 0000000 0 0000000 0 0000000 0 0001000 0 0001010 0 0000000 0 0000000 0 0000000 0 0000010 0 0001010 0 0000000 0 0
            0 0 0000000 1 0101110 1 0100000 0 0000000 0 0000000 0 0000000 0 0111011 1 1101010 0 0000000 0 0000000 0 0000000 0 0000011 1 0111010 1 0000000 0 0
            0 0 0000000 1 0101000 1 0100000 0 0000000 0 0000000 0 0000000 0 0100010 0 0100010 0 0000000 0 0000000 0 0000000 0 0000010 0 0100010 1 0000000 0 0
            0 0 0000000 1 0111011 1 0100000 0 0000000 0 0000000 0 0000000 0 0111110 1 0111010 0 0000000 0 0000000 0 0000000 0 0000011 1 1101110 1 0000000 0 0
            0 0 0000000 1 0001010 0 0100000 0 0000000 0 0000000 0 0000000 0 0001000 1 0001010 0 0000000 0 0000000 0 0000000 0 0000000 1 0001000 1 0000000 0 0
            0 0 0000000 1 0111011 1 0100000 0 0000000 0 0000000 0 0000000 0 0111010 1 0101110 0 0000000 0 0000000 0 0000000 0 0000011 1 0111111 1 0000000 0 0
            0 0 0000000 1 0100000 1 0100000 0 0000000 0 0000000 0 0000000 0 0100010 1 0100000 0 0000000 0 0000000 0 0000000 0 0000010 1 0100000 0 0000000 0 0
            0 0 0000000 1 0111110 1 1100000 0 0000000 0 0000000 0 0000000 0 0111111 1 1111110 0 0000000 0 0000000 0 0000000 0 0000010 1 1101111 1 0000000 0 0
            0 0 0000000 1 0101000 1 0100000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000010 0 0000000 0 0000000 0 0000000 0 0000010 1 0000000 1 0000000 0 0
            0 0 0000000 1 0101110 1 0111011 1 1101111 1 0111110 1 1101111 1 0101110 1 1111010 1 1111011 1 0101110 1 1111011 1 1101110 1 0111110 1 0000000 0 0
            0 0 0000000 1 0100010 1 0000010 0 0000010 0 0000010 1 0001000 1 0101000 1 0000010 0 0101010 1 0101010 1 0101010 0 0100000 1 0100010 1 0000000 0 0
            0 0 0000000 1 0101110 1 0111011 1 1101010 1 0111010 1 1111011 1 0101111 1 0111010 1 1101010 1 0101010 1 0101010 1 1101111 1 0101011 1 0000000 0 0
            0 0 0000000 1 0101010 1 0001000 0 0101010 1 0100010 0 0100010 0 0101000 1 0100010 1 0001000 1 0101010 1 0101010 0 0001000 0 0101000 1 0000000 0 0
            0 0 0000000 1 0101010 1 1101111 1 0101010 1 0111110 1 0101010 1 1111011 1 1101010 1 1101111 1 0101010 1 0101011 1 1111011 1 1111110 1 0000000 0 0
            0 0 0000000 1 0101000 0 0101010 0 0101010 1 0100010 1 0101010 1 0001010 0 0101010 1 0101000 1 0101010 1 0101010 0 0001010 0 0000010 0 0000000 0 0
            0 0 0000000 1 0101110 1 1111011 1 1101010 1 0101010 1 0101011 1 0111010 1 0101010 1 0101010 1 0101010 1 0101010 1 1101010 1 1111011 1 0000000 0 0
            0 0 0000000 1 0100000 0 0000000 0 0001010 1 0101010 1 0101000 0 0101000 1 0101000 1 0001010 1 0100010 1 0101010 0 0101010 1 0001000 1 0000000 0 0
            0 0 0000000 1 0111111 1 1111111 1 1111111 1 1111011 1 1111011 1 1101111 1 0111111 1 1101110 1 1111111 1 0101111 1 1101110 1 0101110 1 0000000 0 0
            0 0 0000000 0 0000000 0 0100000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000010 1 0100000 1 0000000 0 0
            0 0 0000000 1 1111111 1 1100000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000011 1 0111111 1 0000000 0 0
            0 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0000000 0 0
          `).split("\n");
        for (let y = 0; y < 115; y++) {
          cells[y] = cells[y + 1].replace(/\s/g, "").split("");
          for (let x = 0; x < 115; x++) {
            cells[y][x] = Number(cells[y][x]);
          }
        }

        //  player
        player = { x: 49, y: 1 };

        //  表示
        for (let y = 0; y < height * 2 + 1; y++) {
          for (let x = 0; x < width * 2 + 1; x++) {
            Draw(x, y);
          }
        }
      } else {
        //  normal
        Build();
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        for (let y = 0; y < height * 2 + 1; y++) {
          for (let x = 0; x < width * 2 + 1; x++) {
            Draw(x, y);
          }
        }
      }

      //  キーボード操作
      document.addEventListener("keydown", function () {
        if (event.key == "d" || event.key == "ArrowRight") Move(0, 1);
        else if (event.key == "w" || event.key == "ArrowUp") Move(1, 1);
        else if (event.key == "a" || event.key == "ArrowLeft") Move(2, 1);
        else if (event.key == "s" || event.key == "ArrowDown") Move(3, 1);
      });

      //  スワイプ操作
      //  https://dianxnao.com/javascript%E3%81%A7%E3%82%B9%E3%83%AF%E3%82%A4%E3%83%97%E5%87%A6%E7%90%86%E3%82%92%E3%81%99%E3%82%8B/
      document.addEventListener("touchstart", function (e) {
        e.preventDefault();
        touch[0] = e.touches[0].pageX;
        touch[1] = e.touches[0].pageY;
        touch[2] = e.touches[0].pageX;
        touch[3] = e.touches[0].pageY;
      });
      document.addEventListener("touchmove", function (e) {
        e.preventDefault();
        touch[2] = e.touches[0].pageX;
        touch[3] = e.touches[0].pageY;
      });
      document.addEventListener("touchend", function (e) {
        console.log("touch");
        console.log(touch);
        if (Math.abs(touch[0] - touch[2]) > 30 || 30 < Math.abs(touch[1] - touch[3])) {
          if (Math.abs(touch[0] - touch[2]) < Math.abs(touch[1] - touch[3])) {
            //上下操作
            Move(touch[1] < touch[3] ? 3 : 1, 1);
          } else {
            //左右操作
            Move(touch[0] < touch[2] ? 0 : 2, 1);
          }
        }
        touch = [0, 0, 0, 0];
      });

      //  操作の許可
      ctrl = 1;
    }
  }

  //  build maze gradually
  function Animation_Build() {
    //  ビルダー宣言・スタート地点座標取得
    let builder = {
      x: Math.floor(Math.random() * width) * 2 + 1,
      y: Math.floor(Math.random() * height) * 2 + 1,
      route: [],
      max_distance: 0,
    };

    //  全て壁にする
    cells = [];
    for (let y = 0; y < height * 2 + 1; y++) {
      cells.push([]);
      for (let x = 0; x < width * 2 + 1; x++) {
        cells[y].push(0);
      }
    }

    //  スタート地点設定
    builder.start = { x: builder.x, y: builder.y };
    cells[builder.y][builder.x] = 1;
    Draw(builder.x, builder.y);
    builder.goal = { x: builder.x, y: builder.y };

    let interval = setInterval(() => {
      //  進行可能方向の配列
      builder.directions = [];
      if (builder.x + 2 < width * 2)
        if (cells[builder.y][builder.x + 2] !== 1)
          builder.directions.push(0);
      if (1 <= builder.y - 2)
        if (cells[builder.y - 2][builder.x] !== 1)
          builder.directions.push(1);
      if (1 <= builder.x - 2)
        if (cells[builder.y][builder.x - 2] !== 1)
          builder.directions.push(2);
      if (builder.y + 2 < height * 2)
        if (cells[builder.y + 2][builder.x] !== 1)
          builder.directions.push(3);

      //console.log(builder.route);
      if (builder.directions.length) {
        //  進めるとき, ランダムな方向に曲がる
        builder.direction = builder.directions[Math.floor(Math.random() * builder.directions.length)];
        builder.route.push(builder.direction);
      } else if (1 < builder.route.length) {
        //  進めないとき, 戻る
        builder.direction = (builder.route.pop() + 2) % 4;
      } else {
        //  スタート地点に戻ってきたとき, 終了する
        clearInterval(interval);//////////////////////////////////////////////////////////////////////////////////////////////
        console.log("clearinterval");
        Draw(builder.x, builder.y);
        setTimeout(() => {
          //  スタート地点・ゴール地点入れ替え
          cells[builder.start.y][builder.start.x] = 6;
          Draw(builder.start.x, builder.start.y);
          cells[builder.goal.y][builder.goal.x] = 5;
          Draw(builder.goal.x, builder.goal.y);
          setTimeout(() => {
            //  プレイヤー設置
            player.x = builder.goal.x;
            player.y = builder.goal.y;
            console.log(cells);
            setTimeout(() => {
              //  経路探索
              console.log("solve");
              OnClick = () => {
                Animation_Solve();
                OnClick = () => { };
              }
            }, 70);
          }, 70);
        }, 70);
      }

      //console.log(1<builder.route.length,!builder.max_distance);
      if (1 < builder.route.length || !builder.max_distance) {
        //  interval継続時
        //  cells更新
        Draw(builder.x, builder.y);
        for (let i = 0; i < 2; i++) {
          //  その方向へ2マス進む
          builder.x += (builder.direction % 2 ? 0 : 1) * (builder.direction < 2 ? 1 : -1);
          builder.y += (builder.direction % 2 ? 1 : 0) * (builder.direction < 2 ? -1 : 1);
          cells[builder.y][builder.x] = 1;
          Draw(builder.x, builder.y);
        }

        //  最遠点にゴール地点を設定
        if (builder.max_distance < builder.route.length) {
          builder.max_distance = builder.route.length;
          cells[builder.goal.y][builder.goal.x] = 1;
          Draw(builder.goal.x, builder.goal.y);
          builder.goal = { x: builder.x, y: builder.y };
        }
        //console.log(builder.route);
        cells[builder.goal.y][builder.goal.x] = 6;
        Draw(builder.goal.x, builder.goal.y);
        cells[builder.goal.y][builder.goal.x] = 1;
        cells[builder.start.y][builder.start.x] = 5;
        Draw(builder.start.x, builder.start.y);
        cells[builder.start.y][builder.start.x] = 1;
        Draw(builder.x, builder.y, 1);
      }
    }, 70);
  }

  //  solve maze gradually
  function Animation_Solve() {
    player.route = [];
    player.directions = [];

    let interval = setInterval(() => {
      //  進行可能方向の配列(1,6)
      player.directions = [];
      if (player.x + 2 < width * 2)
        if (cells[player.y][player.x + 1] === 1)
          player.directions.push(0);
      if (1 <= player.y - 2)
        if (cells[player.y - 1][player.x] === 1)
          player.directions.push(1);
      if (1 <= player.x - 2)
        if (cells[player.y][player.x - 1] === 1)
          player.directions.push(2);
      if (player.y + 2 < height * 2)
        if (cells[player.y + 1][player.x] === 1)
          player.directions.push(3);

      //console.log(player.route);
      if (player.directions.length) {
        //  進めるとき, 位相が最小の方向に曲がる
        player.direction = player.directions[0];
        player.route.push(player.direction);
      } else {
        //  進めないとき, 戻る
        player.direction = (player.route.pop() + 2) % 4;
      }


      //  move
      if (Move(player.direction, 1) < 0) {
        console.log("end?")
        //  ゴール地点に着いたとき, 終了する
        clearInterval(interval);
        console.log("solved");
      }
    }, 70);
  }

  //  build maze in cells
  function Build() {
    //  ビルダー宣言・スタート地点座標取得
    let builder = {
      x: Math.floor(Math.random() * width) * 2 + 1,
      y: Math.floor(Math.random() * height) * 2 + 1,
      route: [],
      max_distance: 0
    };

    //  全て壁にする
    cells = [];
    for (let y = 0; y < height * 2 + 1; y++) {
      cells.push([]);
      for (let x = 0; x < width * 2 + 1; x++) {
        cells[y].push(0);
      }
    }

    //  スタート地点設定
    builder.start = { x: builder.x, y: builder.y };
    cells[builder.y][builder.x] = 1;

    while (1) {
      //  進行可能方向の配列
      builder.directions = [];
      if (builder.x + 2 < width * 2)
        if (cells[builder.y][builder.x + 2] !== 1)
          builder.directions.push(0);
      if (1 <= builder.y - 2)
        if (cells[builder.y - 2][builder.x] !== 1)
          builder.directions.push(1);
      if (1 <= builder.x - 2)
        if (cells[builder.y][builder.x - 2] !== 1)
          builder.directions.push(2);
      if (builder.y + 2 < height * 2)
        if (cells[builder.y + 2][builder.x] !== 1)
          builder.directions.push(3);

      //  進める方向がないとき戻る
      if (builder.directions.length) {
        builder.direction = builder.directions[Math.floor(Math.random() * builder.directions.length)];
        builder.route.push(builder.direction);
      } else if (1 < builder.route.length) {
        builder.direction = (builder.route.pop() + 2) % 4;
      } else {
        break;
      }

      //  cells更新
      for (let i = 0; i < 2; i++) {
        builder.x += (builder.direction % 2 ? 0 : 1) * (builder.direction < 2 ? 1 : -1);
        builder.y += (builder.direction % 2 ? 1 : 0) * (builder.direction < 2 ? -1 : 1);
        cells[builder.y][builder.x] = 1;
      }

      //  最遠点にゴール地点を設定
      if (builder.max_distance < builder.route.length) {
        builder.max_distance = builder.route.length;
        builder.goal = { x: builder.x, y: builder.y };
      }
      //console.log(builder.route);
    }

    //  スタート地点・ゴール地点入れ替え
    cells[builder.start.y][builder.start.x] = 6;
    cells[builder.goal.y][builder.goal.x] = 5;

    //  プレイヤー設置
    player.x = builder.goal.x;
    player.y = builder.goal.y;

    console.log(cells);
  }

  //  自動経路探索()
  function Solve() {
    for (let i = 0; i < 4; i++) {
      if (Search(i)) return true;
    }
    return false;

    function Search(D) {
      let bool = Move(D);
      //console.log(player.x,player.y);

      if (!bool) return false;
      if (bool === 2) {
        Move((D + 2) % 4);
        return false;
      }

      if (cells[player.y][player.x] === 6) {
        return true;
      }

      for (let i = 0; i < 4; i++) {
        if (Search((i + D + 3) % 4)) return true;
      }
      Move((D + 2) % 4);
      return false;
    }
  }

  //  プレイヤーの移動
  function Move(d, b) {
    let rtn = 1;
    if (!time[0]) time[0] = Number(String(new Date().getTime()));

    //  先のブロック
    if (cells[player.y + (d % 2 ? 1 : 0) * (d < 2 ? -1 : 1)][player.x + (d % 2 ? 0 : 1) * (d < 2 ? 1 : -1)]) {
      //  壁でない
      let dx = (d % 2 ? 0 : 1) * (d < 2 ? 1 : -1);
      let dy = (d % 2 ? 1 : 0) * (d < 2 ? -1 : 1);
      for (let i = 0; i < 2; i++) {
        if (Math.abs(cells[player.y + dy][player.x + dx] - 3.5) === 1.5) {
          //  通過済みまたはスタート地点
          cells[player.y][player.x] = 3;
          if (b) Draw(player.x, player.y);
          player.x += dx;
          player.y += dy;
        } else {
          //  それ以外
          player.x += dx;
          player.y += dy;
          if (cells[player.y][player.x] === 6) {
            //  ゴール
            Clear();
            return -1;
          } else if (cells[player.y][player.x] === 3) {
            //  すでに通った道
            cells[player.y][player.x] = 2;
            if (b) Draw(player.x, player.y);
            rtn = 2;
          } else {
            //  未踏の道
            cells[player.y][player.x] = 2;
            if (b) Draw(player.x, player.y);
          }
        }
      }
      return rtn;
    } else {
      return 0;
    }
  }

  //  クリア
  function Clear() {
    ctrl = 0;
    time[1] = Number(String(new Date().getTime()));
    time[2][0] = time[1] - time[0];
    time[2][1] = time[2][0] % 1000;//cs
    time[2][2] = (time[2][0] - time[2][1]) / 1000 % 60//sec
    time[2][3] = (time[2][0] - time[2][1] - time[2][2] * 1000) / 60000//min

    for (let y = 0; y < height * 2 + 1; y++) {
      for (let x = 0; x < width * 2 + 1; x++) {
        if (cells[y][x] === 2) {
          cells[y][x] = 4;
          Draw(x, y);
        }
      }
    }

    setTimeout(function () {
      alert(
        ctrl
          ?
          "Auto Solve\n" +
          (mode === -1 ? "密map" : "Size : " + width + "*" + height) + "\n" +
          "Time : " +
          time[2][3] + "分" +
          String(time[2][2]).padStart(2, '0') + '.' + String(time[2][1]).padStart(3, '0') + "秒"
          :
          "Congratulations!\n" +
          (mode === -1 ? "密map" : "Size : " + width + "*" + height) + "\n" +
          "Time : " +
          time[2][3] + "分" +
          String(time[2][2]).padStart(2, '0') + '.' + String(time[2][1]).padStart(3, '0') + "秒"
      );
      time = [0, 0, []];
    }, 100);
  }
})();
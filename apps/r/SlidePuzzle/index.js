(() => {
  const rootPath = getFileRef("SlidePuzzle", "root");
  let width = 4;
  let height = 4;
  let img = new Image();
  img.src = `${rootPath}assets/Slide Puzzle.png`;
  let cells;
  let move;
  let pick;
  let ctrl;
  let time;

  let len = Math.round(Math.min(window.innerWidth / width, window.innerHeight / height) * 0.9);
  let cvs = document.createElement("canvas");
  cvs.onclick = (e)=>{OnClick(e)};
  cvs.className = "cvs-single";
  cvs.style.backgroundImage = `url(${rootPath}assets/202020-o.png)`;
  cvs.width = len * width;
  cvs.height = len * height;
  document.querySelector("#main").appendChild(cvs);
  let ctx = cvs.getContext("2d");
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "black";
  ctx.shadowOffsetX = len / 16;
  ctx.shadowOffsetY = len / 16;
  ctx.shadowBlur = len / 8;

  let gvs = document.createElement("canvas");
  gvs.style.position = "absolute";
  gvs.style.transition =  ".15s";
  gvs.style.top =  "-1000px";
  gvs.style.left =  "-1000px";
  gvs.style.opacity =  "1";
  gvs.style.display =  "inline-block";
  cvs.style.zIndex = "10";
  gvs.width = len;
  gvs.height = len;
  document.querySelector("#main").appendChild(gvs);
  gtx = gvs.getContext("2d");
  gtx.textAlign = "center";
  gtx.textBaseline = "middle";




  window.onload = () => {
    Draw();
  }












  function OnClick(e) {
    const rect = cvs.getBoundingClientRect();
    const x = (e.clientX - rect.left) * 4 / rect.width;
    const y = (e.clientY - rect.top) * 4 / rect.height;
    let rr = (a, b) => a * a + 2 * b * b + a * Math.abs(a) - .2;
    let i;

    if (.625 < y && y < 1.375) {
      //  width
      i = width + Math.round(.601345 * Math.sin(Math.PI * (1 - x / 2)));
      if (i < 2) width = height - 1 ? 1 : 2;
      else width = i;
    } else if (2.125 < y && y < 2.875) {
      //  height
      i = height + Math.round(.601345 * Math.sin(Math.PI * (1 - x / 2)));
      if (i < 2) height = width - 1 ? 1 : 2;
      else height = i;
    } else if (rr(Math.abs(x - 2) - 1, y - 3.5) < 0) {
      //  start
      len = Math.round(Math.min(window.innerWidth / width, window.innerHeight / height) * 0.9);
      cvs.width = len * width;
      cvs.height = len * height;
      cvs.style.background = "none";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      gvs.width = len;
      gvs.height = len;
      gtx.textAlign = "center";
      gtx.textBaseline = "middle";
      setTimeout(function () {
        OnClick = () => 0;
        Init();
      }, 100);
      return false;
    }

    Draw();
    cvs.style.backgroundSize = "" + 100 / width + "% " + 100 / height + "%";
  }

  function Draw() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = "#ffd000";
    ctx.font = "bold " + len * .5 + "px serif";
    ctx.fillText("WIDTH", len * 2, len * .25);
    ctx.drawImage(img, 0, 0, 64, 64, len * .625, len * .625, len * .75, len * .75);
    ctx.drawImage(img, 0, 0, 64, 64, len * .625, len * 2.125, len * .75, len * .75);
    ctx.globalAlpha = 2 < Math.sign((height - 1) ** 2) + width ? 1 : .5;
    ctx.drawImage(img, 0, 64, 64, 64, len * 2.625, len * .625, len * .75, len * .75);
    ctx.globalAlpha = 2 < Math.sign((width - 1) ** 2) + height ? 1 : .5;
    ctx.drawImage(img, 0, 64, 64, 64, len * 2.625, len * 2.125, len * .75, len * .75);
    ctx.globalAlpha = 1;
    ctx.fillText("HEIGHT", len * 2, len * 1.75);

    ctx.font = "bold " + len * .75 ** Math.floor(Math.log10(width)) + "px serif";
    ctx.fillText(width, len * 2, len);
    ctx.font = "bold " + len * .75 ** Math.floor(Math.log10(height)) + "px serif";
    ctx.fillText(height, len * 2, len * 2.5);

    ctx.fillStyle = "#e0e0e0";
    ctx.beginPath();
    ctx.arc(len * 3, len * 3.5, len * .35, Math.PI / 2, -Math.PI / 2, true);
    ctx.arc(len * 1, len * 3.5, len * .35, -Math.PI / 2, Math.PI / 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#808080";
    ctx.beginPath();
    ctx.arc(len * 3, len * 3.5, len * .3, Math.PI / 2, -Math.PI / 2, true);
    ctx.arc(len * 1, len * 3.5, len * .3, -Math.PI / 2, Math.PI / 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#ffd000";
    ctx.font = "bold " + len * .5 + "px serif";
    ctx.fillText("START", len * 2, len * 3.5);
  }



  function Init() {
    Draw = (i, x, y) => {
      if (i === 0) {
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.fillStyle = "#d0a020";//"#CE952C";
        for (y = 0; y < height; y++) {
          for (x = 0; x < width; x++) {
            ctx.drawImage(img, 64, 64 * (((cells[y][x] - 1) % width + Math.floor((cells[y][x] - 1) / width)) % 2), 64, 64, len * x, len * y, len, len);
            ctx.font = "bold " + len * .9 * .75 ** Math.floor(Math.log10(cells[y][x])) + "px serif";
            ctx.fillText(cells[y][x], len * (x + .5), len * (y + .5));
          }
        }
        if (move.b) ctx.clearRect(len * move.x, len * move.y, len, len);
        if (pick.b) ctx.clearRect(len * pick.x, len * pick.y, len, len);
      } else if (i === -1) {
        ctx.clearRect(len * x, len * y, len, len);
      } else {
        ctx.drawImage(img, 64, 64 * (((cells[y][x] - 1) % width + Math.floor((cells[y][x] - 1) / width)) % 2), 64, 64, len * x, len * y, len, len);
        ctx.font = "bold " + len * .9 * .75 ** Math.floor(Math.log10(cells[y][x])) + "px serif";
        ctx.fillText(cells[y][x], len * (x + .5), len * (y + .5));
      }
    };
    OnClick = (e) => {
      if (!time[0]) time[0] = Number(String(new Date().getTime()));
      if (!ctrl) return 0;
      const rect = cvs.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) * width / rect.width);
      const y = Math.floor((e.clientY - rect.top) * height / rect.height);
      if(width <= x)return;

      const wrrect = document.querySelector("#main").getBoundingClientRect();
      const L = rect.left - wrrect.left;
      const T = rect.top - wrrect.top;

      if (
        (cells[y][x + 1] === pick.n)
        || (cells[y + 1] && cells[y + 1][x] === pick.n)
        || (cells[y][x - 1] === pick.n)
        || (cells[y - 1] && cells[y - 1][x] === pick.n)
      ) {
        //  ゴーストをclick=>pick
        const temp = len;
        len = rect.width / width;
        gvs.style.transition = "0s";
        gvs.style.left = L + len * x + "px";
        gvs.style.top = T + len * y + "px";
        gtx.clearRect(0, 0, len, len);
        gtx.fillStyle = "#d0a020";
        gtx.drawImage(img, 64, 64 * (((cells[y][x] - 1) % width + Math.floor((cells[y][x] - 1) / width)) % 2), 64, 64, 0, 0, len, len);
        gtx.font = "bold " + len * .9 * .75 ** Math.floor(Math.log10(cells[y][x])) + "px serif";
        gtx.fillText(cells[y][x], len * .5, len * .5);
        len = temp;
        Draw(-1, x, y);
        len = rect.width / width;
        gvs.style.transition = ".15s";
        gvs.style.left = L + len * pick.x + "px";
        gvs.style.top = T + len * pick.y + "px";
        cells[pick.y][pick.x] = cells[y][x];
        cells[y][x] = pick.n;
        ctx.fillStyle = "#d0a020";
        ctrl = 0;
        setTimeout(function () {
          Draw(1, pick.x, pick.y);
          pick.x = x;
          pick.y = y;
          ctrl = 1;
          setTimeout(function () {
            Check();
          }, 10);
        }, 150);
      }
    }
    gvs.onclick = (e) => {
      let x = (+gvs.style.left.match(/[0-9]+/g)[0]) + len / 2;
      let y = (+gvs.style.top.match(/[0-9]+/g)[0]) + len / 2;
      OnClick({ offsetX: x, offsetY: y });
    }

    cells = [];
    for (let y = 0; y < height; y++) {
      cells.push([]);
      for (let x = 0; x < width; x++) {
        cells[y].push(x + y * width + 1);
      }
    }
    move = {
      b: 0,
      x: 0,
      y: 0
    };
    pick = {
      b: 1,
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    };
    pick.n = cells[pick.y][pick.x];
    ctrl = 1;
    time = [0, 0, []];
    gvs.style.left = "-1000px";
    gvs.style.top = "-1000px";

    Shuffle();
    Draw(0);
    ctx.fillStyle = "#a020d0";
    ctx.font = "bold " + len * .6 * .75 ** Math.floor(Math.log10(pick.n)) + "px serif";
    ctx.fillText(pick.n, len * (pick.x + .5), len * (pick.y + .5));
  }

  function Shuffle() {
    if (1 < width && 1 < height) {
      for (let t = 0; t < Math.max(width, height); t++) {
        for (let y = pick.y + 1; y < height; y++) {
          cells[pick.y][pick.x] = cells[y][pick.x];
          cells[y][pick.x] = pick.n;
          pick.y = y;
        }
        for (let x = pick.x + 1; x < width; x++) {
          cells[pick.y][pick.x] = cells[pick.y][x];
          cells[pick.y][x] = pick.n;
          pick.x = x;
        }
        let list = [], x, y, tmp;
        for (let i = 0; i < (width - 1) * (height - 1); i++)list.push(i);
        for (let i = list.length - 1; 0 <= i; i--) {
          list.push(list.splice(Math.floor(Math.random() * i), 1)[0]);
        }
        for (let i = 0; i < list.length; i++) {
          x = list[i] % (width - 1);
          y = Math.floor(list[i] / (width - 1));
          tmp = cells[y][x];
          cells[y][x] = cells[y][x + 1];
          cells[y][x + 1] = cells[y + 1][x];
          cells[y + 1][x] = tmp;
        }
        for (y = 0; y < height; y++) {
          for (x = 0; x < width; x++) {
            if (cells[y][x] === pick.n) {
              pick.x = x;
              pick.y = y;
              y = height;
              break;
            }
          }
        }
      }
    } else {
      let D, d;
      for (let i = 0; i < Math.random() * width * height; i++) {
        D = [];
        if (pick.x < width - 1) D.push([pick.x + 1, pick.y]);
        if (pick.y < height - 1) D.push([pick.x, pick.y + 1]);
        if (0 < pick.x) D.push([pick.x - 1, pick.y]);
        if (0 < pick.y) D.push([pick.x, pick.y - 1]);
        d = D[Math.floor(Math.random() * D.length)];
        cells[pick.y][pick.x] = cells[d[1]][d[0]];
        cells[d[1]][d[0]] = pick.n;
        pick.x = d[0];
        pick.y = d[1];
      }
    }
  }

  function Check() {
    let b = 1;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (cells[y][x] !== x + y * width + 1) b = 0;
      }
    }
    if (b) {
      //  clear
      ctrl = 0;
      time[1] = Number(String(new Date().getTime()));
      time[2][0] = time[1] - time[0];
      time[2][1] = time[2][0] % 1000;//cs
      time[2][2] = (time[2][0] - time[2][1]) / 1000 % 60//sec
      time[2][3] = (time[2][0] - time[2][1] - time[2][2] * 1000) / 60000//min

      const rect = cvs.getBoundingClientRect();

      const wrrect = document.querySelector("#main").getBoundingClientRect();
      const L = rect.left - wrrect.left;
      const T = rect.top - wrrect.top;

      gvs.style.transition = "0s";
      gvs.style.opacity = 0;
      gvs.style.left = L + len * pick.x + "px";
      gvs.style.top = T + len * pick.y + "px";
      gtx.fillStyle = "#d0a020";
      gtx.drawImage(img, 64, 64 * (((pick.n - 1) % width + Math.floor((pick.n - 1) / width)) % 2), 64, 64, 0, 0, len, len);
      gtx.font = "bold " + len * .9 * .75 ** Math.floor(Math.log10(pick.n)) + "px serif";
      gtx.fillText(pick.n, len * .5, len * .5);
      gvs.style.transition = ".2s";
      gvs.style.opacity = 1;

      setTimeout(function () {
        if (confirm(
          "Congratulations!\n" +
          "Size : " + width + "*" + height + "\n" +
          "Time : " +
          time[2][3] + "分" +
          String(time[2][2]).padStart(2, '0') + '.' + String(time[2][1]).padStart(3, '0') + "秒\n" +
          "Retry?"
        )) {
          Init();
        }
        time = [0, 0, []];
      }, 200);
    }
  }
})();
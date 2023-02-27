class Mouse {
  x = 0;
  y = 0;
  hover = false;
  clicked = false;
  ldown = false;
  
  constructor(ele) {
    this.ele = ele;
    ele.onclick = () => this.clicked = true;
    ele.onmouseenter = () => this.hover = true;
    ele.onmouseleave = () => this.hover = false;
    ele.onmousedown = () => this.ldown = true;
    ele.onmouseup = () => this.ldown = false;
    ele.onmousemove = e => {
      const rc = e.target.getBoundingClientRect();
      this.x = (e.clientX - rc.left) * 1000 / rc.width;
      this.y = (e.clientY - rc.top) * 1000 / rc.height;
    };
  }
}
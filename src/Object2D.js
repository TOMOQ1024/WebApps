class Object2D {
  constructor({ctx, onclick}){
    this.ctx = ctx;
    this.onclick = onclick;
    this.visible = true;
  }

  show(){
    this.visible = true;
  }

  hide(){
    this.visible = false;
  }

  updateCursor(mouse){
    if(this.onclick){
      this.hover = this.isIn(mouse.x, mouse.y);
      this.ctx.canvas.style.cursor = this.hover ? "pointer" : this.ctx.canvas.style.cursor;
      if(this.hover && mouse.clicked){
        this.onclick();
        mouse.clicked = false;
      }
    }
  }

  isIn(x, y){
    throw new Error("'isIn' method must be overridden at " + this.constructor.name + " class.");
  }
}

class GeometryObj2D extends Object2D {
  constructor({ctx, color, onclick}) {
    super({ctx:ctx, onclick:onclick});
    this.color = color;
  }

  draw(fs, ss){
    this.fill(fs);
    this.stroke(ss);
  }

  fill(fs=this.color){
    this.ctx.fillStyle = fs;
    this.ctx.fill();
  }

  stroke(ss=this.color){
    this.ctx.strokeStyle = ss;
    this.ctx.stroke();
  }
}

class RectObj2D extends GeometryObj2D {
  constructor(ctx, x, y, w, h, color) {
    super(ctx, color);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

class TriangleObj2D extends GeometryObj2D {
  constructor({ctx, x, y, w, h, angle=0, color, onclick}){
    super({ctx:ctx, color:color, onclick:onclick});
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angle = angle;
  }

  get vertexes(){
    const p = new Vec2(this.x, this.y);
    return [
      Vec2.sum(p,Vec2.rot(new Vec2(0,-this.h/2), this.angle)),
      Vec2.sum(p,Vec2.rot(new Vec2(this.w/2,this.h/2), this.angle)),
      Vec2.sum(p,Vec2.rot(new Vec2(-this.w/2,this.h/2), this.angle)),
    ];
  }

  draw(fs){
    this.fill(fs);
  }

  setPath(){
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.angle);
    this.ctx.beginPath();
    this.ctx.moveTo(0, -this.h/2);
    this.ctx.lineTo(this.w/2, this.h/2);
    this.ctx.lineTo(-this.w/2, this.h/2);
    this.ctx.closePath();
    this.ctx.restore();
  }

  fill(fs=this.color){
    this.ctx.fillStyle = fs;
    this.setPath();
    this.ctx.fill();
  }

  isIn(x, y){
    const p = new Vec2(x, y);
    const ov = this.vertexes;
    const vp = ov.map(v=>Vec2.dif(p,v));
    const c0 = Vec2.cross(Vec2.dif(ov[0],ov[2]), vp[0]);
    const c1 = Vec2.cross(Vec2.dif(ov[1],ov[0]), vp[1]);
    const c2 = Vec2.cross(Vec2.dif(ov[2],ov[1]), vp[2]);
    return (c0>0 && c1>0 && c2>0) || (c0<0 && c1<0 && c2<0);
  }
}

class TextObj2D extends Object2D {
  constructor({ctx, text, x, y, fontSize, fontFamily="serif", fontWeight="", color, onclick, align="center", baseline="middle", maxWidth}){
    super({ctx:ctx,onclick:onclick});
    this.text = text;
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.fontWeight = fontWeight;
    this.color = color;
    this.align = align;
    this.baseline = baseline;
    this.maxWidth = maxWidth;
  }

  setAlignments(){
    this.ctx.font = `${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;
    this.ctx.textAlign = this.align;
    this.ctx.textBaseline = this.baseline;
  }

  draw(fs, ss){
    this.fill(fs);
    if(ss)this.stroke(ss);
  }

  fill(fs=this.color){
    this.ctx.fillStyle = fs;
    this.setAlignments();
    this.ctx.fillText(this.text, this.x, this.y, this.maxWidth);
  }

  stroke(ss=this.color){
    this.ctx.strokeStyle = ss;
    this.setAlignments();
    this.ctx.strokeText(this.text, this.x, this.y, this.maxWidth);
  }

  setText(txt){
    this.text = String(txt);
  }

  isIn(mx, my){
    this.setAlignments();
    const measure = this.ctx.measureText(this.text);
    const x = this.x;// - Math.abs(measure.actualBoundingBoxLeft);
    const y = this.y;// - measure.actualBoundingBoxAscent;
    const w = measure.actualBoundingBoxLeft + measure.actualBoundingBoxRight;
    const h = measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent;
    //console.log(Utils.isIn_c(mx, my, x, y, w, h));
    return Utils.isIn_c(mx, my, x, y, w, h);
  }
}
class SceneManager {
  constructor({ctx, mouse, ...scenes}){
    this.ctx = ctx;
    this.mouse = mouse;
    this.scenes = scenes;
    Object.values(scenes).forEach(s=>s.ctx = ctx);
  }

  pushScene(scene){
    this.scenes.push(scene);
  }

  removeScene(sceneName){
    const i = this.scenes[sceneName];
    this.scenes.splice(i, 1);
  }

  setScene(sceneName){
    this.crntName = this.sceneName;
    this.crnt = this.scenes[sceneName];
    this.crnt.onMounted();
  }

  update(){
    this.ctx.canvas.style.cursor = "";
    this.crnt.updateCursor(this.mouse);
    this.crnt.update();
  }

  render(){
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.crnt.render();
  }

  get crntScene(){
    return this.crnt;
  }
}

class Scene {
  constructor({onMounted=()=>{}, update=()=>{}, render=this.drawAll, onUnmounted=()=>{}}){
    this.update = update;
    this.render = render;
    this.onMounted = onMounted;
    this.onUnmounted = onUnmounted;
    this.objs = {};
  }

  addObjects(...objs){
    objs.forEach(({name, obj})=>{
      obj.ctx = this.ctx;
      this.objs[name] = obj;
    })
  }

  updateCursor(mouse){
    Object.values(this.objs).forEach(o=>o.updateCursor(mouse));
  }

  draw(name, ...args){
    this.objs[name].draw(...args);
  }

  drawAll(){
    Object.values(this.objs).forEach(o=>o.draw());
  }
}
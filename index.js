(()=>{
  fetch("./apps.json")
  .then(res=>res.json())
  .then(json=>{
    let r = json.findIndex(o=>o.name === location.hash.slice(1));
    if(0<=r){
      console.log(json[r].name+'!!!!!');
      Redirect(json[r].name);
      return;
    }
    let wr = document.createElement("div");
    wr.className = "app-wrapper";
    json.forEach((app,i)=>AddAppCard(wr, app,i));
    document.getElementById("main").innerHTML = "";
    document.getElementById("main").appendChild(wr);
  });
})()

function AddAppCard(wr, app){
  const disabled = 0<=app.tags.indexOf("coming soon");
  let awr = document.createElement("div");
  awr.className = "app-card" + (disabled ? " disabled" : "");
  let btn = document.createElement("input");
  btn.className = "app-icon";
  btn.type = "image";
  btn.src = getFileRef(app.name, "icon");
  btn.onclick = ()=>PopUp(app);
  let ndiv = document.createElement("div");
  ndiv.innerText = app.name;
  awr.appendChild(btn);
  awr.appendChild(ndiv);
  wr.appendChild(awr);
}

function PopUp(app){
  //console.log(app.name);
  Redirect(app.name);
}

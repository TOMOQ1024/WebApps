function getFileRef(name, type){
  if(name === "index" && type === "js"){
    return "index.js";
  }
  const i = name[0].toLowerCase();
  const dir = "trmfa0".split("").filter(c => c <= i)[0];
  if(dir === undefined)console.log(`%c${name},${type}`, "style=color:red;")

  switch(type){
    case "js":
      return `/apps/${dir}/${name}/index.js`;
    case "icon":
      return `/icons/${dir}/${name}-icon.png`;
  }
}

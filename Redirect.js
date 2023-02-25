function Redirect(name){
  let el = document.createElement("script");
  el.src = getFileRef(name, "js");
  document.getElementById("script").appendChild(el)
}
function Redirect(name){
  location.hash = `${name}`;
  document.title = name==="index" ? "Tomo's Javascript Base" : name;
  document.getElementById("main").innerHTML = "";
  loadScript(getFileRef(name, "js"), true);
}
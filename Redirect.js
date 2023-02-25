function Redirect(name){
  const scwr = document.getElementById("script");
  let el = document.createElement("script");
  el.src = getFileRef(name, "js");
  location.hash = `${name}`;
  document.title = name==="index" ? "Tomo's Javascript Base" : name;
  document.getElementById("main").innerHTML = "";
  scwr.innerHTML = "";
  scwr.appendChild(el);
}
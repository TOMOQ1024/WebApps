function loadScript(path, exclusive=false) {
  const scwr = document.getElementById("script");
  if(exclusive)scwr.innerHTML = "";
  let el = document.createElement("script");
  el.src = path;
  scwr.appendChild(el);
}
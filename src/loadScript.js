function loadScript(path, exclusive=false) {
  const scwr = document.getElementById("script");
  if(exclusive)scwr.innerHTML = "";
  let el = document.createElement("script");
  el.src = path;

  // すでに読み込んでいた場合は追加しない
  if(
    [...document.querySelectorAll("script")].findIndex(
      e => e.src === el.src
    ) < 0
  ){
    scwr.appendChild(el);
  }
}
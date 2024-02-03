console.log("Hello World!");
let width;
let height;
window.onresize = function () {
  width = window.innerWidth - 600;
  height = window.innerHeight - 600;
  const container = document.getElementById("container");
  container.width = width;
  container.height = height;
};

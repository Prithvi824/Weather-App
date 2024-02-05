let menu = document.getElementsByClassName("menu")[0];
let menu_open_btn = document.getElementsByClassName("menu-btn-open")[0];
let menu_close_btn = document.getElementsByClassName("menu-btn-close")[0];
let loader = document.querySelector(".loader");
let content = document.querySelector(".content");

menu_open_btn.addEventListener("click", () => {
  menu.classList.replace("-translate-x-72", "translate-x-0");
  menu_open_btn.style.display = "none";
});

menu_close_btn.addEventListener("click", () => {
  menu.classList.replace("translate-x-0", "-translate-x-72");
  menu_open_btn.style.display = "block";
});

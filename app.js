const menuIcon = document.getElementById("menu-icon");
const menu = document.getElementById("menu");
const navLinks = document.querySelectorAll("#menu li a");

menuIcon.addEventListener("click", () => {
  menu.classList.toggle("active");
  menuIcon.style.opacity = menu.classlist.contains("active") ? "0" : "1";

});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});

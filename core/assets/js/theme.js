const themeToggleBtn = document.querySelector(".theme-toggle");

const theme = localStorage.getItem("theme");
const nav = document.querySelector("#navbar")
theme && document.body.classList.add(theme);

handlerThemeToggle = () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark-mode");

         nav.classList.add("nav-dark");
    } else {
        localStorage.removeItem("theme");

         nav.classList.remove("nav-dark");
    }
};

themeToggleBtn.addEventListener("click", handlerThemeToggle);
var theme = {};
theme.month = new Date().getMonth()+1;
theme.day = new Date().getDate();
theme.year = new Date().getFullYear();

theme.theme = "";

theme.themes = {};
theme.themes["?spoopy"] = "spoopy.css";
theme.themes["?creppy"] = "spoopy.css";
theme.themes["?scary"] = "spoopy.css";
theme.themes["?spooky"] = "spoopy.css";
theme.themes["?halloween"] = "spoopy.css";
theme.themes["?dark"] = "dark.css";
theme.themes["?black"] = "dark.css";
theme.themes["?monochrome"] = "dark.css";
theme.themes["?mono"] = "dark.css";
theme.themes["?gray"] = "dark.css";
theme.themes["?grey"] = "dark.css";
theme.themes["?grayscale"] = "dark.css";
theme.themes["?greyscale"] = "dark.css";
theme.themes["?candy"] = "candy.css";
theme.themes["?jolly"] = "candy.css";
theme.themes["?merry"] = "candy.css";
theme.themes["?hohoho"] = "candy.css";
theme.themes["?christmas"] = "candy.css";


if (theme.month==10) {
    theme.theme = "spoopy.css";
}
if (theme.month==12) {
    theme.theme = "candy.css";
}
if (theme.themes[window.location.search]) {
    theme.theme = theme.themes[window.location.search];
}
if (theme.theme!="") {
    var stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "https://textmonster404.github.io/"+theme.theme;
    document.head.appendChild(stylesheet);
}

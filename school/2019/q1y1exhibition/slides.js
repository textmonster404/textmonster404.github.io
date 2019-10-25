var currentSlide = 0;
var slides = document.getElementsByTagName("div");
var scrolling = false;
var destination = currentSlide;

window.onscroll = function() {
    for (var s=0;s<slides.length;s++) {
        var slide = slides[s];
        if (slide.getBoundingClientRect().y<=0) {
            currentSlide = s;
        }
    }
}
window.onclick = function() {
    for (var s=0;s<slides.length;s++) {
        var slide = slides[s];
        if (slide.getBoundingClientRect().y<=0) {
            currentSlide = s;
        }
    }
    if (!interval) {
        interval = window.setInterval(update,1);
    }
    destination = currentSlide + 1;
}
window.onkeydown = window.onclick;
var interval;
var update = function() {
    if (window.scrollY<slides[destination].getBoundingClientRect().y+window.scrollY+10) {
        for (var s=0;s<slides.length;s++) {
            var slide = slides[s];
            if (slide.getBoundingClientRect().y<=0) {
                if (destination!=currentSlide+1) {
                    currentSlide = s;
                }
            }
        }
        if (currentSlide==destination) {
            scrollBy(0,-slides[destination].getBoundingClientRect().y-10);
            window.clearInterval(interval);
            interval = null;
        } else {
            window.scrollBy(0,5);
        }
    } else {
        window.clearInterval(interval);
        scrollBy(0,-slides[destination].getBoundingClientRect().y-10);
        interval = null;
    }
}
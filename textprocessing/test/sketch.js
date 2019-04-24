function setup() {
    printXY("h",3,3);
}
function update() {
    clear();
    printXY(key,1,2);
    if (mouseClicking) {
        ellipse(mouseX,mouseY,5,5,"!");
    } else {
        ellipse(mouseX,mouseY,5,5,"?");
    }
}

function overBox(x,y,box,f) {
  if (x>=box.x&&x<=box.x+box.w&&y>=box.y&&y<=box.y+box.h) {
    f();
  }
}

function cursorArea(box,cur) {
  if (mouseX>=box.x&&mouseX<=box.x+box.w&&mouseY>=box.y&&mouseY<=box.y+box.h) {
    cursor(cur);
  }
}
var design = {"p1":localStorage.getItem("p1style") || 0,"p2":localStorage.getItem("p2style") || 1,"p3":localStorage.getItem("p3style") || 2,"p4":localStorage.getItem("p4style") || 3};
var nes;
var designs = [[],[],[],[]];
class Rectangle {
  constructor(x,y,w,h,c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }
  draw() {
    strokeWeight(0);
    fill(this.c);
    rect(this.x,this.y,this.w,this.h);
  }
}
var selecting = 0;
function preload() {
  nes = loadFont("coplatform-nes.ttf");
  designs[0][0] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAL0lEQVRYR+3QQREAAAzCMPAvepPBJ1XQSy+5DKsBAgQIECBAgAABAgQIECBAYC3wpb4/4Xemy4gAAAAASUVORK5CYII=");
  designs[1][0] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAL0lEQVRYR+3QQREAAAzCMPAvepPBJ1XQS3O5DKsBAgQIECBAgAABAgQIECBAYC3whd4/4cBXEhkAAAAASUVORK5CYII=");
  designs[2][0] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAL0lEQVRYR+3QQREAAAzCsOFfNJPBJ1XQS9rrDYsBAgQIECBAgAABAgQIECBAYC3we3VfwdYP0/MAAAAASUVORK5CYII=");
  designs[3][0] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAL0lEQVRYR+3QQREAAAzCMPAvepPBJ1XQS5O7DKsBAgQIECBAgAABAgQIECBAYC3wZf4/4btT83oAAAAASUVORK5CYII=");
  designs[0][1] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAQUlEQVRYR+3XsQ0AMQwDMWv/of3AN9kgSkFNcGCn7MxOcXknYC9DJL/7ERBAgAABAgQIECBAgAABAnWB0kOuv+MP+F934c3MowcAAAAASUVORK5CYII=");
  designs[1][1] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAQElEQVRYR+3XsQ0AIBADsc/+Q4NEwQiEwpng5C6ZNWuKyzcBryEyOe5XQAABAgQIECBAgAABAgQI1AVaB7n+jjf0f3fhrW7mcAAAAABJRU5ErkJggg==");
  designs[2][1] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAQElEQVRYR+3XMQ0AMAwDwYQ/6FTqVAR1hjOC123umZoKrhcF/Ibo6/4ICCBAgAABAgQIECBAgACBuEDmIsff8QEWzXvBTBUHtQAAAABJRU5ErkJggg==");
  designs[3][1] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAQElEQVRYR+3XsQ0AIBADsc/+Q0OBxAiEwpng5C6ZWWuKyzcBrx2Sw34FBBAgQIAAAQIECBAgQIBAXaB1kOvveAPwn3fhMtIwVQAAAABJRU5ErkJggg==");
  designs[0][2] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAkUlEQVRYR83XwQoAIQhFUf3/j3ZgSGYRoZVvfG3bnC4FqSZi0riUF2DgMKpv93WBdoDfCxQkLPA7wE86ZNPDqC4xFaAB+NHRJZYFaABoSFiABoCCpAvQAKoh2wVoAFWQ4wI0gFvIdQEawCmkrAANYBdSXoAGkIXACtAAIsjY/+aC6k8nDSCA4AukAU0Tcvt0/ADAH5/hDNFiMwAAAABJRU5ErkJggg==");
  designs[1][2] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAlElEQVRYR83XywrAIAxE0eT/P9pCaVpokfiYacatm+NFwbg1a1a4XBbADuPmZ/dugXJAXAsWJC3wOyBOGrL3w0CX+BSQAcTJ2SW6BWQAbEhaQAbAggwXkAGgIdMFZAAoyHIBGcAuZLuADGAVAisgA5iFwAvIAEYhtAIygAzy7F+fQfSnUwaQQe7JiFVgGFA1IJdPxwfQP5/h9l5CLwAAAABJRU5ErkJggg==");
  designs[2][2] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAkUlEQVRYR83XwQ5AEQxEUf3/j+5LnjSRCC06jCWb48ZCRbVoebiEGIAOI3/3SYHnAHsYKIhb4DrAblpl/cou0RWgAdjd0SWGBWgAaIhbgAaAgoQL0ACyIcsFaABZkO0CNIBTyHEBGsAuJK0ADWAVkl6ABhCFwArQADxIPW/mguxPJw1gDrlQIAwYjAPg7efT8Qfwno/BdVVqDQAAAABJRU5ErkJggg==");
  designs[3][2] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAk0lEQVRYR83XOQ7AIAxEUfv+hyZFZAoiZJaZeGhpHl8gYTdrzQqXywLYXdzf7NMC5YC4FixIWuB3QJw0ZOPDQJf4FJABxMnZJaYFZABsSFpABsCCLBeQAaAh2wVkACjIcQEZwC3kuoAM4BQCKyAD2IXAC8gAViG0AjKADNL3YzJCfzplABmkT0asAsuAqgG5fDp+AOBfn+FdOtxCAAAAAElFTkSuQmCC");
  designs[0][3] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAn0lEQVRYR+2X4QrAIAiE9f0fusFYBA7RyvIa2++F390pGReiQokf4wCUzUYw3743B2AAHrJlbVGFqg7AAERHUoW5HYABmI1EKKZuB2AAeiNRMh93AAbAisTIfN4BGAAZiTPzOAd+gHQHtOvy+1PgXRScU/HeiKyDaQDewvK/82/DUeXy3HkbUZRyoyf0KUgDWFVY6Qmgl9Eu5aJO+uv4AkHqH/B8zrj+AAAAAElFTkSuQmCC");
  designs[1][3] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAo0lEQVRYR+2X0Q6AIAhF4f8/2rY2e8AxQFFurZ5zHM7FRUyNGhU+DANwWgQT394fAzAAnWzXWPRGVQMwANmR9MbcBmAAViORHYcNwABEI9EynzYAA2BFYmW+bAAGQEbizTzNwA9QbkD7Wn7/Fnj3BO+tGDYi62AZgLewfM+aCbeBMoDZwvLc+zairM6tmVBnoAxgV2FtJnD+jE51PpqILnvJpBeSCh/wO5EMNwAAAABJRU5ErkJggg==");
  designs[2][3] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAp0lEQVRYR+2X4Q6AIAiE5f0f2raaLRkqKsrV8neMjzsgpRhDDI6HgAB2C0Gn7g8FYAAusnUnFVpUAAbA2pJUmFoBGIBZS/KKw712mj3AA0fb0gyg1xLZ8wkFYABaPVGX3EABGABuic5zQwV+AHcFSovp+1OgXcm6qRBuRK1ANwBtYv6d2c/IDWA0MY97343IqvJ6T1SmwA1gVWK5J5BeRrsqz/O4v44PEYvPwRpzqu8AAAAASUVORK5CYII=");
  designs[3][3] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAoUlEQVRYR+2XQQ7AIAgE4f+PtoeGHjAEVJRt055rGGYxKhO1RoUfwwCc9sB8a38MwAAI2a6xkEZNAzAA2ZFIY2EDMACrkeiOhw3AAIxGYmU+bQAGwIvEy3zZAAyAjiSaeZqBH6DcgHVafn8XRO8J0V3R3Yi8hWUA0cL6P28mwgbKAGYL63XvuxFlde7NhDkDZQC7ClszgfMyOtV5Z6L6dXwB4iof8EqsfjwAAAAASUVORK5CYII=");
  designs[0][4] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAhElEQVRYR+2XwQ7AIAhD4f8/Gg8bLnEhLNFRDvVqlPpqiqqJmACH9hFgAQjVi8/p+Xvfh8DpAm5rdAAKSAn85f1iTXwHKABGoKjwvAozCT0HKABGwE2piuRXEFEAnECV9597QdbPd+fTbrhbIFvfX0BRIPE90JBAkfd8DzQkAPohw3/HA72XH/C5E94WAAAAAElFTkSuQmCC");
  designs[1][4] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAhElEQVRYR+2XUQrAIAxD2/sf2sFYN9goHahJP+KvaOOLpOo2bBhxeBsBGQg3P/msno99bwKrC4Sr2QEkoCSwy/u3NekdkAAaAVTh5y5cARA5IAE0AuEJKpI/QSQBdAIo73/3gqqfz86X3XC2QLW+vwBUIOk90I8Aynu9B/oRYH2Q6b/jAw3GH/AXs0whAAAAAElFTkSuQmCC");
  designs[2][4] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAhElEQVRYR+2XOw7AIAxDyf0PnQ5t+lFFgwS1M5gVQcwzcsDcmzfisEICeiDs4LN6ft/3RmB1gfC1dwAJSAn85f3Tmo87IAE0ApjC5024kjByQAJoBMIVVCS/gkgC6ARQ3g/3gqyfz86n3XC2QLa+vgBMIOk9UJEAxnu9ByoS4HyR6b/jDc9az8ErjUzHAAAAAElFTkSuQmCC");
  designs[3][4] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAg0lEQVRYR+2XwQ7AIAhD4f8/2h2WethCMFEph3o1Sn01Rd1sDCMObyMg4uD+4jk9j30ngdMF4Gp0AAlICdzy/mtNeAckgEagqvC8C4gY5IAE0AjAk6pI/gWRBNAJVHm/3Auyfr47n3bD3QLZ+v4CqgJJ74F+BKq813ugHwHWB5n+O34AXeYf8BX26YMAAAAASUVORK5CYII=");
  designs[0][5] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA10lEQVRYR+1Xyw7DMAiD///o7AKZRORgukzs0V5aFYqMw8NVsWuIDH/e3VVEd/ZqnBms+iECUY2j84OREKDbxFc8ZLwvBEBmJqRfnQEy8HkAfspeCxEIeo+q1fx5BtoB/H4XxLPyM46Zs0U4R6zNF8Dgswa6ACy7IMuc7QLEnFe/7ZR1F3wMANR2WTfEBMC88K2KGbgBtDOQ9f9V+8tdEJmJAyezRwBQQmXtmGy5aUZxzKF/Et6akGagXZC0A2A1X9GP14TFwOdVcbYFkaA5porfBeDv/44fjsfz+R+9oQoAAAAASUVORK5CYII=");
  designs[1][5] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAyklEQVRYR+1X0RKAIAjD//9oexG7o5sbvphlT10BDWI4ivlVrfb70U2xMrRLxrmDJR0hiGScYs2B+bHEIyA13n4A1MxUu3QF1MCqnQzA/7H3QvwAeo6a1e33AfB9FiAex8zV5ooDFlWw98A6AAGqZ4gyV1nA/K0ZPM6C1wBAvGdsiAmgeUErcAAsrwDj/+z77jfLglgZpOh0GoLRxujITrmNJuHRhGIFjiJSNV/WTtaE2cCqcEkDkPZHM1+4oHlaFbNjeH41+/t2fAHA2/P5OsKxkQAAAABJRU5ErkJggg==");
  designs[2][5] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA0UlEQVRYR+1XWxKAIAiU+x/aPhRtSF5WQ1b95IQyy8oCQapPzinjWnoDJJDsXj/NmfcgB8LrB/oBjQAx8AEem78VAdgiS2pKFUYnGAgDgNeMuUCBcN+5dHUzEA7g/Sqgd4V3TCO3JmGrsXUxZnCngiAAx16gRW5VAcdczf7aUwa94DEAONlpaqABjOsFdlWBgR9AOAOa/mftp1VAmaEFR7MTAPwIpclR7nLdyvkpO+Ir4T8T2hkIH0jCAVhnPt++laZirQtyA81lU/FNAD7/d7wBuIjB5bwEPx8AAAAASUVORK5CYII=");
  designs[3][5] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzklEQVRYR+1XyxKAIAjE///oOjj0oLZd6qA2dnIUcd1YhGLbtyz7+GlUyrNdzs/BWW4jBpHzU8zqBraN3TsCUv2NB0C9mWqXZkB1rNrJAPwfeyzEA9A8Cla3HwfA/1WAdBxvrgaX+3N7xOAWAw0BnLEixHGeqQAxt8/X0eUt6AYA0j1Tg8qUGWFgAmjOANP/2/XPKojMxITD1m8A3Oc2Jkf2yo2UCWdNqDEwKyK15svayTVh1rFauKQBaP2j3mn1AAAlUzXXZbvCs56ad8cr8u/z+TEP8FEAAAAASUVORK5CYII=");
  designs[0][6] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAx0lEQVRYR+1XQQ7AIAiD/z96S0w0iw7bRo0e3M0p0HYDwR+zx4THzbx3XPYnG6wGgBgKYv0erQl78wIwXAYgM8+AZitR+y3rcGOyEjSALPEsJSI/oQLHABgFghSEChwDQAWCmDf+ZAOyEqI0/sQdLS1j9t2LZcw1Z30BXAWuAqUhEQoH1RPS/rZXQgQA7UflBtmdfxsiBlyhTUNHmjvqfwIqsA3ArMC1QnRTug1ARozyl/32KDtKvGMmI5YZUkgedmUDsidkCb2nRJ/xefxIeAAAAABJRU5ErkJggg==");
  designs[1][6] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAArUlEQVRYR+2X4Q6AIAiE4f0fuv5EbZieiK1zs38tpONzHqhyyCGRR0Wb4cF8yicAVRih9RbrCJUEfhNgPzaFs4X4vNf7Q4BGgO3bLBK1PFUCNAKyQhBBSIBGQFQIqtzlK09BzWiCiQUd43sLss6WXN9uLMnkPcu3gE1gEyAwoo8crt8JkQD0fdS6+bvhaOWeyHoT0azKEQm+qdgUo0Gip8e2YnhvRr2VIUKr3Y5PV1yf8fToIcoAAAAASUVORK5CYII=");
  designs[2][6] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAvklEQVRYR+1XQQ6AIAxj/380xsN2AKFdNgImeFPoaGsoQ2ottTgekSKz6e56bsBqAkihw6zPqa1g6T4AhcsIqHIllO1EW9fehwPJTtAE1OIsJ0Z1hg4cQyBKBDkIHTiGgJcIUt7VcwPIJETb2NaNBksUPz1YosUZ/CVwHbgOWENCB0d2EG1PQkQAjY/CBuHOPw2RAiZm3zn/64iylLcO0U3pNgLKGOUB++/R7rD1jrkZscqQQ+7LrhtARjEr6AGVwu/ZzLyvQwAAAABJRU5ErkJggg==");
  designs[3][6] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAArklEQVRYR+2X4Q6AIAiE4f0f2n40Wjr1RGydm/1rIR2f80AVSUlcj2o/3JdPCQWgCl24KsE5oQqB3wTYj03haiFl3vv9RYBGgG3bKhKtPE0CNAKiQhBBSIBGgFcIqjzPVzkFLaPxJRZBx/jZgqizxdaDxhJLPrL6CDgEDgEGI/rG4RxOiASg77PWzd8NZysview3Ea2qHJHgm4pNMRokRppsL4b3ZjRaGSK02e34Agd0n/HEC5BXAAAAAElFTkSuQmCC");
  designs[0][7] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAWklEQVRYR+3XKw4AMAhEQbj/oakopEnRfMSrw5TNZgxqIiaDT/cEMC9C9fZRPXvrr4Hqhf//KUA4aA6SDYwFaF4chWMAAxjAAAYwgAEMYAADGFhkYOhCHr+OD+Lix/BnLhzKAAAAAElFTkSuQmCC");
  designs[1][7] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAXElEQVRYR+3XvQoAIAiFUe/7P7RBYEPO/gxfWw0pl1OgzM1tcGlNAxGETDeP6n2E/hKoLvjfnxqIg+5GkoGxBroLYyBeGwb4BzCAAQxgAAMYwAAG9hiYGpDHp+MDhxHH8CoJlU0AAAAASUVORK5CYII=");
  designs[2][7] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAWklEQVRYR+3XMQ4AIAhDUbn/oXFQEqOuUIbvxiJN8xbMffgQPmsUIIqw3Uf2vNYcDWQvvP9/AgSE2iAfA7IAtYujbwxgAAMYwAAGMIABDGAAA50MaE5k+XU8ATgHI9BxxDLLAAAAAElFTkSuQmCC");
  designs[3][7] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAW0lEQVRYR+3XOw4AIAhEQfb+h8bCYCE1n+LZaSFkM5ogM3cbXFrTQOQg3Tiq9xH6S6C64H9/aiAOuhtJBsYa6C6MgXhtGOAfwAAGMIABDGAAAxjYY2BqQB6fjg8rQMfwnE01pwAAAABJRU5ErkJggg==");
  designs[0][8] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAjElEQVRYR+1Xyw7AIAiD//9odphkCYR4YS0HvBmilkcLqomYEJfOAWBFIFTf+HTbz71fBLof8LRWDiQAfgAFZB4A9/yvnMeUnH2uATqAW/E022sWgCIxiIYo+oUUZilGAVkdWB24dsPVgWbJTQPNPBrSB5KdB2IPoNOQDgBOQ1Qb3nkg0H3Q55T0RX8AnZkf8GBRKucAAAAASUVORK5CYII=");
  designs[1][8] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAj0lEQVRYR+1Xyw7AIAiD//9olyzDJZjGC48e8GaMWiktqLJkSeNQGgAoECr6xid63c7dEYi+wFhFDzgA2IYqIHwA7OVZnHtK/vl3Mw2AW/JEr0MVVFHBI8Mq+XkKDyuuAjI+MD5wrYbjA9GW6+XNJ8P2hoSmHFdlPzSi7OSDxQhlaXZxmn5g+gGez2nXD/0B7bkf8KEmarMAAAAASUVORK5CYII=");
  designs[2][8] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAjElEQVRYR+1XSRLAIAiD/z+aHiwzdasXTDjgzWHUsCSgmokJcWkiALtA6BufaHu79xOB6Ac8rzsHJgB+AAUkHwD3/FbOx5S0/aIG6ABOxRNr/2EBJhKZaIiiX5/ChRSjgJQOlA4cu2HpQKzkyjT55aMhfSCpeWDsAXQa0gHAaYhqwzUP9HTP9Dnl/NEfv1vPwfKu730AAAAASUVORK5CYII=");
  designs[3][8] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAjUlEQVRYR+1XOQ4AIQiE/z9aC4MFZmLDMQXbbYy7I3OAKrKWND5KAwDVQfWUJ3rdvnsrEP0DYxUd4AFgG6qA8AGwk2dx7im57yYvGgA/8USvQxdUUcFjwyr7eQqfKK4CMjkwOfDthpMD0ZHr7c1nw/aBhKYdV6kfBlG2+GAzQirNbk4zD8w8wHM57bqhbz3oH/ByF1mNAAAAAElFTkSuQmCC");
}
function setup() {
  var canvas = createCanvas(512, 512);
  canvas.elt.style.border = "2px solid black";
  textAlign(CENTER);
  textFont("monospace");
  textFont(nes);
  textSize(16);
  strokeWeight(0);
}
function draw() {
  cursor();
  background(255);
  fill(0);
  textAlign(LEFT);
  text("Back",2,18);
  textAlign(CENTER);
  text("Select design.",256,18);
  image(designs[0][design.p1],144,64,32,32);
  image(designs[1][design.p2],144+64,64,32,32);
  image(designs[2][design.p3],144+128,64,32,32);
  image(designs[3][design.p4],144+128+64,64,32,32);
  fill(0);
  for (var i=0;i<designs[0].length;i++) {
    if (i==design.p1) {fill(255,0,0);} else {fill(0);}
    text(i+1,144+16,18*i+128);
  }
  for (var i=0;i<designs[1].length;i++) {
    if (i==design.p2) {fill(0,255,0);} else {fill(0);}
    text(i+1,144+64+16,18*i+128);
  }
  for (var i=0;i<designs[2].length;i++) {
    if (i==design.p3) {fill(255,255,0);} else {fill(0);}
    text(i+1,144+128+16,18*i+128);
  }
  for (var i=0;i<designs[3].length;i++) {
    if (i==design.p4) {fill(0,0,255);} else {fill(0);}
    text(i+1,144+128+64+16,18*i+128);
  }
  cursorArea(new Rectangle(2,2,64,16),'pointer');
  for (var i=0;i<designs[0].length;i++) {
    for (var j=0;j<4;j++) {
      cursorArea(new Rectangle(144-(i.toString().length*8)+16+64*j,18*i+112,i.toString().length*16,16),"pointer");
    }
  }
}
function mousePressed() {
  overBox(mouseX,mouseY,{"x":2,"y":2,"w":64,"h":16},function(){window.location.replace("index.html");});
  for (var i=0;i<designs[0].length;i++) {
    overBox(mouseX,mouseY,{"x":144-(i.toString().length*8)+16,"y":18*i+112,"w":i.toString().length*16,"h":16},function(){localStorage.setItem("p1style",i);design.p1=i;});
  }
  for (var i=0;i<designs[1].length;i++) {
    overBox(mouseX,mouseY,{"x":144+64-(i.toString().length*8)+16,"y":18*i+112,"w":i.toString().length*16,"h":16},function(){localStorage.setItem("p2style",i);design.p2=i;});
  }
  for (var i=0;i<designs[2].length;i++) {
    overBox(mouseX,mouseY,{"x":144+128-(i.toString().length*8)+16,"y":18*i+112,"w":i.toString().length*16,"h":16},function(){localStorage.setItem("p3style",i);design.p3=i;});
  }
  for (var i=0;i<designs[3].length;i++) {
    overBox(mouseX,mouseY,{"x":144+128+64-(i.toString().length*8)+16,"y":18*i+112,"w":i.toString().length*16,"h":16},function(){localStorage.setItem("p4style",i);design.p4=i;});
  }
}

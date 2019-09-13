var testmode = false; // should be false
var level = 0;        // should be 0

var levels = 10;       // number of levels
var design = {"p1":localStorage.getItem("p1style") || 0};

var designs = [[],[],[],[]];

var nes;
function preload() {
  nes = loadFont("coplatform-nes.ttf");
  dither = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAS0lEQVRYR+3SsQ0AMAgDQbP/0IkQockAmOJpEJWxdCHpqCbeHr0zdDTwz+vWWd7yyIoHLM3bHAYwgAEMYAADGMAABjCAAQxgwG7gApZ3ACCkcd1GAAAAAElFTkSuQmCC");
  collumn = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAApElEQVRYR+2W0Q6AIAhF8/8/ulYbm91UCGTwQG8Z5lG4V9rxfc7BWD/U4DvFz8bxd684nHQHpwUgWATkdo7z1CcQDkC51ILg/OfdUgN/U6EGkOaYFkBVLEElJxAOsNRxJ1sOVJ2CNADa6i8fcLsLygeGshrI0mxEaWQo3TFa8rYiLB+ofmBWXFyXbJYhd826A5QPWKu/+oFtVmxNhbopDZehK8AFLr9wISIiNLMAAAAASUVORK5CYII=");
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

function t2hms(t) {
  var tempT = t;
  var h = 0;
  var m = 0;
  var s = 0;
  while (tempT>0) {
    if (tempT>=3600) {
      h++;
      tempT-=3600;
    } else if (tempT>=60) {
      m++;
      tempT-=60;
    } else {
      s+=tempT;
      tempT-=tempT;
    }
  }
  return h+"h "+m+"m "+floor(s*100+0.5)/100+"s";
}

function draw() {
  
}
var screen = {};
screen.width = 512;
screen.height = 512;
screen.x = 0;
screen.y = 0;
screen.scrollX = 0;
screen.scrollY = 0;
screen.autoScroll = false;

var A = 255; // player 1 spawn
var B = 256; // switch
var W = 257; // win
var T = 10;  // collumn semisolid
var C = 11;  // collumn background
var F = 12;  // fan
var M = 20;  // center a tile horizontally
var V = 21;  // center a tile vertically
// 0 = empty
// 1 = solid block
// 2 = solid switchable
// 3 = nonsolid switchable
// 4 = spike
// 5 = semisolid
// 6 = fall-through semisolid
// 7 = dithering background
// 8 = collumn left
// 9 = collumn right

var level0 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,M,W,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,3,3,0,0,0,0,0,0,3,3,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,A,0,0,0,0,0,0,0,0,0,0,0,0,B,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]

var level1 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,B],
  [0,0,0,0,0,0,0,0,1,3,1,1,1,1,1,1],
  [1,V,1,0,0,0,0,0,1,0,0,0,0,0,0,W],
  [1,B,1,1,1,1,1,1,1,0,1,1,1,1,1,1],
  [1,0,0,0,0,A,0,0,0,0,1,0,0,0,0,0],
  [1,1,1,1,1,1,1,1,1,F,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,5,5,5,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]

var level2 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,M,W,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,1,1,1,1,0,0,0,0],
  [0,0,0,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,1,0,0,0,1,0,0,0,0,0,0,4,0,0,0],
  [0,0,0,1,0,1,2,1,1,1,1,1,3,1,1,0,0,0],
  [0,0,0,1,B,1,0,0,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,1,3,1,1,1,3,1,2,1,1,1,0,0,0,0],
  [0,0,0,1,0,0,A,1,0,0,0,0,B,1,0,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,F,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0]
]
var level3 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,W,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,0,0,0,0,0,A,0],
  [0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,0],
  [0,0,0,0,0,1,0,0,V,0,0,0,1,0,0,0],
  [0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,F,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0]
]
var level4 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [5,5,5,5,5,0,0,0,3,3,3,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,3,W,3,0,0,0,0,B],
  [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,F,F,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,5,5,0,3,3,3,0,3,3,3,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,M,B],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,0,1,1,1,0,0,0],
  [0,0,M,A,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]
var level5 = [
  [0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0],
  [0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0],
  [0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,W,M],
  [0,0,1,0,A,0,0,0,1,0,0,0,B,0,1,0,0],
  [0,0,1,5,5,5,6,6,0,6,6,5,5,5,1,0,0],
  [0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
  [0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
  [0,0,1,1,2,2,2,1,1,1,1,1,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,F,F],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5],
  [0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]
var level6 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,W,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5],
  [0,0,0,0,0,M,B,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,2,2,0,0,0,0,0,0,5,5,5],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,0],
  [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,F,F,0,0,0,0,0,0,4,4,0,0,0],
  [0,0,0,5,5,0,0,M,A,0,0,5,5,0,0,B],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]

var level7 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,M,B,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,M,W,0,0,0],
  [0,0,0,0,0,0,0,2,2,0,0,2,2,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0],
  [0,0,0,M,B,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,2,2,0,0,0,0,0,0,3,3,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,A,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];
var level8 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,M,W,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,F,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,0,0,B,M,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0],
  [0,0,0,B,B,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,5,5,0,M,3,3,M,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,M,B,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,A,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]
var level9 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,W,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,B,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,A,M,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];
var end = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,2,2,0,0,0,0,0,0,3,3,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,A,0,0,0,0,0,0,0,0,0,0,0,0,B,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

var test = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,5,T,5,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,C,0,0,0,0,0,0],
  [0,0,0,0,0,0,T,0,0,C,0,0,0,0,0,0],
  [0,0,0,0,0,0,C,0,0,C,0,0,0,0,0,0],
  [0,0,0,0,0,0,C,0,0,C,0,0,0,0,0,0],
  [5,6,6,5,5,5,5,5,5,5,5,5,5,6,6,5],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,5,5,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,8,7,7,9,0,0,0,0,0,0],
  [0,0,0,0,0,0,8,7,7,9,0,0,0,0,0,0],
  [0,0,F,2,2,0,8,7,7,9,0,3,3,F,0,0],
  [0,0,0,0,0,0,8,7,7,9,0,0,0,0,0,0],
  [0,0,0,0,0,0,8,7,7,9,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [4,0,A,0,0,0,0,0,0,0,0,0,0,B,0,4],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];


var texts = ["Start!","Into oblivion","Merry go around","Trampoline","Hippity Hoppity","See-Saw        ","Backtrack","Changing the route","Switch it up!","The staircase",""];



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
function collide(r1,r2){
  var dx=(r1.x+r1.w/2)-(r2.x+r2.w/2);
  var dy=(r1.y+r1.h/2)-(r2.y+r2.h/2);
  var width=(r1.w+r2.w)/2;
  var height=(r1.h+r2.h)/2;
  var crossWidth=width*dy;
  var crossHeight=height*dx;
  var collision='none';
  if(Math.abs(dx)<=width && Math.abs(dy)<=height){
    if(crossWidth>crossHeight){
      collision=(crossWidth>(-crossHeight))?'bottom':'left';
    }else{
      collision=(crossWidth>-(crossHeight))?'right':'top';
    }
  }
  return(collision);
}
var win = {};

var swapped = false;
var blocks = [];
var on = [];
var off = [];
var spikes = [];
var playerStartX = 0;
var playerStartY = 0;
var switches = [];

var p = new Rectangle(playerStartX,playerStartY,32,32,[255,0,0]);
var dp = 0;
var speedY = 0;
var speedX = 0;
var up = false;
var left = false;
var right = false;
var down = false;

var fail1 = false;

averagePlayer = new p5.Vector(0,0);

function game(stage) {
screen.scrollX = 0;
screen.scrollY = 0;
screen.autoScroll = false;
screen.width = stage[0].length*32;
screen.height = stage.length*32;
screen.offset = 0;
screen.x = 0;
screen.y = screen.height;

win.x = -32;
win.y = -32;
win.p1 = false;
swapped = false;

if (level==9) {
  screen.autoScroll = true;
  screen.scrollY = -1.5;
  screen.y = screen.height-512;
  screen.x = 0;
}

blocks = [];
on = [];
off = [];
spikes = [];
semisolids  = [];
dithering  = [];
colleft  = [];
colright  = [];
colplatform  = [];
switches = [];
col = [];
fans = [];
playerStartX = 0;
playerStartY = 0;
for (var x=0;x<stage[0].length;x++) {
  for (var y=0;y<stage.length;y++) {
    var o = 0;
    var v = 0;
    if (stage[y][x-1]!=null&&stage[y][x-1]==M) {o = -16;}
    if (stage[y][x+1]!=null&&stage[y][x+1]==M) {o = 16;}
    if (stage[y-1]!=null&&stage[y-1][x]==V) {v = -16;}
    if (stage[y+1]!=null&&stage[y+1][x]==V) {v = 16;}
    if (stage[y][x]==1) {
      blocks[blocks.length] = new Rectangle(x*32+o,y*32+v,32,32,0);
    }
    if (stage[y][x]==2) {
      on[on.length] = new Rectangle(x*32+o,y*32+v,32,32,0);
    }
    if (stage[y][x]==3) {
      off[off.length] = new Rectangle(x*32+o,y*32+v,32,32,0);
    }
    if (stage[y][x]==4) {
      spikes[spikes.length] = new Rectangle(x*32+o,y*32+v,32,32,0);
    }
    if (stage[y][x]==5) {
      semisolids[semisolids.length] = new Rectangle(x*32+o,y*32+v,32,2,0);
      if (stage[y][x+1]==5||stage[y][x+1]==T) {
        semisolids[semisolids.length-1].ex = true;
      } else {
        semisolids[semisolids.length-1].ex = false;
      }
      if (typeof stage[y+1] == "object") {
        if (stage[y+1][x]==7) {
          semisolids[semisolids.length-1].dith = true;
        } else {
          semisolids[semisolids.length-1].dith = false;
        }
      }
    }
    if (stage[y][x]==6) {
      semisolids[semisolids.length] = new Rectangle(x*32+o,y*32+v,32,2,0);
      if (stage[y][x]==6) {
        semisolids[semisolids.length-1].fall = true;
      } else {
        semisolids[semisolids.length-1].fall = false;
      }
    }
    if (stage[y][x]==7) {
      dithering[dithering.length] = new Rectangle(x*32+o,y*32+v,32,32,255);
    }
    if (stage[y][x]==8) {
      colleft[colleft.length] = new Rectangle(x*32+4+o,y*32+v,32,28,255);
    }
    if (stage[y][x]==9) {
      colright[colright.length] = new Rectangle(x*32+o,y*32+v,32,28,255);
    }
    if (stage[y][x]==T) {
      colplatform[colplatform.length] = new Rectangle(x*32+o,y*32+v,32,32,255);
      semisolids[semisolids.length] = new Rectangle(x*32+o,y*32+v,32,2,0);
      if (stage[y][x+1]==5||stage[y][x+1]==T) {
        semisolids[semisolids.length-1].ex = true;
      } else {
        semisolids[semisolids.length-1].ex = false;
      }
    }
    
    if (stage[y][x]==C) {
      col[col.length] = new Rectangle(x*32+o,y*32+v,32,32,255);
    }
    if (stage[y][x]==F) {
      fans[fans.length] = new Rectangle(x*32+o,y*32+16+v,32,16,0);
    }
    if (stage[y][x]==A) {
      playerStartX = x*32+o;
      playerStartY = y*32;
    }
    if (stage[y][x]==B) {
      switches[switches.length] = new Rectangle(x*32+o,y*32+v,32,32,0);
    }
    if (stage[y][x]==W) {
      win.x = x*32+o;
      win.y = y*32+v;
    }
  }
}
p = new Rectangle(playerStartX,playerStartY,32,32,[255,0,0]);
dp = 0;
speedY = 0;
speedX = 0;
up = false;
left = false;
right = false;
down = false;

fail1 = false;

averagePlayer = new p5.Vector(playerStartX,playerStartY);

particles = [];

createParticle = function(x,y) {
  particles[particles.length] = new Rectangle(x,y,4,4,0);
  particles[particles.length-1].t = 60;
}

/* TEST CODE */
hasup = true;

draw = function() {
  if (level<levels) {
    texts[texts.length-1]="End.\nBeaten in "+t2hms(floor(millis()/10)/100)+"\n\n"+(function(t){if(t<20){return "This... isn't possible.\nDid you cheat?"}else if(t<=90){return "Umm..."}else if(t<=300){return "Nice."}else if(t<600){return "You did okay.\nAim for less than five minutes."}else{return "Try to get less than 10 minutes next time."};})(floor(millis()/10)/100);
  }
  if (screen.autoScroll==false) {
    screen.x = 0;
    screen.y = screen.height-512;
    if ((screen.width>512)&&averagePlayer.x>256&&averagePlayer.x<screen.width-256) {
      screen.x = averagePlayer.x-256;
    }
    if (averagePlayer.x>=screen.width-256) {
      screen.x = screen.width-512;
    }
    if ((screen.height>512)&&averagePlayer.y>256&&averagePlayer.y<screen.height-256) {
      screen.y = averagePlayer.y-256;
    }
    if (averagePlayer.y<=256) {
      screen.y = 0;
    }
    translate(Math.floor(-screen.x),Math.floor(-screen.y));
  } else {
    screen.x += screen.scrollX;
    screen.y += screen.scrollY;
    translate(Math.floor(-screen.x),Math.floor(-screen.y));
  }
  background(255);
  fill(0);
  textAlign(LEFT);
  text("Back",screen.x+2,screen.y+18);
  textAlign(CENTER);
  var bound = 48;
  var rate = 1;
  if ((right||left)) {bound = 128; rate = 0.65;}
  if (right&&screen.offset<bound) {screen.offset+=rate;}
  if (right&&screen.offset>bound) {screen.offset-=rate;}
  if (left&&screen.offset<-bound) {screen.offset+=rate;}
  if (left&&screen.offset>-bound) {screen.offset-=rate;}
  averagePlayer.x = p.x+p.w*0.5+screen.offset;
  averagePlayer.y = p.y+p.h*0.5;
  
  for (var i=0;i<switches.length;i++) {
    var obsticle = switches[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      obsticle.draw();
      fill(255);
      rect(obsticle.x+4,obsticle.y+4,obsticle.w-8,obsticle.h-8);
      fill(0);
      if (swapped==true) {
        rect(obsticle.x+8,obsticle.y+8,obsticle.w-16,obsticle.h-16);
      }
    }
    if (collide(p,obsticle)!=="none"&&!obsticle.touching) {
      obsticle.touching = true;
      swapped = !swapped;
      var temp = on;
      on = off;
      off = temp;
    }
    if (collide(p,obsticle)=="none"&&obsticle.touching) {
      obsticle.touching = null;
    }
  }
  for (var i=0;i<off.length;i++) {
    var obsticle = off[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      obsticle.draw();
      
      fill(255);
      rect(obsticle.x+2,obsticle.y+2,obsticle.w-4,obsticle.h-4);
      fill(0);
      rect(obsticle.x+4,obsticle.y+4,obsticle.w-8,obsticle.h-8);
      fill(255);
      rect(obsticle.x+6,obsticle.y+6,obsticle.w-12,obsticle.h-12);
      fill(0);
    }
  }
  for (var i=0;i<on.length;i++) {
    var obsticle = on[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      obsticle.draw();
      
      fill(255);
      rect(obsticle.x+2,obsticle.y+2,obsticle.w-4,obsticle.h-4);
      fill(0);
      rect(obsticle.x+4,obsticle.y+4,obsticle.w-8,obsticle.h-8);
      fill(255);
    }
  }
  for (var i=0;i<blocks.length;i++) {
    var obsticle = blocks[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      obsticle.draw();
    }
  }
  for (var i=0;i<particles.length;i++) {
    var obsticle = particles[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      obsticle.draw();
      obsticle.t--;
      obsticle.y-=4;
      if (obsticle.t<=0) {
        particles.splice(i,1);
      }
    }
  }
  //fans
  for (var i=0;i<fans.length;i++) {
    var obsticle = fans[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      obsticle.draw();
      if (Math.random()<0.05) {
        createParticle(obsticle.x+Math.floor(Math.random()*28),obsticle.y-4);
      }
    }
  }
  //
  for (var i=0;i<dithering.length;i++) {
    var obsticle = dithering[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      obsticle.draw();
      image(dither,obsticle.x,obsticle.y,32,32);
      fill(0);
    }
  }
  for (var i=0;i<colleft.length;i++) {
    var obsticle = colleft[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      image(dither,obsticle.x,obsticle.y,32,32);
      fill(255);
      rect(obsticle.x,obsticle.y,28,32);
      image(collumn,obsticle.x,obsticle.y,32,32);
      fill(0);
    }
  }
  for (var i=0;i<colright.length;i++) {
    var obsticle = colright[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      image(dither,obsticle.x-4,obsticle.y,32,32);
      fill(255);
      rect(obsticle.x,obsticle.y,28,32);
      image(collumn,obsticle.x-4,obsticle.y,32,32);
      fill(0);
    }
  }
  
  for (var i=0;i<colplatform.length;i++) {
    var obsticle = colplatform[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      image(collumn,obsticle.x,obsticle.y,32,32);
    }
  }
  for (var i=0;i<col.length;i++) {
    var obsticle = col[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      image(collumn,obsticle.x,obsticle.y,32,32);
    }
  }
  for (var i=0;i<semisolids.length;i++) {
    var obsticle = semisolids[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      obsticle.draw();
      rect(obsticle.x+4,obsticle.y+2,24,2);
      fill(0);
      if (obsticle.ex) {
        rect(obsticle.x+28,obsticle.y+2,8,2);
      }
      if (obsticle.fall==true) {
        fill(255);
        rect(obsticle.x,obsticle.y,4,3);
        rect(obsticle.x,obsticle.y+2,6,3);
        rect(obsticle.x+14,obsticle.y,6,3);
        rect(obsticle.x+12,obsticle.y+2,10,3);
        rect(obsticle.x+30,obsticle.y,2,3);
        fill(0);
      }
      if (obsticle.dith==true) {
        image(dither,obsticle.x,obsticle.y,32,32);
      }
    }
  }
  rect(win.x+4,win.y+4,24,24);
  fill(255);
  rect(win.x+10,win.y+10,12,12);
  fill(0);
  if (collide({"x":win.x+4,"y":win.y+4,"w":24,"h":24},p)!=="none") {
    win.p1 = true;
  }
  for (var i=0;i<spikes.length;i++) {
    var obsticle = spikes[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      fill(0);
      rect(obsticle.x,obsticle.y+28,2.2,4);
      rect(obsticle.x+2,obsticle.y+24,2.2,8);
      rect(obsticle.x+4,obsticle.y+20,2.2,12);
      rect(obsticle.x+6,obsticle.y+16,2.2,16);
      rect(obsticle.x+8,obsticle.y+12,2.2,20);
      rect(obsticle.x+10,obsticle.y+8,2.2,24);
      rect(obsticle.x+12,obsticle.y+4,2.2,28);
      rect(obsticle.x+14,obsticle.y,2.2,32);
      rect(obsticle.x+16,obsticle.y,2.2,32);
      rect(obsticle.x+18,obsticle.y+4,2.2,28);
      rect(obsticle.x+20,obsticle.y+8,2.2,24);
      rect(obsticle.x+22,obsticle.y+12,2.2,20);
      rect(obsticle.x+24,obsticle.y+16,2.2,16);
      rect(obsticle.x+26,obsticle.y+20,2.2,12);
      rect(obsticle.x+28,obsticle.y+24,2.2,8);
      rect(obsticle.x+30,obsticle.y+28,2.2,4);
      
      if (collide({"x":obsticle.x+6,"y":obsticle.y+2,"w":20,"h":28},p)!=="none") {
        fail1 = true;
      }
    }
  }
  
  var inAir = true;
  if (win.p1==false&&fail1==false) {
    speedY+=0.4;
    p.y+=speedY;
    for (var i=0;i<blocks.length;i++) {
      var obsticle = blocks[i];
      if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      if (collide(p,obsticle)=="top") {
        if (right) {
          speedX += 0.3;
          speedX = speedX*0.90;
        }
        if (left) {
          speedX -= 0.3;
          speedX = speedX*0.90;
        }
        p.y = obsticle.y-p.h;
        if (!left&&!right) {
          speedX = speedX*0.82;
        }
        if (up) {
          speedY=-10;
        } else {
          speedY = 0;
        }
      }
      if (collide(p,obsticle)=="bottom") {
        p.y = obsticle.y+obsticle.h+0.01;
        speedY *= -0.25;
      }
      if (collide(p,obsticle)=="left"&&p.y+p.h>obsticle.y+2) {
        if (p.x<screen.x) {fail1=true;}
        p.x = obsticle.x-p.w;
        if (right) {
          speedX = 0;
        }
      }
      if (collide(p,obsticle)=="right"&&p.y+p.h>obsticle.y+2) {
        if (p.x+p.w>screen.x+512) {fail1=true;}
        p.x = obsticle.x+obsticle.w;
        if (left) {
          speedX = 0;
        }
      }
      if (collide(p,obsticle)!=="none") {
        inAir = false;
      }
      if (up&&(p.y>=screen.height-p.h||collide(p,obsticle)=="bottom")&&collide(p,obsticle)!=="top") {
        speedY=-10;
      }
      obsticle.draw();
      }
    }
    for (var i=0;i<fans.length;i++) {
      var obsticle = fans[i];
      if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      if (collide(p,obsticle)=="top") {
        if (right) {
          speedX += 0.3;
          speedX = speedX*0.90;
        }
        if (left) {
          speedX -= 0.3;
          speedX = speedX*0.90;
        }
        p.y = obsticle.y-p.h;
        if (!left&&!right) {
          speedX = speedX*0.82;
        }
        if (up) {
          speedY=-10;
        } else {
          speedY = 0;
        }
      }
      if (collide(p,{"x":obsticle.x,"y":obsticle.y-240,"w":32,"h":240})!=="none") {
        if (!hasup) {
          speedY -= 0.3;
        }
        speedY -= 0.6;
      }
      if (collide(p,obsticle)=="bottom") {
        p.y = obsticle.y+obsticle.h+0.01;
        speedY *= -0.25;
      }
      if (collide(p,obsticle)=="left"&&p.y+p.h>obsticle.y+2) {
        if (p.x<screen.x) {fail1=true;}
        p.x = obsticle.x-p.w;
        if (right) {
          speedX = 0;
        }
      }
      if (collide(p,obsticle)=="right"&&p.y+p.h>obsticle.y+2) {
        if (p.x+p.w>screen.x+512) {fail1=true;}
        p.x = obsticle.x+obsticle.w;
        if (left) {
          speedX = 0;
        }
      }
      if (collide(p,obsticle)!=="none") {
        inAir = false;
      }
      if (up&&(p.y>=screen.height-p.h||collide(p,obsticle)=="bottom")&&collide(p,obsticle)!=="top") {
        speedY=-10;
      }
      obsticle.draw();
      }
    }
    for (i=0;i<on.length;i++) {
      obsticle = on[i];
      if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      if (collide(p,obsticle)=="top") {
        if (right) {
          speedX += 0.3;
          speedX = speedX*0.90;
        }
        if (left) {
          speedX -= 0.3;
          speedX = speedX*0.90;
        }
        p.y = obsticle.y-p.h;
        if (!left&&!right) {
          speedX = speedX*0.82;
        }
        if (up) {
          speedY=-10;
        } else {
          speedY = 0;
        }
      }
      if (collide(p,obsticle)=="bottom") {
        p.y = obsticle.y+obsticle.h+0.01;
        speedY *= -0.25;
      }
      if (collide(p,obsticle)=="left"&&p.y+p.h>obsticle.y+2) {
        if (p.x<screen.x) {fail1=true;}
        p.x = obsticle.x-p.w;
        if (right) {
          speedX = 0;
        }
      }
      if (collide(p,obsticle)=="right"&&p.y+p.h>obsticle.y+2) {
        if (p.x+p.w>screen.x+512) {fail1=true;}
        p.x = obsticle.x+obsticle.w;
        if (left) {
          speedX = 0;
        }
      }
      if (collide(p,obsticle)!=="none") {
        inAir = false;
      }
      if (up&&(p.y>=screen.height-p.h||collide(p,obsticle)=="bottom")&&collide(p,obsticle)!=="top") {
        speedY=-10;
      }
      }
    }
    for (i=0;i<semisolids.length;i++) {
      obsticle = semisolids[i];
      if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
        if (collide(p,obsticle)=="top"&&speedY>=0&&p.y<=obsticle.y-24&&(!(down&&obsticle.fall))) {
          if (right) {
            speedX += 0.3;
            speedX = speedX*0.90;
          }
          if (left) {
            speedX -= 0.3;
            speedX = speedX*0.90;
          }
          p.y = obsticle.y-p.h;
          if (!left&&!right) {
            speedX = speedX*0.82;
          }
          if (up) {
            speedY=-10;
          } else {
            speedY = 0;
          }
          inAir = false;
        }
      }
    }
    /* TEST CODE */
    if (inAir) {
      if (right) {
        speedX += 0.25;
      }
      if (left) {
        speedX -= 0.25;
      }
      if ((!(up&&hasup))||speedY>0) {
        hasup=false;
      }
      if (!hasup) {
        speedY+=0.3
      }
    } else {
      hasup = true;
    }
    /* TEST CODE */
    
    if (p.x<screen.x) {
      p.x=screen.x;
      speedX = 0;
    }
    if (p.x+p.w>screen.x+512) {
      p.x=screen.x+512-p.w-0.1;
      speedX = 0;
    }
    if (p.y<screen.y) {
      p.y=screen.y;
      speedY *= -0.25;
    }
    if (p.y>screen.y+512-p.h) {
      fail1 = true;
    } else {
      if (right) {
        speedX += 0.1;
      }
      if (left) {
        speedX -= 0.1;
      }
    }
    speedX = constrain(speedX,-4,4);
    speedY = constrain(speedY,-12,9);
    p.x+=speedX;
  }
  if (win.p1==false) {
    image(designs[0][design.p1],Math.floor(p.x),Math.floor(p.y),p.w,p.h);
    fill(255, 0, 0);
    //text("p1",p.x+16,p.y-8);
    dp = p.x;
    fill(0);
  }
  if (win.p1==true) {
    //text("Win!",win.x+4,win.y-4);
    level++;
    if (level>=levels) {
      game(end);
    } else {
      game(window["level"+level]);
    }
  }
  if (fail1) {
    game(stage);
  }
  text(texts[level],256,24);
  cursor();
  cursorArea(new Rectangle(2,2,64,16),'pointer');
}
}
function keyReleased() {
  if (key=="ArrowRight") {
    right = false;
  }
  if (key=="ArrowLeft") {
    left = false;
  }
  if (key=="ArrowUp") {
    up = false;
  }
  if (key=="ArrowDown") {
    down = false;
  }
}
function keyPressed() {
  if (key=="ArrowRight") {
    right = true;
  }
  if (key=="ArrowLeft") {
    left = true;
  }
  if (key=="ArrowUp") {
    up = true;
  }
  if (key=="ArrowDown") {
    down = true;
  }
  if (key==" ") {
    fail1 = true;
    fail2 = true;
  }
}
function clickBox(x,y,box,f) {
  if (x>=box.x&&x<=box.x+box.w&&y>=box.y&&y<=box.y+box.h) {
    f();
  }
}
function cursorArea(box,cur) {
  if (mouseX>=box.x&&mouseX<=box.x+box.w&&mouseY>=box.y&&mouseY<=box.y+box.h) {
    cursor(cur);
  }
}
function mouseClicked() {
  if (level>=levels) {
    window.location.replace("index.html");
  }
  clickBox(mouseX,mouseY,{"x":2,"y":2,"w":64,"h":16},function(){window.location.replace("index.html");});
}

if (!testmode) {
  game(window["level"+level]);
} else {
  game(test);
}
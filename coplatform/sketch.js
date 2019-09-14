var design = {"p1":localStorage.getItem("p1style") || 0,"p2":localStorage.getItem("p2style") || 1,"p3":localStorage.getItem("p3style") || 2,"p4":localStorage.getItem("p4style") || 3};

var nes;
var designs = [[],[],[],[]];
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
var logo;
var logo1;
var logo2;
var logo3;
var logo4;

function player1() {localStorage.setItem("playerselect",1);window.location.replace("p1.html");}
function player2() {localStorage.setItem("playerselect",2);window.location.replace("p2.html");}
function player3() {localStorage.setItem("playerselect",3);window.location.replace("p3.html");}
function player4() {localStorage.setItem("playerselect",4);window.location.replace("p4.html");}

function title1() {logo=logo1;}
function title2() {logo=logo2;}
function title3() {logo=logo3;}
function title4() {logo=logo4;}

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

play1 = new Rectangle(144,480,32,32,0);
play2 = new Rectangle(144+64,448,32,64,0);
play3 = new Rectangle(144+128,416,32,96,0);
play4 = new Rectangle(144+192,384,32,128,0);

function mouseClicked() {
  clickBox(mouseX,mouseY,play1,player1);
  clickBox(mouseX,mouseY,play2,player2);
  clickBox(mouseX,mouseY,play3,player3);
  clickBox(mouseX,mouseY,play4,player4);
  clickBox(mouseX,mouseY,{"x":2,"y":2,"w":80,"h":16},function(){window.location.replace("design.html");});
}

function draw() {
  cursor();
  background(255);
  fill(0);
  textAlign(LEFT);
  text("style",2,18);
  textAlign(CENTER);
  image(logo,128,16,256,64);
  text("How Many Players?\n(click a bar)",256,96);
  fill(255,0,0);
  text("1",play1.x+16,468);
  fill(0,255,0);
  text("2",play2.x+16,436);
  fill(255,255,0);
  text("3",play3.x+16,404);
  fill(0,0,255);
  text("4",play4.x+16,372);
  clickBox(mouseX,mouseY,play1,title1);
  clickBox(mouseX,mouseY,play2,title2);
  clickBox(mouseX,mouseY,play3,title3);
  clickBox(mouseX,mouseY,play4,title4);
  image(designs[0][design.p1],play1.x,play1.y,32,32);
  image(designs[1][design.p2],play2.x,play2.y,32,32);
  image(designs[0][design.p1],play2.x,play2.y+32,32,32);
  image(designs[2][design.p3],play3.x,play3.y,32,32);
  image(designs[1][design.p2],play3.x,play3.y+32,32,32);
  image(designs[0][design.p1],play3.x,play3.y+64,32,32);
  image(designs[3][design.p4],play4.x,play4.y,32,32);
  image(designs[2][design.p3],play4.x,play4.y+32,32,32);
  image(designs[1][design.p2],play4.x,play4.y+64,32,32);
  image(designs[0][design.p1],play4.x,play4.y+96,32,32);
  cursorArea(new Rectangle(2,2,80,16),'pointer');
  cursorArea(play1,'pointer');
  cursorArea(play2,'pointer');
  cursorArea(play3,'pointer');
  cursorArea(play4,'pointer');
}

function setup() {
  var canvas = createCanvas(512, 512);
  canvas.elt.style.border = "2px solid black";
  textAlign(CENTER);
  textFont("monospace");
  logo1 = loadImage("data:image/png;base64,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");
  logo2 = loadImage("data:image/png;base64,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");
  logo3 = loadImage("data:image/png;base64,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");
  logo4 = loadImage("data:image/png;base64,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");
  if (localStorage.getItem("playerselect")!=null) {
    if (localStorage.getItem("playerselect")==1) {
      logo = logo1
    } else if (localStorage.getItem("playerselect")==2) {
      logo = logo2
    } else if (localStorage.getItem("playerselect")==3) {
      logo = logo3
    } else {
      logo = logo4
    }
  } else {
    logo = logo2;
  }
  textFont(nes);
  textSize(16);
  strokeWeight(0);
}
console.log(localStorage.getItem("playerselect"));
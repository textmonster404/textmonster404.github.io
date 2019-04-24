function setup() {
// generate mandelbrot set //
for (var j=-2;j<=2;j+=0.01) {
  // string for current line //
  var s = "";
  for (var i=-2;i<=2;i+=0.005) {
    var c = new Complex(i,j);
    var z = new Complex(0,0);
    var n;
    // iterate // 
    for (n=0;n<50;n++) {
      z = z.multiply(z).add(c);
      if (z.getMagnitude()>=2) {break;}
    }
    // what character to print? //
    if (n<26) {
      s+=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"][n];
    } else if (n==50) {
      s+=" ";
    } else {
      s+="@"
    }
  }
  // print the current line //
  printLine(s);
}}

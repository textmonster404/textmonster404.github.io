function setup() {
// generate mandelbrot set //
for (var j=-2;j<=2;j+=0.005) {
  // string for current line //
  var s = "";
  for (var i=-2;i<=2;i+=0.0025) {
    var c = new Complex(i,j);
    var z = new Complex(0,0);
    var n;
    // iterate // 
    for (n=0;n<100;n++) {
      z = z.multiply(z).add(c);
      if (z.getMagnitude()>=2) {break;}
    }
    // what character to print? //
    if (n<36) {
      s+=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"][n];
    } else if (n==100) {
      s+=" ";
    } else {
      s+="@"
    }
  }
  // print the current line //
  printLine(s);
}}
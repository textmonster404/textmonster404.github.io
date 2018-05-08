// do rng(seed,control,rep);

var i,x,b1,a1,a2,j,rep2,control1,control2,seed1;
var xor = function(a,r) {
  b1 = a*2;
  b2 = (+b1).toString(2);
  a2 = (+a).toString(2);
  r = r.toString(2);
  x = "";
  for (j=0;j<r.length;j++) {
    for (i=0;i<a2.length;i++) {
      if (a2[i]==b2[i]) {x+="0"} else {x+="1"}
    }
  }
  return x;
};
var xor2 = function(a,b,r) {
  a2 = (+a).toString(2);
  b2 = (+b).toString(2);
  x = "";
  r = r.toString(2);
  for (j=0;j<r.length;j++) {
    for (i=0;i<a2.length;i++) {
      if (a2[i]==b2[i]) {x+="0"} else {x+="1"}
    }
  }
  return x;
};
var rng = function(seed,control,rep) {
  rep2 = xor2(xor(control,rep),xor(rep,rep),rep);
  control1 = xor(control,rep2);
  control2 = xor2(seed,control1,rep2);
  seed1 = xor2(seed,control2,rep2);
  return parseInt(seed1,2);
};
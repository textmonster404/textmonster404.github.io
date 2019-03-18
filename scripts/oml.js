var E = Math.E;
var LN2 = Math.LN2;
var LN10= Math.LN10;
var LOG2E = Math.LOG2E;
var LOG10E = Math.LOG10E;
var PI = Math.PI;
var SQRT1_2 = Math.SQRT1_2;
var SQRT2 = Math.SQRT2;
var abs = Math.abs;
var acos = Math.acos;
var acosh = Math.acosh;
var asin = Math.asin;
var asinh = Math.asinh;
var atan = Math.atan;
var atanh = Math.atanh;
var cbrt = Math.cbrt;
var clz32 = Math.clz32;
var cos = Math.cos;
var cosh = Math.cosh;
var exp = Math.exp;
var expml = Math.expml;
var floor = Math.floor;
var fround = Math.fround;
var hypot = Math.hypot;
var imul = Math.imul;
var log = Math.log;
var log1p = Math.log1p;
var log2 = Math.log2;
var log10 = Math.log10;
var max = Math.max;
var min = Math.min;
var pow = Math.pow;
var random = Math.random;
var round = Math.round;
var sign = Math.sign;
var sin = Math.sin;
var sinh = Math.sinh;
var sqrt = Math.sqrt;
var tan = Math.tan;
var tanh = Math.tanh;
var trunc = Math.trunc;
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
function evalString(string) {
	var tempT = string.split("\n");
	for (var i=0;i<tempT.length;i++) {
		tempT[i] = eval(tempT[i]);
	}
    var tempString = tempT[0].toString();
	for (var i=1;i<tempT.length;i++) {
		tempString += "<br/>"+tempT[i].toString();
	}
	return tempString;
}
function ddoml(string) {
	return "<div><code>" + string.replaceAll("\n","<br/>")
        .replaceAll("<---","<h3>")
        .replaceAll("--->","</h3>")
        .replaceAll("<--","<h2>")
        .replaceAll("-->","</h2>")
        .replaceAll("<-","<h1>")
        .replaceAll("->","</h1>")
        .replaceAll("[-","<div style='text-align:right;'>")
        .replaceAll("-]","</div>")
        .replaceAll("{-","<div style='text-align:center;'>")
        .replaceAll("-}","</div>")
        .replaceAll("<_","<u>")
        .replaceAll("_>","</u>")
        .replaceAll("<**","<b>")
        .replaceAll("**>","</b>")
        .replaceAll("<*","<i>")
        .replaceAll("*>","</i>")
        .replaceAll("*","&nbsp;\u2022&nbsp;")
        .replaceAll("--","<hr/>")
        .replaceAll("<#>","&nbsp;&nbsp;&nbsp;&nbsp;")
        + "</code></div>";
}
function ldoml(string) {
	return "<div><code>" + string.replaceAll("\n","<br/>")
        .replaceAll("<---","<h3>")
        .replaceAll("--->","</h3>")
        .replaceAll("<--","<h2>")
        .replaceAll("-->","</h2>")
        .replaceAll("<-","<h1>")
        .replaceAll("->","</h1>")
        .replaceAll("<_","<u>")
        .replaceAll("_>","</u>")
        .replaceAll("<**","<b>")
        .replaceAll("**>","</b>")
        .replaceAll("<*","<i>")
        .replaceAll("*>","</i>")
        .replaceAll("<\\","<s>")
        .replaceAll("/>","</s>")
	.replaceAll("******","&nbsp;\u204D&nbsp;")
        .replaceAll("*****","&nbsp;\u2043&nbsp;")
        .replaceAll("****","&nbsp;\u9632&nbsp;")
        .replaceAll("***","&nbsp;\u25CB&nbsp;")
        .replaceAll("**","&nbsp;\u2023&nbsp;")
        .replaceAll("*","&nbsp;\u2022&nbsp;")
        .replaceAll("--","<hr/>")
        .replaceAll("<#>","&nbsp;&nbsp;&nbsp;&nbsp;")
        + "</code></div>";
}
function tdoml(string) {
	return "<div><code>" + string.replaceAll("\n","<br/>")
        .replaceAll("<---","<h3>")
        .replaceAll("--->","</h3>")
        .replaceAll("<--","<h2>")
        .replaceAll("-->","</h2>")
        .replaceAll("<-","<h1>")
        .replaceAll("->","</h1>")
        .replaceAll("[-","<div style='text-align:right;'>")
        .replaceAll("-]","</div>")
        .replaceAll("{-","<div style='text-align:center;'>")
        .replaceAll("-}","</div>")
	.replaceAll("0[==","<table border=0>")
	.replaceAll("1[==","<table border=1>")
	.replaceAll("[==","<table border=1>")
	.replaceAll("==]","</table>")
	.replaceAll("[=","<tr>")
	.replaceAll("=]","</tr>")
	.replaceAll("{2}[","<td colspan='2'>")
	.replaceAll("{3}[","<td colspan='3'>")
	.replaceAll("{4}[","<td colspan='4'>")
	.replaceAll("{5}[","<td colspan='5'>")
	.replaceAll("{6}[","<td colspan='6'>")
	.replaceAll("{7}[","<td colspan='7'>")
	.replaceAll("{8}[","<td colspan='8'>")
	.replaceAll("{9}[","<td colspan='9'>")
	.replaceAll("{10}[","<td colspan='10'>")
	.replaceAll("(2)[","<td rowspan='2'>")
	.replaceAll("(3)[","<td rowspan='3'>")
	.replaceAll("(4)[","<td rowspan='4'>")
	.replaceAll("(5)[","<td rowspan='5'>")
	.replaceAll("(6)[","<td rowspan='6'>")
	.replaceAll("(7)[","<td rowspan='7'>")
	.replaceAll("(8)[","<td rowspan='8'>")
	.replaceAll("(9)[","<td rowspan='9'>")
	.replaceAll("(10)[","<td rowspan='10'>")
	.replaceAll("{2}(2)[","<td colspan='2' rowspan='2'>")
	.replaceAll("{3}(2)[","<td colspan='3' rowspan='2'>")
	.replaceAll("{4}(2)[","<td colspan='4' rowspan='2'>")
	.replaceAll("{5}(2)[","<td colspan='5' rowspan='2'>")
	.replaceAll("{6}(2)[","<td colspan='6' rowspan='2'>")
	.replaceAll("{7}(2)[","<td colspan='7' rowspan='2'>")
	.replaceAll("{8}(2)[","<td colspan='8' rowspan='2'>")
	.replaceAll("{9}(2)[","<td colspan='9' rowspan='2'>")
	.replaceAll("{10}(2)[","<td colspan='10' rowspan='2'>")
	.replaceAll("{2}(3)[","<td colspan='2' rowspan='3'>")
	.replaceAll("{3}(3)[","<td colspan='3' rowspan='3'>")
	.replaceAll("{4}(3)[","<td colspan='4' rowspan='3'>")
	.replaceAll("{5}(3)[","<td colspan='5' rowspan='3'>")
	.replaceAll("{6}(3)[","<td colspan='6' rowspan='3'>")
	.replaceAll("{7}(3)[","<td colspan='7' rowspan='3'>")
	.replaceAll("{8}(3)[","<td colspan='8' rowspan='3'>")
	.replaceAll("{9}(3)[","<td colspan='9' rowspan='3'>")
	.replaceAll("{10}(3)[","<td colspan='10' rowspan='3'>")
	.replaceAll("{2}(4)[","<td colspan='2' rowspan='4'>")
	.replaceAll("{3}(4)[","<td colspan='3' rowspan='4'>")
	.replaceAll("{4}(4)[","<td colspan='4' rowspan='4'>")
	.replaceAll("{5}(4)[","<td colspan='5' rowspan='4'>")
	.replaceAll("{6}(4)[","<td colspan='6' rowspan='4'>")
	.replaceAll("{7}(4)[","<td colspan='7' rowspan='4'>")
	.replaceAll("{8}(4)[","<td colspan='8' rowspan='4'>")
	.replaceAll("{9}(4)[","<td colspan='9' rowspan='4'>")
	.replaceAll("{10}(4)[","<td colspan='10' rowspan='4'>")
	.replaceAll("{2}(5)[","<td colspan='2' rowspan='5'>")
	.replaceAll("{3}(5)[","<td colspan='3' rowspan='5'>")
	.replaceAll("{4}(5)[","<td colspan='4' rowspan='5'>")
	.replaceAll("{5}(5)[","<td colspan='5' rowspan='5'>")
	.replaceAll("{6}(5)[","<td colspan='6' rowspan='5'>")
	.replaceAll("{7}(5)[","<td colspan='7' rowspan='5'>")
	.replaceAll("{8}(5)[","<td colspan='8' rowspan='5'>")
	.replaceAll("{9}(5)[","<td colspan='9' rowspan='5'>")
	.replaceAll("{10}(5)[","<td colspan='10' rowspan='5'>")
	.replaceAll("{2}(6)[","<td colspan='2' rowspan='6'>")
	.replaceAll("{3}(6)[","<td colspan='3' rowspan='6'>")
	.replaceAll("{4}(6)[","<td colspan='4' rowspan='6'>")
	.replaceAll("{5}(6)[","<td colspan='5' rowspan='6'>")
	.replaceAll("{6}(6)[","<td colspan='6' rowspan='6'>")
	.replaceAll("{7}(6)[","<td colspan='7' rowspan='6'>")
	.replaceAll("{8}(6)[","<td colspan='8' rowspan='6'>")
	.replaceAll("{9}(6)[","<td colspan='9' rowspan='6'>")
	.replaceAll("{10}(6)[","<td colspan='10' rowspan='6'>")
	.replaceAll("{2}(7)[","<td colspan='2' rowspan='7'>")
	.replaceAll("{3}(7)[","<td colspan='3' rowspan='7'>")
	.replaceAll("{4}(7)[","<td colspan='4' rowspan='7'>")
	.replaceAll("{5}(7)[","<td colspan='5' rowspan='7'>")
	.replaceAll("{6}(7)[","<td colspan='6' rowspan='7'>")
	.replaceAll("{7}(7)[","<td colspan='7' rowspan='7'>")
	.replaceAll("{8}(7)[","<td colspan='8' rowspan='7'>")
	.replaceAll("{9}(7)[","<td colspan='9' rowspan='7'>")
	.replaceAll("{10}(7)[","<td colspan='10' rowspan='7'>")
	.replaceAll("{2}(8)[","<td colspan='2' rowspan='8'>")
	.replaceAll("{3}(8)[","<td colspan='3' rowspan='8'>")
	.replaceAll("{4}(8)[","<td colspan='4' rowspan='8'>")
	.replaceAll("{5}(8)[","<td colspan='5' rowspan='8'>")
	.replaceAll("{6}(8)[","<td colspan='6' rowspan='8'>")
	.replaceAll("{7}(8)[","<td colspan='7' rowspan='8'>")
	.replaceAll("{8}(8)[","<td colspan='8' rowspan='8'>")
	.replaceAll("{9}(8)[","<td colspan='9' rowspan='8'>")
	.replaceAll("{10}(8)[","<td colspan='10' rowspan='8'>")
	.replaceAll("{2}(9)[","<td colspan='2' rowspan='9'>")
	.replaceAll("{3}(9)[","<td colspan='3' rowspan='9'>")
	.replaceAll("{4}(9)[","<td colspan='4' rowspan='9'>")
	.replaceAll("{5}(9)[","<td colspan='5' rowspan='9'>")
	.replaceAll("{6}(9)[","<td colspan='6' rowspan='9'>")
	.replaceAll("{7}(9)[","<td colspan='7' rowspan='9'>")
	.replaceAll("{8}(9)[","<td colspan='8' rowspan='9'>")
	.replaceAll("{9}(9)[","<td colspan='9' rowspan='9'>")
	.replaceAll("{10}(9)[","<td colspan='10' rowspan='9'>")
	.replaceAll("{2}(10)[","<td colspan='2' rowspan='10'>")
	.replaceAll("{3}(10)[","<td colspan='3' rowspan='10'>")
	.replaceAll("{4}(10)[","<td colspan='4' rowspan='10'>")
	.replaceAll("{5}(10)[","<td colspan='5' rowspan='10'>")
	.replaceAll("{6}(10)[","<td colspan='6' rowspan='10'>")
	.replaceAll("{7}(10)[","<td colspan='7' rowspan='10'>")
	.replaceAll("{8}(10)[","<td colspan='8' rowspan='10'>")
	.replaceAll("{9}(10)[","<td colspan='9' rowspan='10'>")
	.replaceAll("{10}(10)[","<td colspan='10' rowspan='10'>")
	.replaceAll("[","<td>")
	.replaceAll("]","</td>")
        .replaceAll("<_","<u>")
        .replaceAll("_>","</u>")
        .replaceAll("<**","<b>")
        .replaceAll("**>","</b>")
        .replaceAll("<*","<i>")
        .replaceAll("*>","</i>")
        .replaceAll("*","&nbsp;\u2022&nbsp;")
        .replaceAll("--","<hr/>")
        + "</code></div>";
}

function oml(string) {
	return "<div><code>" + string.replaceAll("\n","<br/>")
        .replaceAll("<------","<h6>")
        .replaceAll("------>","</h6>")
        .replaceAll("<-----","<h5>")
        .replaceAll("----->","</h5>")
        .replaceAll("<----","<h4>")
        .replaceAll("---->","</h4>")
        .replaceAll("<---","<h3>")
        .replaceAll("--->","</h3>")
        .replaceAll("<--","<h2>")
        .replaceAll("-->","</h2>")
        .replaceAll("<-","<h1>")
        .replaceAll("->","</h1>")
        .replaceAll("[-","<div style='text-align:right;'>")
        .replaceAll("-]","</div>")
        .replaceAll("{-","<div style='text-align:center;'>")
        .replaceAll("-}","</div>")
	.replaceAll("1[==","<table border=1>")
	.replaceAll("0[==","<table border=0>")
	.replaceAll("==]","</table>")
	.replaceAll("[=","<tr>")
	.replaceAll("=]","</tr>")
	.replaceAll("[","<td>")
	.replaceAll("]","</td>")
        .replaceAll("<_","<u>")
        .replaceAll("_>","</u>")
        .replaceAll("<**","<b>")
        .replaceAll("**>","</b>")
        .replaceAll("<*","<i>")
        .replaceAll("*>","</i>")
        .replaceAll("***","&nbsp;\u2023&nbsp;")
        .replaceAll("**","&nbsp;\u25CB&nbsp;")
        .replaceAll("*","&nbsp;\u2022&nbsp;")
        .replaceAll("--","<hr/>")
        + "</code></div>";
}

function ltxt(string) {
	return "<div><code>" + string.replaceAll("\n","<br/>")
        .replaceAll("[","<a href='")
	.replaceAll("|","'>")
        .replaceAll("]","</a>")
	.replaceAll("  ","&nbsp;&nbsp;")
        + "</code></div>";
}

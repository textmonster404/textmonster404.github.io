String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
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
        .replaceAll("***","&nbsp;\u2023&nbsp;")
        .replaceAll("**","&nbsp;\u25CB&nbsp;")
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
if (document.documentElement.innerHTML.includes("<use-style joshcss")) {
    document.write("<link rel='stylesheet' href='https://textmonster404.github.io/stylesheets/JoshCSS.css'>");
    var triangles = document.getElementsByTagName('speech-triangle');for (var i=0;i<triangles.length;i++) {triangles[i].innerHTML='&nbsp;';};
}
if (document.documentElement.innerHTML.includes("<use-style math")) {
    document.write("<script src='https://www.w3.org/scripts/MathJax/2/MathJax.js'><\/script>");
}
if (document.documentElement.innerHTML.includes("<use-tag js-insert pi")) {
    for (var i=0;i<document.getElementsByTagName("js-insert").length;i++) {
	    if (document.getElementsByTagName("js-insert")[i].getAttribute("pi")!==null) {
            document.getElementsByTagName("js-insert")[i].innerHTML=Math.PI;
        }
    }
}
if (document.documentElement.innerHTML.includes("<use-tag js-insert phi")) {
    for (var i=0;i<document.getElementsByTagName("js-insert").length;i++) {
	    if (document.getElementsByTagName("js-insert")[i].getAttribute("phi")!==null) {
            document.getElementsByTagName("js-insert")[i].innerHTML=(1+Math.sqrt(5))/2;
        }
    }
}
for (var i=0;i<document.getElementsByTagName("title-icon").length;i++) {
    document.getElementsByTagName("title-icon")[i].innerHTML = "<link rel='icon' href='"+document.getElementsByTagName("title-icon")[i].href+"'/>";
}
if (document.documentElement.innerHTML.includes("<use-tag title-alt")) {
    title1 = document.getElementsByTagName("title")[0].innerHTML;
    title2 = document.getElementsByTagName("title-alt")[0].innerHTML;
    titleSpeed = document.getElementsByTagName("title-speed")[0].value;
    window.setInterval(function() {if (document.getElementsByTagName("title")[0].innerHTML==title1) {document.getElementsByTagName("title")[0].innerHTML = title2} else {document.getElementsByTagName("title")[0].innerHTML = title1}},titleSpeed);
}
if (document.documentElement.innerHTML.includes("<use-tag js-eval")) {
    for (var i=0;i<document.getElementsByTagName("js-eval").length;i++) {
        document.getElementsByTagName("js-eval")[i].innerHTML=eval(document.getElementsByTagName("js-eval")[i].innerHTML);
    }
}
if (document.documentElement.innerHTML.includes("<use-tag oml")) {
    for (var i=0;i<document.getElementsByTagName("ddoml").length;i++) {
        document.getElementsByTagName("ddoml")[i].innerHTML=ddoml(document.getElementsByTagName("ddoml")[i].innerHTML);
    }
    for (var i=0;i<document.getElementsByTagName("doml").length;i++) {
        document.getElementsByTagName("doml")[i].innerHTML=ddoml(document.getElementsByTagName("doml")[i].innerHTML);
    }
    for (var i=0;i<document.getElementsByTagName("dml").length;i++) {
        document.getElementsByTagName("dml")[i].innerHTML=ddoml(document.getElementsByTagName("dml")[i].innerHTML);
    }
    for (var i=0;i<document.getElementsByTagName("ldoml").length;i++) {
        document.getElementsByTagName("ldoml")[i].innerHTML=ldoml(document.getElementsByTagName("ldoml")[i].innerHTML);
    }
    for (var i=0;i<document.getElementsByTagName("ldml").length;i++) {
        document.getElementsByTagName("ldml")[i].innerHTML=ldoml(document.getElementsByTagName("ldml")[i].innerHTML);
    }
    for (var i=0;i<document.getElementsByTagName("lml").length;i++) {
        document.getElementsByTagName("lml")[i].innerHTML=ldoml(document.getElementsByTagName("lml")[i].innerHTML);
    }
    for (var i=0;i<document.getElementsByTagName("ddoml").length;i++) {
        document.getElementsByTagName("ddoml")[i].innerHTML=tdoml(document.getElementsByTagName("ddoml")[i].innerHTML);
    }
    for (var i=0;i<document.getElementsByTagName("ldml").length;i++) {
        document.getElementsByTagName("ddml")[i].innerHTML=tdoml(document.getElementsByTagName("ddml")[i].innerHTML);
    }
    for (var i=0;i<document.getElementsByTagName("lml").length;i++) {
        document.getElementsByTagName("dml")[i].innerHTML=tdoml(document.getElementsByTagName("dml")[i].innerHTML);
    }
    for (var i=0;i<document.getElementsByTagName("toml").length;i++) {
        document.getElementsByTagName("toml")[i].innerHTML=tdoml(document.getElementsByTagName("toml")[i].innerHTML);
    }
    for (var i=0;i<document.getElementsByTagName("oml").length;i++) {
        document.getElementsByTagName("oml")[i].innerHTML=oml(document.getElementsByTagName("oml")[i].innerHTML);
    }
}
if (document.documentElement.innerHTML.includes("<use-tag ltxt")) {
    for (var i=0;i<document.getElementsByTagName("ltxt").length;i++) {
        document.getElementsByTagName("ltxt")[i].innerHTML=ltxt(document.getElementsByTagName("ltxt")[i].innerHTML);
    }
}

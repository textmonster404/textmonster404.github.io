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
	.replaceAll("[==","<table border=1>")
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
	.replaceAll("0[==","<table border=0>")
	.replaceAll("1[==","<table border=1>")
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

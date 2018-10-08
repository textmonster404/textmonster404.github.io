String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
function lml(string) {
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
        .replaceAll("*","&nbsp;\u2022&nbsp;")
        .replaceAll("**","&nbsp;\u25CB&nbsp;")
        .replaceAll("--","<hr/>")
        .replaceAll("<#>","&nbsp;&nbsp;&nbsp;&nbsp;")
        + "</code></div>";
}

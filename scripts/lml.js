String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
function lml(string) {
	return "<div><code>" + string.replaceAll("<------","<h6>")
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
        .replaceAll("*"," • ")
        .replaceAll("**"," ○ ")
        .replaceAll("--","<hr/>")
        .replaceAll("<#>","&nbsp;&nbsp;&nbsp;&nbsp;")
        + "</code></div>";
}

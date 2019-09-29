var anchors = document.getElementsByTagName("a");
for (var i=0;i<anchors.length;i++) {
	var a = anchors[i];
    if (a.href.substring(0,5)=="https") {
        a.setAttribute("secure","");
        a.secure = true;
    } else {
        a.secure = false;
    }
}

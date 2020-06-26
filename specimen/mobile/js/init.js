function isMobile()
{
	
var system = {
	win : false,
	mac : false,
	xll : false
};

var p = navigator.platform;
var ua = navigator.userAgent.toLowerCase();	
	
system.win = p.indexOf("Win") == 0;
system.mac = p.indexOf("Mac") == 0;
system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);

return ($(window).width() < 1025);

}

function reloc()
{

if(!isMobile())
{
	$("html").hide();
	window.location.href = "../index.html";
}

}

reloc();

window.onresize = function()
{
	reloc();
}

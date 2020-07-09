requirejs([
	'css!//cdn.bootcss.com/bootstrap/3.3.0/css/bootstrap.min.css', 
	'css!//cdn.bootcdn.net/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css', 
	'css!../css/styles.css',
	'jquery',
	'browser'
],
function(_, _, _, $, Browser) {

// Main Module

function notCompatible()
{
	var b = Browser.brow;
	return (b.type == "IE" && b.ver < 11) || (b.type == "Adblock");
}

function preLoad()
{
	if($.support.leadingWhitespace)
	{
		$("html").css('visibility', 'visible');
		
		if(notCompatible()) 
		{
			$(".unsupported-browser").show();
		}
	}
	else
	{
		alert("Please use browser with higher version.");
	}
}

function LoadQRC()
{
	if(device.mobile())
	{
		$(".qrCode").hide();
	}
	else
	{
		$(".qrCode").show();
		$(".qrCode").hover(function(e) { $("#qr").fadeIn(200); });
		$(".qrCode").mouseleave(function(e) { $("#qr").fadeOut(200); });
	}
}

function LoadSafeLink() 
{
	if(!document.getElementsByTagName) return;	
	var anchors = document.getElementsByTagName("a");
	var frames = document.getElementsByTagName("iframe");
	
	for(var i = 0 ; i < anchors.length ; i++) 
	{
		var anchor = anchors[i];
		if(anchor.getAttribute("href") && anchor.getAttribute("target") == "_blank")
		{ 
			anchor.rel = "nofollow noopener noreferrer";
		}
	}
	
	for(var j = 0 ; j < frames.length ; j++)
	{
		var frame = frames[j];
		frame.sandbox = "allow-same-origin allow-scripts";
	}
}

function LoadToTop()
{
	$(window).scroll(function(){
		if($('html').scrollTop() + $('body').scrollTop() == 0)
		{
			$('.returnTop').fadeOut(100);
		}
		else
		{
			$('.returnTop').fadeIn(100); 
		}
	});
	
	$('.returnTop').click(function(){ 
		$('html, body').animate({scrollTop: 0}, 200); 
	});	
}

$(function(){
	preLoad();
	LoadQRC();
	LoadToTop();
	LoadSafeLink();
});

// End of Main Module

});


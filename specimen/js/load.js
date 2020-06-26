function strlen(str){
    var len = 0;
    for (var i=0; i<str.length; i++) { 
     var c = str.charCodeAt(i); 
     if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
       len++; 
     } 
     else { 
      len+=2; 
     } 
    } 
    return len;
}

function TrimEx(str,is_global)
  {
   var result;
   result = str.replace(/(^\s+)|(\s+$)/g,"");
   if(is_global.toLowerCase()=="g")
   {
    result = result.replace(/\s/g,"");
    }
   return result;
}

$(document).ready(function(){
	
	//var wavBase = "mobile/wav/";
	var imgBase = "mobile/img/";
	
$(".demo-list-item").click(function(){

    var ih = $(this).text();
	
	//replay wav
	var song = document.getElementById("player2");
	song.src = cicada[$("#demo-list .demo-list-item").index(this)];//wavBase + TrimEx(ih,"g") + ".wav";
	
	//reload jpg
	var jpgpath = imgBase + TrimEx(ih,"g") + ".jpg";	
	var ebd = document.getElementById("jpg").src;
	
	var up = encodeURI(jpgpath);
	var ue = ebd.slice(-strlen(up)); 
	
	if(up != ue){
		$('.stage > img').remove();
		var str = '<img id="jpg" src="' + jpgpath + '" alt="Slide 01" width="500" height="350">';
		$('.stage').html(str);
	} 
});

});

requirejs(['jquery'], function($) {

// Module Codemusic

function loadCodingMusic(sid, sname, singer)
{
	var lnk = "https://y.qq.com/n/yqq/song/" + sid + "_num.html";
	var li = '<li><i class="fa fa-headphones"></i> <a href="' + lnk;
	li += '" target="_blank">' + sname + ' - ' + singer + '</a></li>';
	$('.list-unstyled').eq(1).append(li);
}

function getSonglist()
{
	$.ajax({
  		url	  	 : domain + "/qmusic/index.php",
		type  	 : 'GET',
		async 	 : false,
  		dataType : 'json',
  		success  : function(data)
		{
			$.each(data, function(i, item)
			{
				loadCodingMusic(item.songid, item.songname, item.artist);
			});
			
			console.log('Codemusic ready!');
		},
		error: function(data, type, err)
		{
			console.log('Getting failed: ' + data.status);
			console.log('Error type: ' + type);
			console.log('Error: ' + err);
		}
	});
	
}

getSonglist();

// End of Module Codemusic

});


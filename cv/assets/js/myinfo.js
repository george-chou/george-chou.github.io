requirejs(['jquery'], function($) {

// Module MyInfo

function loadMyInfo(data)
{
	$('.header img').attr('alt', isEn ? data.first + ' ' + data.last : data.clast + data.cfirst);
	$('.header h1').text(isEn ? data.first + ' ' + data.last : data.clast + data.cfirst);
	$('.header h2').text(isEn ? data.job : data.cjob);
	$('.btn-cta-primary').attr('href', 'mailto:' + data.email);
	$('section[class="about section"] p').text(isEn ? data.about : data.cabout);
	
	$('meta[name=description]').attr('content', isEn ? "Welcome to " + data.first + ' ' + data.last + "'s Page of CV" : "欢迎浏览" + data.clast + data.cfirst + "的简历");
	$('meta[name=author]').attr('content', isEn ? data.first : data.cfirst);
}

function getMyInfo()
{
	$.ajax({
  		url	  	 : domain + "/myinfo/index.php",
		data	 : {
			'ikey' : 1234,
			'lg'   : (isEn ? 'en' : 'cn')
		},
		type  	 : 'GET',
		async 	 : false,
  		dataType : 'json',
  		success  : function(data)
		{
			loadMyInfo(data.info[0]);
			console.log('MyInfo ready!');
		},
		error	 : function(data, type, err)
		{
			console.log('Getting failed: ' + data.status);
			console.log('Error type: ' + type);
			console.log('Error: ' + err);
		}
	});
	
}

$(function(){
	$('.header img').attr('src', domain + "/myinfo/index.php?ikey=1234&mode=img");
	getMyInfo();
});
// End of Module MyInfo

});


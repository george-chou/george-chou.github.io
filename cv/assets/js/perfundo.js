requirejs([
	'css!//cdn.bootcdn.net/ajax/libs/perfundo/4.0.4/perfundo.with-icons.min.css',
	'css!../css/perfundo.css',
	'jquery'
], 
function(_, _, $) {

// Module Perfundo

function ShowCer(id, caption)
{
	var imglnk = domain + '/award/index.php?action=get&id=' + id;
	$('.perfundo__image').css("background-image","url(" + imglnk + ")"); 
	$('.perfundo__caption').text(caption);
}
/*
function workExp()
{
	var workexp = $('.latest').eq(0).find('.perfundo__link');
	var caption = $('.latest').eq(0).find('.title');
	
	workexp.each(function(index) {
        $(this).click(function(e) { 
			ShowCer(index, caption.eq(index).text()); 
		});
    });
}
*/
function toDate(date)
{
	var basic = date.toString();
	basic = basic.substr(0, basic.length - 3);
	return basic.replace("-", ".");
}
/*
function up(x, y)
{
	var date1 = new Date(x.date);
	var date2 = new Date(y.date);
	
	return (date1.getTime() < date2.getTime()) ? 1 : -1;
}
*/
function loadCers(title, place, date, lnk)
{
	var institute = place;
	
	if(lnk !== null)
	{
		institute = '<a href="' + lnk;
		institute += '" target="_blank" rel="nofollow noopener noreferrer" style="color: inherit !important;">';
		institute += place + '</a>';
	}
	
	var divitem = '<div class="item"><h3 class="title"><i class="fa fa-certificate"></i> ';
	divitem += '<a class="perfundo__link" href="#perfundo-single2">' + title + '</a></h3>';
	divitem += '<h4 class="university">' + institute + '<span class="year"> (' + toDate(date) + ')</span></h4></div>';
	
	return divitem;
}

function getCers()
{
		
	$.ajax({
  		url: domain + "/award/index.php",
		type  :	'GET',
		async :	false,
  		data: {
			"lg" : (isEn ? "en" : "cn")
		},  
  		dataType: "json", 
  		success: function(data)
		{
			var condiv = $('.education').eq(1).find('.content').eq(0);
			
			$.each(data.data, function(i, item)
			{
				var divitem = loadCers(
					isEn ? item.title : item.ctitle, 
					isEn ? item.institute : item.cinstitute, 
					item.date, 
					isEn ? item.url : item.curl
				);
				
				condiv.append(divitem);
				condiv.find('.perfundo__link').eq(i).click(function(e) {
					ShowCer(item.id, isEn ? item.description : item.cdescription);
				});
				
			});
			
			console.log('Awards ready!');
		},
		error: function(data, type, err)
		{
			console.log('Getting failed: ' + data.status);
			console.log('Error type: ' + type);
			console.log('Error: ' + err);
		}
		
	});		
}

$(function(){
	getCers();
});

// End of Module Perfundo

});
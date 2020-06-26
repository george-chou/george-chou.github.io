requirejs(['jquery'], function($) {

function ShowCer(img, caption)
{
	var imglnk = 'assets/images/projects/project-' + img + '.png';
	$('.perfundo__image').css("background-image","url(" + imglnk + ")"); 
	$('.perfundo__caption').text(caption);
}

function workExp()
{
	var workexp = $('.latest').eq(0).find('.perfundo__link');
	var caption = $('.latest').eq(0).find('.title');
	
	workexp.each(function(index) {
        $(this).click(function(e) { ShowCer(index, caption.eq(index).text()); });
    });
}
/*
function toDate(date)
{
	var basic = date.toString();
	basic = basic.substr(0, basic.length - 3);
	return basic.replace("-", ".");
}

function up(x, y)
{
	var date1 = new Date(x.date);
	var date2 = new Date(y.date);
	
	return (date1.getTime() < date2.getTime()) ? 1 : -1;
}

function loadCers(title, place, date, lnk, photo, descript)
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
	
	//$.ajaxSettings.async = false;	
	$.ajax({
  		url: domain + "/api/award/index.php",
  		data: {"lg":(isEn?"en":"cn")},  
  		dataType: "json",
  		success: function(data){
			
			data.sort(up);
			var condiv = $('.education').eq(1).find('.content').eq(0);
			
			$.each(data, function(i, item)
			{
				var divitem;
				
				if(isEn)
				{
					divitem = loadCers(item.title, item.place, item.date, item.link);
					condiv.append(divitem);
					condiv.find('.perfundo__link').eq(i).click(function(e) {
						ShowCer(item.photo, item.descript);
					});
				}
				else
				{
					divitem = loadCers(item.titlezh, item.placezh, item.date, item.linkzh);
					condiv.append(divitem);
					condiv.find('.perfundo__link').eq(i).click(function(e) {
						ShowCer(item.photo, item.descriptzh);
					});
				}
				
			})
		}
	});		
}

getCers();
*/

workExp();
});
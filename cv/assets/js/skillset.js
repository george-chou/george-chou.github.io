requirejs(['jquery'], function($) {
	
// Module Skillset

function toPercent(point)
{
    return Number(point * 100).toFixed(1) + "%";
}

function porp(x, y)
{ 
	return x.frequency < y.frequency ? 1 : -1; 
}

function loadSkillset(lang, freq)
{
	var newItem = '<div class="item"><h3 class="level-title">' + lang;
	newItem += '<span class="level-label">' + freq + '</span></h3>';
	newItem += '<div class="level-bar"><div class="level-bar-inner">';
	newItem += '</div></div></div>';
	
	return newItem;
}

function appendSkillset(i, frequency, language)
{
	var freq = toPercent(frequency);
	$('.skillset').append(loadSkillset(language, freq));
	$('.skillset').find('.level-bar-inner').eq(i).animate({ width: freq }, 800);
}

function LoadLevelBar()
{
	$.ajax({
  		url	  	 : domain + "/skillset/index.php",
		type  	 : 'GET',
		async 	 : false,
  		dataType : 'json',
  		success  : function(data)
		{
			data.sort(porp);
			$.each(data, function(i, item)
			{
				appendSkillset(i, item.frequency, item.language);
			});
			
			console.log('Skillset ready!');
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
	LoadLevelBar(); 
});
// End of Module Skillset

});
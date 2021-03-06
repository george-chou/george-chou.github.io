var domain = "https://george-chou.github.io/mathmusic"; 
var isMobile = ($(document.body).width() < 895);
var search = false;  //是否已经搜索
var mainList = ""; //滚动条
var stopTag = "<span class='list-icon icon-play icon-stops' data-function='stop' title='Pause'></span>";
var playTag = "<span class='list-icon icon-play' data-function='play' title='Play'></span>";

//对象获取
function dom(id) { return document.getElementById(id); }

function getURL(index, title, author, mode)
{
	var url = domain + "/songs/" + index + "/" + title + "-" + author;
	
	switch(mode)
	{
		case (-1):
			url += ".pdf";
			break;
		
		case 0:
			url += ".pdf";
			break;
			
		case 1:
			url += ".nb";
			break;

		case 2:
			url += ".mid";
			break;
			
		case 3:
			url += ".wav";
			break;
			
		case 4:
			url += ".mp3";
			break;
				
		default:
			return;				
	}
	
	return url;
}

function getLink(currentObject, mode)
{
	var id = currentObject.data("index");
	var title = currentObject.find(".music-name-cult").text();
	var author = currentObject.find(".auth-name").text();
	
	return getURL(id, title, author, mode);
}

function loadPDF()
{
	var pdfjs = $("#music-stave").children('iframe');
	pdfjs.attr("src", domain + "/pdfjs/web/viewer.html");
}

function updPDF(el)
{
	var pdf = getLink(el, (-1));
	var pdfjs = $("#music-stave").children('iframe');
	pdfjs.attr("src", domain + "/pdfjs/web/viewer.html?file=" + pdf);
}

// 列表中的菜单点击
$(".music-list").on("click",".icon-play,.icon-download,.icon-share", function() {
    
    switch($(this).data("function")) 
	{
		case "play":
			var flag = (krAudio.Currentplay !== $(this).parents(".list-item").index());
        	if(isEmpty(krAudio.audioDom.src) || flag || search)
			{
        		krAudio.Currentplay = $(this).parents(".list-item").index();//当前播放的音乐序号
        		updPDF($(this).parents(".list-item"));
				listMenuStyleChange(krAudio.Currentplay);  //列表菜单的播放暂停按钮的变换
				krAudio.seturl();
				krAudio.play();
        	}
        	else 
			{
				palystop(); //否则，默认执行播放和暂停
			}
        	break;
			
        case "stop":
			palystop();  //默认执行播放和暂停
        	break;
			
        case "download":    // 下载
        	var currentObject = $(this).parents(".list-item");
			var wav = getLink(currentObject, 4);
            downloadThis(wav);
        	break;
			
        /*case "share":   // 分享
            loading("敬请期待...",5);
        	break;*/
    }
	
    return true;
	
});

//如果是移动端，那么滚动条操作对象就是不变的
if(isMobile) 
{  
    mainList = $("#main-list");
} 
else 
{
    // 滚动条初始化(只在非移动端启用滚动条控件)
    $("#main-list").mCustomScrollbar({
        theme:"minimal",
        advanced:{
            updateOnContentResize: true // 数据更新后自动刷新滚动条
        }
    });
    
    mainList = $("#main-list .mCSB_container");  
}


//初始化追加列表小菜单
function appendlistMenu()
{ 
	$(".list-item").each(function(index, el) {
	    var target = $(el).find(".music-name");
		var html = '<div class="list-menu">' +
					'<span class="list-icon icon-play" data-function="play" title="Play"></span>' +
					'<span class="list-icon icon-download" data-function="download" title="Download"></span>' +
					//'<span class="list-icon icon-share" data-function="share" title="Share"></span>' +
					'</div>';
	    target.append(html);
	});
	
}


//列表菜单的播放暂停按钮的变换 当前点击变换成暂停样式，其他都是播放样式
function listMenuStyleChange(Currindex)
{
	search = false;  //搜索标志结束
	var currobj = $("#main-list .list-item").eq(Currindex - 1); //获取当前播放对象
	//其他全部变成播放样式,用 not 过滤掉当前元素 
	$(".list-item").not(currobj).each(function(index, el) {
		$(el).find(".icon-play").replaceWith(playTag);
	});
    //自己变成暂停样式
	currobj.find(".icon-play").replaceWith(stopTag);
}


// 移动端列表项单击播放
function mobileClickPlay()
{
    if(isMobile) 
	{
    	search = false;  //搜索标志结束
        krAudio.Currentplay = $(this).index();//当前播放的音乐序号
		krAudio.seturl();
		krAudio.play();
		updPDF($(this));
    }
}

//点击右下方的下载按钮
$(".btn-download").click(function(){
	//如果未选择音乐，不能下载
	if(krAudio.Currentplay == 0)
	{
		loading("Please select a song", 1);
		return;	
	} 
	
	var obj = $("#main-list .list-item").eq(krAudio.Currentplay - 1); //当前播放对象
	//var wav = obj.data("mp3"); 
	var wav = getLink(obj, 4);
    downloadThis(wav);
});


$(".btn").click(function()
{
    switch($(this).data("action")) 
	{
        case "player":    // 播放器
            dataBox("player");
        	break;
			
        case "list": // 播放列表
            dataBox("list"); // 显示正在播放列表
        	break;
    }
});

// 移动端选择顶部栏要显示的信息
// 参数：要显示的信息（list、player）
function dataBox(choose) 
{
    $('.btn-box .active').removeClass('active');
    switch(choose) 
	{
        case "list":    // 显示播放列表
            if($(".btn[data-action='player']").css('display') !== 'none') 
			{
                $("#player").hide();
            } 
			else if ($("#player").css('display') == 'none') 
			{
                $("#player").fadeIn();
            }
            $("#main-list").fadeIn();
            $("#sheet").fadeOut();
            $(".serchsongs").show(); //搜索栏显示
            $(".btn[data-action='list']").addClass('active');
			break;
			
        case "player":  // 显示播放器
            $("#player").fadeIn();
            $("#sheet").fadeOut();
            $("#main-list").fadeOut();
            $(".serchsongs").hide();  //搜索栏隐藏
            $(".btn[data-action='player']").addClass('active');
			break;
    }
}

// 初始化背景根据图片虚化 
function initblurImgs()
{
	if(isMobile) 
	{  // 移动端采用另一种模糊方案
        $('#blur-img').html('<div class="blured-img" id="mobile-blur"></div><div class="blur-mask mobile-mask"></div>');
    } 
	else 
	{
        // 背景图片初始化
        $('#blur-img').backgroundBlur({
            //imageURL : imageURL, // URL to the image that will be used for blurring
            blurAmount : 50, // 模糊度
            imageClass : 'blured-img', // 背景区应用样式
            overlayClass : 'blur-mask', // 覆盖背景区class，可用于遮罩或额外的效果
            duration: 1000, // 图片淡出时间
            endOpacity : 1 // 图像最终的不透明度
        });
    }
    
    $('.blur-mask').fadeIn(1000);   // 遮罩层淡出
}


function isEmpty(val) 
{
	val = $.trim(val);
	if (val == null) return true;
	if (val == undefined || val == 'undefined') return true;
	if (val == "") return true;
	if (val.length == 0) return true;
	if (!/[^(^\s*)|(\s*$)]/.test(val)) return true;
		
	return false;
}

/* 默认首页是qq音乐热歌榜，处理返回的json数据用了一点es6的语法 */
function indexSong()
{
	loading("Loading...", 500);
	var count = 1;
	var jurl = domain + "/songs/songlist.json";
	
	$.ajaxSettings.async = true;
	$.getJSON(jurl, function (data)
	{
		var html = '<div class="listitems list-head">' +
					'<span class="music-album">Duration</span>' +
					'<span class="auth-name">Artist</span>' +
					'<span class="music-name">Song</span>' +
					'</div>';
					
		$.each(data, function(i, item)
		{
			//alert(item.title);
			var ctime = krAudio.format(item.duration);
			html += `<div class="list-item" data-index="${item.id}">
						<span class="list-num">${count}</span>
	                    <span class="list-mobile-menu"></span>
	                    <span class="music-album">${ctime}</span>
	                    <span class="auth-name">${item.author}</span>
	                    <span class="music-name">
						<span class="music-name-cult">${item.title}</span>
						</span>
	                </div>`;
					
			count++;
		})
		
		html += '<div class="list-item text-center" title="Loading complete." id="list-foot">Loading complete.</div>';
		mainList.html(html);
		listToTop();
		tzUtil.animates($("#tzloading"),"slideUp");
		krAudio.allItem = mainList.children('.list-item').length - 1;
		appendlistMenu();
		mainList.find(".list-item").click(mobileClickPlay);
		$(".list-mobile-menu").click(mobileListMenu);

	});
	
} 


/* 更据关键词搜索，处理返回的json数据用了一点es6的语法 接入qq音乐搜索 */
function searchSong(keywords)
{
	loading("Searching...", 500);
	$("#krserwords").blur();  //文本框失焦
	var count = 1; 
	var jurl = domain + "/songs/songlist.json";
	$.ajaxSettings.async = true; 
	$.getJSON(jurl, function (data)
	{
		
		var html = '<div class="listitems list-head">' +
					'<span class="music-album">Duration</span>' +
					'<span class="auth-name">Artist</span>' +
					'<span class="music-name">Song</span>' +
					'</div>';
		
		$.each(data,function(i, item)
		{
			var titl = item.title.toLowerCase(); 
			var auth = item.author.toLowerCase(); 
			if(titl.indexOf(keywords.toLowerCase()) != -1 || auth.indexOf(keywords.toLowerCase()) != -1)
			{
				var ctime = krAudio.format(item.duration);
				html += `<div class="list-item" data-index="${item.id}">
	                    <span class="list-num">${count}</span>
	                    <span class="list-mobile-menu"></span>
	                    <span class="music-album">${ctime}</span>
	                    <span class="auth-name">${item.author}</span>
						<span class="music-name">
						<span class="music-name-cult">${item.title}</span>
						</span>
	                </div>`;
					
				count++;
			}			
		})
		
		html += '<div class="list-item text-center" title="Loading complete." id="list-foot">Loading complete.</div>';
		mainList.html(html);
		listToTop();
		tzUtil.animates($("#tzloading"),"slideUp");
		krAudio.allItem = mainList.children('.list-item').length - 1;
		appendlistMenu();
		mainList.find(".list-item").click(mobileClickPlay);
		$(".list-mobile-menu").click(mobileListMenu);
		
		search = true;
	});
}

// 播放列表滚动到顶部
function listToTop() 
{
	if(isMobile) 
	{
		$("#main-list").animate({scrollTop: 0}, 200);
	}
    else 
	{
		$("#main-list").mCustomScrollbar("scrollTo", 0, "top");
	}
}


/* 点击搜索按钮或者在文本框回车搜索 */
$(".searchDivIcon").click(function() {
	var keywords = $("#krserwords").val();
	if(isEmpty(keywords))
	{
		indexSong();
		search = true;
	}
	else
	{
		searchSong(keywords);
	}
});

$("#krserwords").keyup(function(event){
	var keywords = $("#krserwords").val();
	if(event.keyCode == 13)  //Enter
	{
		if(isEmpty(keywords)) 
		{
			indexSong();
			search = true;
		}
		else
		{
			searchSong(keywords);
		}
	}
});

//当前播放歌曲的详细信息的按钮点击
$("#music-info").click(function(){
	
	if(isEmpty(krAudio.audioDom.src))
	{
		loading("Please select a song", 1);
	}
	else
	{
		musicInfo(krAudio.Currentplay - 1);		
	}
	
});

//移动端的每首歌点击详细信息的按钮
function mobileListMenu()
{
	var index = $(this).parents(".list-item").index();
	musicInfo(index - 1); 
	return false;
};

function downloadThis(url)
{
	var eledow = dom("downabo");
	eledow.setAttribute("href", url);
	eledow.setAttribute("target", "_blank");
	eledow.click(); 
}

// 展现系统列表中任意首歌的歌曲信息（或者当前歌曲）
function musicInfo(index) 
{
    var currentObject = $("#main-list .list-item").eq(index);
	var title = currentObject.find(".music-name-cult").text();
	var author = currentObject.find(".auth-name").text();
	var id = currentObject.data("index");
	
	var pdf = getURL(id, title, author, 0);
    var nb = getURL(id, title, author, 1);
	var mid = getURL(id, title, author, 2);
	var wav = getURL(id, title, author, 3);
	var mp3 = getURL(id, title, author, 4);
	
    var tempStr = `<span class="info-title">Song: </span> ${title}
				    <br><span class="info-title">Artist: </span> ${author}
				    <br><span class="info-title">Duration: </span> ${currentObject.find(".music-album").text()}
					`; 
	
    tempStr += `<br><br>
    		<span class="info-title">Download</span><br>
			<span class="info-title">Stave: </span>
			<span class="info-btn" onclick="downloadThis('${pdf}')"> [.pdf] </span><br>
			<span class="info-title">Code: </span>
			<span class="info-btn" onclick="downloadThis('${nb}')"> [.nb] </span><br>
			<span class="info-title">Audio: </span>
			<span class="info-btn" onclick="downloadThis('${mid}')"> [.mid] </span>    		
			<span class="info-btn" onclick="downloadThis('${mp3}')"> [.mp3] </span>
			`;
    
    layer.open({
        type: 0,
        closeBtn: 0,
        shadeClose: true,
        title: false, //不显示标题
        btn: false,
        skin :'mylayerClass',
        content: tempStr
    });
    /* 实现点击复制歌曲链接、歌词链接 */
    zclips("#info-songs");
	zclips("#info-lrcs");
}

/* 实现点击复制歌曲链接、歌词链接 */
function zclips(obj)
{
	var clipboard = new ClipboardJS(obj, {
        text: function() {
            return $(obj).data("text");
        }
    });

    clipboard.on('success', function(e) {
        loading("Copying success",3);
    });

    clipboard.on('error', function(e) {
        loading("copying failed",3);
    });
}


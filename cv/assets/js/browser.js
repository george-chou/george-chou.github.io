define(['jquery', 'device'], function($, device) {

function UpperFirstLetter(str)   
{   
   return str.replace(/\b\w+\b/g, function(word) { return word.substring(0, 1).toUpperCase() + word.substring(1); });   
}

function getParenthesesStr(text) 
{
	var result = ''; 
    if ($.isEmptyObject(text)) return result;
    var options = text.match(/\((.+?)\)/g);
	
	if (!$.isEmptyObject(options)) 
	{
        var option = options[0];
        if (!$.isEmptyObject(option)) 
		{
			result = option.substring(1, option.length - 1);
		}
    }
    return result;
}

function ParseWinVer(ver)
{ 
	switch(Math.floor(10.0 * ver))
	{
		case 50	 : return "2000";
		case 51	 : return "XP";
		case 52	 : return "64-Bit Edition/Server 2003/Server 2003 R2";
		case 60	 : return "Vista/Server 2008";
		case 61	 : return "7/Server 2008 R2";
		case 62	 : return "8/Server 2012";
		case 63	 : return "8.1/Server 2012 R2";
		case 100 : return "10/Server 2016";
		default	 : return "Unknown";
	}
}

function ParseOS(t)
{
	switch(t.toLowerCase())
	{
		case "iphone/ios"										 : return 0;
		case "ipad/ios"											 : return 1;
		case "ipod/ios"											 : return 2;
		case "android"											 : return 3; 
		case "windows phone"									 : return 5;
		case "windows 10/server 2016"							 : return 6;
		case "windows 8.1/server 2012 r2"						 : return 7;
		case "windows 8/server 2012"							 : return 8;
		case "windows 7/server 2008 r2"							 : return 9;
		case "windows vista/server 2008"						 : return 10;
		case "windows 64-Bit edition/server 2003/server 2003 r2" : return 11;
		case "windows xp"										 : return 12;
		case "windows 2000"										 : return 13;
		case "macos"											 : return 14;
		case "linux"											 : return 15;
		default													 : return -1;
	}
}

function getOS()
{
	var agent = navigator.userAgent.toLowerCase(); 
	
	var os = {
		type : device.os.toLowerCase(),
		no 	 : -1,
		ver  : -1
	};
	
	if(os.type !== "unknown")
	{				
		if(device.ios())
		{
			if(device.iphone())
			{ 
				os.type = "iPhone/IOS";
				os.no = ParseOS(os.type);
				os.ver = agent.match(/os ([\d_]+)/)[1].replace(/_/g, '.');
				return os;
			}
			
			if(device.ipod()) 
			{
				os.type = "iPod/IOS";
				os.no = ParseOS(os.type);
				os.ver = agent.match(/os ([\d_]+)/)[1].replace(/_/g, '.');
				return os;
			}
			
			var sys = getParenthesesStr(agent).toLowerCase();
			if(sys.indexOf("macintosh") > -1)
			{				
				os.type = "iPad/IOS";
				os.no = ParseOS(os.type);
				os.ver = sys.match(/intel mac os x ([\d_]+)/)[1].replace(/_/g, '.');
				return os;
			}
			
			if(device.ipad())
			{
				 os.type = "iPad/IOS";
				 os.no = ParseOS(os.type);
				 os.ver = agent.match(/os ([\d_]+)/)[1].replace(/_/g, '.');
				 return os;
			}
		}
		else if(device.windows())
		{
			if(device.windowsPhone())
			{
				os.type = "Windows Phone";
				os.no = ParseOS(os.type);
				os.ver = agent.match(/windows phone ([\d.]+)/)[1]; 				
			}
			else
			{
				os.type = "Windows";
				os.ver = agent.match(/windows nt ([\d.]+)/)[1];
				os.no = ParseOS(os.type + " " + ParseWinVer(os.ver));
			}			
			
			return os;
		}
		else if(device.android())
		{
			os.type = "Android";
			os.no = ParseOS(os.type);
			os.ver = agent.match(/android ([\d.]+)/)[1]; 
			return os;
		}
		
	}
	else
	{
		var sys = getParenthesesStr(agent).toLowerCase();
		
		if(sys.indexOf("macintosh") > -1)
		{
			os.type = "MacOS";
			os.no = ParseOS(os.type);
			os.ver = sys.match(/intel mac os x ([\d_]+)/)[1].replace(/_/g, '.');
			return os;
		} 
		
		if(sys.indexOf("linux") > -1) 
		{
			os.type = "Linux";
			os.no = ParseOS(os.type);
			return os;
		} 
	}
	
	os.no = ParseOS(os.type);
	os.type = UpperFirstLetter(os.type);
	return os;
}

function getBrowser()
{
	var agent = navigator.userAgent.toLowerCase();
	
	var browser = {
		type : "Unknown",
		no 	 : -1,
		ver  : -1
	};
	
	var isOpera = (agent.indexOf("opr") > -1);
	if(isOpera)
	{
		browser.type = "Opera";
		browser.no = 0;
		browser.ver = agent.match(/opr\/([\d.]+)/)[1];		
		return browser;
	}
	
	var isFF = (agent.indexOf("firefox") > -1);
	var isFFIOS = (agent.indexOf("fxios") > -1);
	if(isFF || isFFIOS)
	{
		browser.type = "Firefox";
		browser.no = 1;
		browser.ver = isFF ? agent.match(/firefox\/([\d.]+)/)[1] : agent.match(/fxios\/([\d.]+)/)[1];	
		return browser;
	}
	
	var isWechat = (agent.indexOf("micromessenger") > -1);
	if(isWechat)
	{
		browser.type = "Wechat";
		browser.no = 4;
		browser.ver = agent.match(/micromessenger\/([\d.]+)/)[1];
		return browser;
	}
	
	var isEdge = (agent.indexOf("edge") > -1);
	var isEdg = (agent.indexOf("edg") > -1);
	if(isEdge || isEdg)
	{
		browser.type = "Edge";
		browser.no = 2;
		browser.ver = isEdge ? agent.match(/edge\/([\d.]+)/)[1] : agent.match(/edg\/([\d.]+)/)[1];
		return browser;
	}
	
	var isAdb = (agent.indexOf("safari") > -1 && agent.indexOf("version") > agent.indexOf("safari") && agent.indexOf("chrome") == -1);
	if(isAdb)
	{
		browser.type = "Adblock";
		browser.no = 15;
		browser.ver = agent.match(/version\/([\d.]+)/)[1];
		return browser;
	}
			
	var isChrome = (agent.indexOf("chrome") > -1);
	var isCrIOS = (agent.indexOf("crios") > -1);
	if(isChrome || isCrIOS)
	{
		browser.type = "Chrome";
		browser.no = 16;
		browser.ver = isChrome ? agent.match(/chrome\/([\d.]+)/)[1] : agent.match(/crios\/([\d.]+)/)[1];
		return browser;
	}
	
	var isSafari = (agent.indexOf("safari") > -1);
	if(isSafari)
	{
		browser.type = "Safari";
		browser.no = 17;
		browser.ver = agent.match(/safari\/([\d.]+)/)[1];
		return browser;
	}
	
	var isIE = (agent.indexOf("msie") > -1);
	var isIE11 = (agent.indexOf("trident") > -1);
	if(isIE || isIE11)
	{
		browser.type = "IE";
		browser.no = 18;
		browser.ver = isIE ? agent.match(/msie ([\d.]+)/)[1] : 11;
		return browser;
	}
	
	return browser;
}

function toBroICO(b)
{
	switch(parseInt(b))
	{
		case 0	: return "opera";
		case 1	: return "firefox";
		case 2	: return "edge"; 
		case 4	: return "wechat";
		case 16 : return "chrome";
		case 17 : return "safari";
		case 18 : return "ie"; 
		default : return "others";
	}
}

function toBroName(b)
{
	switch(parseInt(b))
	{
		case 0	: return isEn ? "Opera" : "欧朋";
		case 1	: return isEn ? "Firefox" : "火狐";
		case 2	: return "Edge"; 
		case 4	: return isEn ? "WeChat" : "微信";
		case 16 : return isEn ? "Chrome" : "谷歌";
		case 17 : return "Safari";
		case 18 : return "IE";  
		default : return isEn ? "Others" : "其它";
	}
}

function toSysName(os)
{
	switch(parseInt(os))
	{
		case 0	: return "iPhone";
		case 1	: return "iPad";
		case 2	: return "iPod";
		case 3	: return isEn ? "Android" : "安卓";
		case 5	: return "Win Phone";
		case 6	: return "Win10";
		case 7	: return "Win8.1";
		case 8	: return "Win8";
		case 9	: return "Win7";
		case 10 : return "Vista";
		case 11 : return "Win64";
		case 12 : return "WinXP";
		case 13 : return "Win2000";
		case 14 : return "MacOSX";
		case 15 : return "Linux"; 
		default : return isEn ? "Unknown" : "未知";
	}
}

function toSysICO(os)
{
	switch(parseInt(os))
	{
		case 0	: return "ios";
		case 1	: return "ios";
		case 2	: return "ios";
		case 3	: return "android"; 
		case 5	: return "win10";
		case 6	: return "win10";
		case 7	: return "win10";
		case 8	: return "win10";
		case 9	: return "win7";
		case 10 : return "win7";
		case 11 : return "win32";
		case 12 : return "win32";
		case 13 : return "win32";
		case 14 : return "macos";
		case 15 : return "linux"; 
		default : return "unknown";
	}
}

var Browser = {
	brow	  : getBrowser(),
	osys	  : getOS(),
	toBroICO  : toBroICO,
	toBroName : toBroName,
	toSysName : toSysName,
	toSysICO  : toSysICO
};

return Browser;

});
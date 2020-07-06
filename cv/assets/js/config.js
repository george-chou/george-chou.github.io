var domain = "https://georgechou21.asuscomm.com:4443/mybackend";
var isEn = !(document.location.href.indexOf("-cn.html") > -1);

requirejs.config({
	baseUrl : 'assets/js',
	map : {
        '*' : {
            'css' : 'https://cdn.bootcdn.net/ajax/libs/require-css/0.1.10/css.min.js'
        }
    },
	paths : {
		'jquery'   : 'https://cdn.bootcdn.net/ajax/libs/jquery/1.11.2/jquery.min',
		'device'   : 'https://unpkg.com/current-device/umd/current-device.min',		
		'mustache' : 'https://cdn.bootcdn.net/ajax/libs/mustache.js/4.0.1/mustache.min',
		'github'   : (isEn ? 'github-activity-0.1.1.min' : 'github-activity-0.1.1-cn.min'),	
		'browser'  : 'browser',
		'core'	   : 'core',
		'maps'	   : 'maps',
		'worldlow' : 'worldLow',
		'animated' : 'animated'
	},
	shim : {
		'browser' : {
			deps : [
				'css!https://cdn.bootcdn.net/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css',
				'css!../css/devices.css', 
				'css!../css/media.css',
				'device'
			],
			exports : 'Browser'
		},
		'github' : {
			deps : [
				'css!https://cdn.bootcdn.net/ajax/libs/octicons/6.0.1/octicons.min.css',
				'css!../css/github-activity-0.1.1.min.css',
				'mustache'
			],
			exports : 'GitHubActivity'
		},
		'core' : {
			deps	: ['jquery'],
			exports : 'am4core'
		},
		'maps' : {
			deps	: ['core'],
			exports : 'am4maps'
		},
		'worldlow' : {
			deps	: ['core'],
			exports : 'am4geodata_worldLow'
		},
		'animated' : {
			deps	: ['core'],
			exports : 'am4themes_animated'
		}		
	},
	waitSeconds : 0
});
/*
requirejs(['github'], function(GitHubActivity) {
	
	GitHubActivity.feed({ username: "george-chou", selector: "#ghfeed" });
	
});*/
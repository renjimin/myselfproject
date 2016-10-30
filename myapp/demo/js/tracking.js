var cbgtracking = cbgtracking || {};
cbgtracking.productionDomain = 'consumer.huawei.com';
cbgtracking.defaultEventCategory = 'consumer-cn';
$(document).multitrack({
  debugMode: location.href.indexOf(cbgtracking.productionDomain) > -1 ? false : true,
  pageviewPrefix: '',
  trackers: [
    {
      name: 'gau',
      options: {
        init: function () {
          ga('create', 'UA-7728030-4', {
            cookieDomain: 'auto'
          });
        }
      }
    },
    {
      name: 'ha',
      options: {
        siteId: 'consumer-cn',
        domain: cbgtracking.productionDomain,
        autoSendPV: false
      }
    }
  ]
});
$.multitrack.trackPageview();

// Auto global event tracking
$('*[data-auto-tracking] a,.cbg-live-video').click(function (e) {
  try {
    if ($(this).data('t-cat')) {
      return; // Skip links with custom data-t-* attributes
    }
    var action = $(this).parents('*[data-t-act]').data('t-act') || 'click';
    var label = $.trim($(this).text().replace(/\n/g, '').replace(/ +/g, ''));
    $.multitrack.trackEvent(cbgtracking.defaultEventCategory, action, label);
    // Delay link?
    var href = $(this).attr('href');
    var ignoreLink = ($(this).data('t-ignore-link') == true || !href || href.indexOf('#') === 0) ? true : false;
    if (!ignoreLink) {
      switch ($(this).attr('target')) {
        case undefined:
        case '':
        case '_self':
        case '_top':
        case '_parent':
          try {
            e.preventDefault();
            $.multitrack.delayLink(href);
          }
          catch (e) { window.location.href = href; }
      }
    }
  }
  catch (e) { }
});

var user_id = "0"
var strCookie = document.cookie;                     
var arrCookie = strCookie.split("; ");    
for(var i=0; i<arrCookie.length; i++){
	var arr=arrCookie[i].split("=");
	var _account = "UserAccount";
	if(_account == arr[0]){
			user_id = decodeURIComponent(arr[1]);
	 }
}
window["_BFD"] = window["_BFD"] || {};
_BFD.client_id = "serviceWebsite";
_BFD.BFD_USER = {   
	 "user_id" : user_id
};
_BFD.script = document.createElement("script");
_BFD.script.type = "text/javascript";
_BFD.script.async = true;
_BFD.script.charset = "utf-8";
_BFD.script.src = 'http://dmp-collector.huawei.com/api/2.0/huawei_con.js';  
document.getElementsByTagName("head")[0].appendChild(_BFD.script);


/*bi work*/
/*page follow*/
function wpjam_get_query_string(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);console.log("r:"+r)
	if (r!=null){
	   return unescape(r[2]);
	}else{
	   return '';
	}
}
var _trackerUrl = "http://datacollect.vmall.com:28080/webv1";
var _jsUrl = "http://res.vmall.com/bi/hianalytics.js";
var _paq = _paq || [];
var localval = "";
var query_sid = wpjam_get_query_string('sid');
_paq.push(['setTrackerUrl', _trackerUrl]);
_paq.push(['setSiteId', 'consumer.huawei.com']);
var _doc = document.getElementsByTagName('head')[0];
var js = document.createElement('script');
js.setAttribute('type', 'text/javascript');
js.setAttribute('src', _jsUrl);
_doc.appendChild(js);
_paq.push(['setCustomVariable',1,'sid',query_sid,'page']);
_paq.push(['trackPageView']);
/*set tag data-pro-id val*/
$('*[data-p-val]').each(function(){
   var _v = $(this).attr("data-p-val");
   var _d = $(this).parents("[data-vals]").attr("data-vals");
   $(this).attr("data-pro-id",jsonobj[_d][_v]);
})

function getcitys(prev_name){
   $(".cbg-selectbox").each(function(i){
	   if(i==0){
		  localval+=prev_name+$(this).find("option:selected").text()+"-";
	   }else if(i==1){
		  localval+=$(this).find("option:selected").text()+"-";
	   }else if(i==2){
		  localval+=$(this).find("option:selected").text()+"-";
	   }
	})
	localval = localval.substring(0,localval.lastIndexOf("-"));
   return localval;
}
$(".actions .cbg-btn").click(function(){
    localval = "";
    var query_sid = wpjam_get_query_string('sid');
	var prev_name = $(this).hasClass("y-act-1")?"Home-find Huawei-retail-":"Home-find Huawei-service-";
    //console.log("city:"+getcitys(prev_name));
	_paq.push(['trackLink',getcitys(prev_name), 'link', query_sid]);
})
function trim(str){   
	return !str?"":str.replace(/(^\s*)|(\s*$)/g, "");
}
/*page buttons follow*/
function setTimework(){
    $('*[data-pro-id]').click(function(){
	//console.log("aaa:"+$(this).parents("[data-pro-id]").attr("data-pro-id"));
	var query_sid = wpjam_get_query_string('sid');
	var btnId = $(this).attr("data-pro-id");
	//console.log("data-pro-id:"+btnId);
	_paq.push(['trackLink',btnId, 'link', query_sid]);
})
}
setTimeout("setTimework()",1000)


  



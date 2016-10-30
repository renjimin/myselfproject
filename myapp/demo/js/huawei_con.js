window["_BFD"] = window["_BFD"] || {};
_BFD.addEvent=function(a,b,c){if(a.addEventListener){a.addEventListener(b,c,false)}else{if(a.attachEvent){a.attachEvent("on"+b,function(){c.call(a)})}else{a["on"+b]=c}}};_BFD.removeEvent=function(a,b,c){if(a.removeEventListener){a.removeEventListener(b,c,false)}else{if(a.detachEvent){a.detachEvent("on"+b,function(){c.call(a)})}else{a["on"+b]=null}}};_BFD.createElement=function(d,a){var c=document.createElement(d);if(a){for(var b in a){if(a.hasOwnProperty(b)){if(b==="class"||b==="className"){c.className=a[b]}else{if(b==="style"){c.style.cssText=a[b]}else{c.setAttribute(b,a[b])}}}}}return c};_BFD.loadScript=function(a,b){setTimeout(function(){var c=_BFD.createElement("script",{src:a,type:"text/javascript"});if(c.readyState){_BFD.addEvent(c,"readystatechange",function(){if(c.readyState==="loaded"||c.readyState==="complete"){if(b){b()}_BFD.removeEvent(c,"readystatechange",arguments.callee)}})}else{_BFD.addEvent(c,"load",function(){if(b){b()}_BFD.removeEvent(c,"load",arguments.callee)})}document.getElementsByTagName("head")[0].appendChild(c)},0)};_BFD.getByAttribute=function(g,h,a){var b=[],a=(a)?a:document,e=a.getElementsByTagName("*"),d=new RegExp("\\b"+h+"\\b","i");for(var c=0;c<e.length;c++){var f=e[c];if(g==="className"||g==="class"){if(d.test(f.className)){b.push(f)}}else{if(f.getAttribute(g)===h){b.push(f)}}}return b};_BFD.getByClass=function(b,a){return _BFD.getByAttribute("className",b,a)};_BFD.getById=function(a){if(typeof a==="string"&&!!a){return document.getElementById(a)}};_BFD.loadCss=function(a){var b=_BFD.createElement("link",{href:a,rel:"stylesheet",type:"text/css"});document.getElementsByTagName("head")[0].appendChild(b)};_BFD.insertAfter=function(d,c){var b=c.parentNode;if(b.lastChild==c){b.appendChild(d)}else{var a=c.nextElementSibling||c.nextSibling;b.insertBefore(d,a)}};

_BFD.loadScript('http://dmp-collector.huawei.com/api/2.0/bcore.min.js',function(){
	//全局变量
	var _core = new $Core(function(){});
	var Tools = $Core.tools.Tools;
	_core.options.cid = _BFD.client_id;
	_core.options.uid = '0';
	_core.options.hwuid = '0';
	var flag = 1;
	if(_BFD.BFD_USER){
		_core.options.hwuid = _BFD.BFD_USER.user_id;
	}else{
		flag = 2 ;
	}
	if(typeof(_core.options.hwuid) == 'undefined' || _core.options.hwuid == '' || _core.options.hwuid == '0' || _core.options.hwuid == null || flag == 2) {
		_core.options.hwuid = '0';
	}
	var ExecPageType = (function(){
		function ExecPageType(){
			//判断_BFD.BFD_INFO.page_type页面类型
			if(!_BFD.BFD_INFO){
                this.dft(_core);
            }else{
                var method = this[_BFD.BFD_INFO.page_type];
                if(method && typeof method === "function"){
                    method.call(this,_core);
                }else{
                    this.dft(_core);
                }
            }
		}
		ExecPageType.prototype = {
			
			detail:function(_core){
			﻿	_core.options.p_t = "dt";
			﻿
				var title = _BFD.BFD_INFO.title;
				var pic = _BFD.BFD_INFO.pic;
				var id = _BFD.BFD_INFO.id;
				var url = _BFD.BFD_INFO.url;
				var category = _BFD.BFD_INFO.category;
			﻿	
				_core.send(new BCore.inputs.Visit(id));
				var catid = [];
				if (category && category instanceof Array) {
					for (var i=0; i< category.length; i++) {
						catid.push(category[i][0]);
					}
				}
					var add_item = new $Core.inputs.AddItem(id);
					add_item.title = title;
					add_item.pic = pic;
					add_item.url = url;
					add_item.cat = catid;
					_core.send(add_item);
				if(catid.length > 0){
					var cat = catid[catid.length-1];
					_core.send(new $Core.inputs.VisitCat(catid.join('$')));
					var add_cat = new $Core.inputs.AddCat(cat);
					if( category.length > 0){
						add_cat.url = category[category.length-1][1];
						var cat_tree = category.concat();
						cat_tree.pop();
						add_cat.ptree = new $Core.inputs.JObject().toString(cat_tree);
						_core.send(add_cat);
					}
				}
				var page_view = new $Core.inputs.PageView();
                page_view.p_p = "";
				page_view.gid_channel="hw";
                _core.send(page_view);
				
				var mapping = new $Core.inputs.Input("Mapping");
				mapping.bfd_nid = "dmp_huawei";
				mapping.callback='1';
				mapping.channel="huawei";
				_core.send(mapping);
				
				_bfd_Download = function (url,title,typ){
					var download = new $Core.inputs.UserAction("Download");
					download.url = url;
					download.title = title;
					download.typ = typ;
					_core.send(download);
				}
			},
			//搜索页
			search:function(_core){
			﻿
				_core.options.p_t = "sr";
			﻿
				var search_word = _BFD.BFD_INFO.search_word;
				var search_result = _BFD.BFD_INFO.search_result;
			﻿
			﻿	var page_view = new $Core.inputs.PageView();
				var search = new $Core.inputs.UserAction("Search");
				search.qstr = search_word;
				_core.send(search);
				page_view.gid_channel="hw";
				_core.send(page_view);
				
				var mapping = new $Core.inputs.Input("Mapping");
				mapping.bfd_nid = "dmp_huawei";
				mapping.callback='1';
				mapping.channel="huawei";
				_core.send(mapping);
				

				_bfd_Download = function (url,title,typ){
					var download = new $Core.inputs.UserAction("Download");
					download.url = url;
					download.title = title;
					download.typ = typ;
					_core.send(download);
				}
			},
			//默认页
            dft:function(_core) {
                _core.options.p_t = "dft";
                var page_view = new $Core.inputs.PageView();
                page_view.p_p = "";
				page_view.gid_channel="hw";
                _core.send(page_view);
				
				var mapping = new $Core.inputs.Input("Mapping");
				mapping.bfd_nid = "dmp_huawei";
				mapping.callback='1';
				mapping.channel="huawei";
				_core.send(mapping);
				
				_bfd_Download = function (url,title,typ){
					var download = new $Core.inputs.UserAction("Download");
					download.url = url;
					download.title = title;
					download.typ = typ;
					_core.send(download);
				}
            }
		}
		return ExecPageType;
	})();
	new ExecPageType();
});
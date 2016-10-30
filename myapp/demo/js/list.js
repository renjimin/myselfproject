$(function () {
  // Top slider
  $(window).on('resize', function () {
    $('.list-slides').css('height', (810 * $(document).width() / 1920) | 0)
  });
  $('.list-slides')
    .css('height', (810 * $(document).width() / 1920) | 0)
    .flexslider({
      animation: 'slide',
      animationLoop: true,
      controlNav: true,
      directionNav: true,
      slideshow: true,
      pauseOnHover: true,
      manualControls: '.list-slide-nav li',
      namespace: 'list-slide-'
    });

  // Adjust list item margin
  $(window).on('resize', function () {
		var width = $('.list-items').width(),
		perWidth = 320,
		count = width / perWidth,
		perLine = Math.min(count | 0, 4),
		margin = (((width / perLine - perWidth) | 0) / 2) | 0;
		$('.list-item').css({'margin-left': margin,'margin-right': margin});
		if(typeof(istablet)!='undefined' && istablet == 1){
			var tblist = $(".list-item")
			var d = margin*0.9
			for(var i = 0; i<tblist.length; i++){
				if(i%3==0)	tblist.eq(i).css({'margin-left': margin+d,'margin-right': margin-d})
				if(i%3==2)	tblist.eq(i).css({'margin-left': margin-d,'margin-right': margin+d})
			}
		}
	   
  });

  var cls_filter = 'list-filter-val-selected',
    cls_compare = 'list-item-compare-selected',
    buyTimeout,
    tooltip;
  function toggleNoResultTooltip(show) {
    //var tooltip = $('#cbg-main .list-filter-noresult-tooltip');
    //show ? tooltip.fadeIn() : tooltip.fadeOut();
  }
  function wpjam_get_query_string(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);console.log("r:"+r)
	if (r!=null){
	   return unescape(r[2]);
	}else{
	   return '';
	}
}
var isCor = 0;
  $(document)
    .on('click', '.list-filter-toggle', function (e) {
      $('.list-filter-menus').slideToggle();
      toggleNoResultTooltip(false);
      e.stopPropagation();
    })
    .on('click', '.list-filter-val', function (e) {
      $(this).toggleClass(cls_filter);
    })
    .on('click', '.list-item-compare', function (e) {
      var $compareText = $(this).find('.compare-text');
      if ($(this).hasClass(cls_compare)) {
        $(this).removeClass(cls_compare);
        $compareText.text($compareText.data('compare-text'));
        $(document).trigger('compare', [false, e.target]);
      } else {
        if ($('.list-compare-body').find('.list-compare-item').length >= 3) {
          if (tooltip) {
            tooltip.hide();
          }
          tooltip = $(this).siblings('.list-item-compare-tooltip').show();
          e.stopPropagation();
          return;
        }
        $(this).addClass(cls_compare);
        $compareText.attr('data-compare-text', $.trim($(this).text()));
        $compareText.text($compareText.data('cancel-text'));
        $(document).trigger('compare', [true, e.target]);
      }
    })
	.on('click', '[data-pros-id]', function (e) {
	    isCor = 1;
		if(isCor==1){
			var query_sid = wpjam_get_query_string('sid');
			var btnId = $(this).attr("data-pros-id");
			console.log("data-pro-id:"+btnId);
			//alert("erwq")
			_paq.push(['trackLink',btnId, 'link', query_sid]);
		}
    })
    .on('click', function () {
      toggleNoResultTooltip(false);
      if (tooltip) {
        tooltip.hide();
      }
    })
    .on('click', '.list-compare-cancel', function (e) {
      var dDocName = $(this).closest('.list-compare-item').remove().attr("dDocName");
      $('.list-items').find('[ddocname="' + dDocName + '"] .list-item-compare').click();
      var compare = $('.list-compare-body').children('.list-compare-item').length;
      $('.list-compare-btn')[compare > 1 ? "show" : "hide"]();
      $('.list-compare')[compare ? 'show' : 'hide']();
      scroll();
      e.preventDefault();
    })
    .on('compare', function (e, add, target) {
      target = $(target).closest('.list-item');
      var dDocName = target.attr("dDocName");
      if (!add) {
        $('.list-compare').find('[dDocName="' + dDocName + '"]').remove();
      } else {
        //$('<div class="list-compare-item" data-class="' + target.data('class') + '"><a class="list-compare-cancel" href="#">&nbsp;</a>' +
        $('<div class="list-compare-item" dDocName="' + dDocName + '"><a class="list-compare-cancel" href="#">&nbsp;</a>' +
              '<img src="' + target.find('.list-item-image').prop('src') + '"/>' +
              '<div class="list-compare-name"><div class="list-compare-mask"></div><div class="list-compare-pname">' + target.find('.list-item-title').html() +
              '</div></div>' + '</div>'
            ).attr("dDocName", dDocName).appendTo('.list-compare-body');
      }
      var compare = $('.list-compare-body').children('.list-compare-item').length;

      if (compare > 1) {
        $('.list-compare-btn').show();
      } else {
        $('.list-compare-btn').hide();
      }
      $('.list-compare')[compare ? 'show' : 'hide']();
      scroll();
    })
   .on('mouseenter', '.list-item-images', function (e) {
     $(this).find('.list-item-image').stop(true, true).css('opacity', 1).animate({
       opacity: 0
     }, 1000)
       .parent().siblings().find(".list-item-bg").stop(true, true).css('opacity', 0).animate({
         opacity: 1
       }, 1000);
     e.stopPropagation();
   })
    .on('mouseleave', '.list-item-images', function (e) {
      $(this).find('.list-item-image').stop(true, false).animate({
        opacity: 1
      }, 1000)
        .parent().siblings().find(".list-item-bg").stop(true, false).animate({
          opacity: 0
        }, 1000);
      e.stopPropagation();
    })
    .on('mouseenter', '.list-item-buy', function (e) {
      clearTimeout(buyTimeout);
      var $buyIcon = $(this);
      buyTimeout = setTimeout(function () {
        $(e.target).closest('.list-item-footer').find('.list-item-place').show();
        $buyIcon.addClass('cbg-icon-cart-large active');
      }, 200);
      e.stopPropagation();
    })
    .on('mouseleave', '.list-item-footer', function (e) {
      clearTimeout(buyTimeout);
      $(this).find('.list-item-place').hide();
      $(this).find('.list-item-buy').removeClass('cbg-icon-cart-large active');
      e.stopPropagation();
    });

  var buyItem;
  $(document).on('mouseenter', '.list-slide-buy-toggle', function (e) {
    if (buyItem) {
      buyItem.stop(true, false).fadeOut();
    }
    buyItem = $(e.target).siblings('.list-slide-buy-item').stop(true, false).fadeIn();
    e.stopPropagation();
  })
  .on('mouseleave', '.list-slide-btn', function (e) {
    if (buyItem) {
      buyItem.fadeOut();
    }
  });

  // Selected items panel
  var scrollTimeout,
	$list = $('.list-items'),
	$compare = $('.list-compare'),
	listOffset,
	listHeight,
	breadcumbHeight = $('.list-main .cbg-nav').height(),
	mainNavHeight = $('#cbg-main-nav-wrapper').height();
  $(window).on('scroll', function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(scroll, 300);
  }).on('resize', function () {
    listOffset = $list.offset();
    listHeight = $list.height();
  }).trigger('resize');

  function scroll() {
    var t = 0;
    var st = (document.body.scrollTop || document.documentElement.scrollTop);
    var oft = $list.offset().top;
    var t = Math.max(st - oft + breadcumbHeight + mainNavHeight, 0);
    if (t + $compare.height() > listHeight) {
      t = listHeight - $compare.height();
    }
    $compare.stop(true, true).animate({ 'margin-top': t }, 500);
  }
});

// Filters
(function (options) {
  var xitem = $(".list-items .list-item:eq(0)");
  var xtips = $(".list-filter-noresult-tooltip");
  var $selectedVal = null;
  var dataStore = null;
  var config = $.extend({
    scope: "mobile_phones",
    filterItems: ["size", "feature", "camera", "type"],
    storeUrl: "http://consumer.huawei.com/cn/support/where-to-buy/store-location/index.htm",
    compareURL: "http://consumer.huawei.com/cn/mobile-phones/compare/index.htm?"
  }, options);
  if (config.dataFileUrl) {
    $.ajax({
      url: config.dataFileUrl + "?r=" + Math.random(),
      type: "GET",
      dataType: "text",
      timeout: 4000,
      beforeSend: function () { },
      error: function (e, m) { console.log(e); },
      success: function (data) {
        eval("dataStore = " + data);
        fillData(dataStore);
      }
    });
  }

  function getFilterParams() {
    var d = {};
    $(".list-fiter-line").each(function (idx) {
      var s = "";
      var its = $(this).find(".list-filter-val");
      its.filter(".list-filter-val-selected").each(function () { s += its.index($(this)) + "|"; });
      for (var v in config.filterItems) {
        if (idx == v) {
          d[config.filterItems[v]] = s.replace(/[|]$/, "");
          break;
        }
      }
    });
    var _act = "";
    $(".list-filter-val-selected").each(function (index) {
      if (index == 0) {
        _act += $(this).text();
      } else {
        _act += "-" + $(this).text();
      }
    });
    //TJW
    var _value = '{"con_key0":"mobile_phones","con_key1":"search","con_key2":"' + _act + '"}';
    try { trackEvent('mobile_phones', _act, 'search', _value); } catch (e) { }
    return d;
  }
  function doFilter() {
    var data = search(getFilterParams());
    fillData(data);
    restoreCompareItems();
    // No result tooltip
    if (data.length > 0) {
      xtips.fadeOut('fast');
    }
    else {
      xtips.css('top', ($selectedVal.position().top - 5) + 'px');
      xtips.fadeIn('fast');
    }
  }
  function restoreCompareItems() {
    var items = [];
    $('.list-compare-body .list-compare-item').each(function () {
      items.push($(this).attr('ddocname'));
    });
    // Clear items
    $('.list-compare-body').empty();
    // Trigger compare events in new items list
    for (var i = 0; i < items.length; i++) {
      $('.list-items').find('div[ddocname=' + items[i] + ']').find('.list-item-compare').click();
    }
    if ($('.list-compare-body').children().length == 0) {
      $('.list-compare').hide();
    }
  }
  function searchByField(d, n, v) {
    var data = new Array();
    for (var i = 0; i < d.length; i++) {
      var r = d[i];
      if ((r[n] + "").match(v)) { data.push(r); }
    }
    return data;
  }
  function search(o) {
    var data = dataStore;
    for (var i = 0; i < config.filterItems.length; i++) {
      var n = config.filterItems[i];
      data = searchByField(data, n, o[n]);
    }
    return data;
  }
  function fillData(data) {
    $(".list-items").empty();
	
    for (var i = 0; i < data.length; i++) {
	  /*@module:bi work to getval*/
      var det_name = "Productlist-smartphone-name-detail"; 
	  var comp_name = "Productlist-smartphone-name-comparison"; 
	  var vm_name = "Productlist-smartphone-name-buy-vmall"; 
	  var jd_name = "Productlist-smartphone-name-buy-JD"; 
	  var tm_name = "Productlist-smartphone-name-buy-Tmall"; 
	  var sn_name = "Productlist-smartphone-name-buy-sunning";
	  var ret_name = "Productlist-smartphone-name-buy-retail";
	  var d = data[i];
	  det_name = det_name.replace("name",d.id);
	  comp_name = comp_name.replace("name",d.id);
	  vm_name = vm_name.replace("name",d.id);
	  jd_name = jd_name.replace("name",d.id);
	  tm_name = tm_name.replace("name",d.id);
	  sn_name = sn_name.replace("name",d.id);
	  ret_name = ret_name.replace("name",d.id);
      var it = xitem.clone();
      it.find(".list-item-images a:eq(0)").attr("href", d.link);
      it.find(".list-item-images img:eq(0)").attr("src", d.img1);
      it.find(".list-item-images a:eq(1)").attr("href", d.link);
      it.find(".list-item-images img:eq(1)").attr("src", d.img2);
      it.find(".list-item-title").text(d.name);
      it.find(".list-item-desc").text(d.desc);
      it.find(".list-item-more").attr("href", d.link);
	  it.find(".list-item-images a:eq(0),.list-item-images a:eq(1)").attr("data-pros-id",det_name);
	  it.find(".list-item-more").attr("data-pros-id",det_name);
	  it.find(".list-item-compare").attr("data-pros-id",comp_name);
	  it.find(".list-item-place .line1 .item li:eq(0)").attr("data-pros-id",vm_name);
	  it.find(".list-item-place .line1 .item li:eq(1)").attr("data-pros-id",jd_name);
	  it.find(".list-item-place .line1 .item li:eq(2)").attr("data-pros-id",tm_name);
	  it.find(".list-item-place .line1 .item li:eq(3)").attr("data-pros-id",sn_name);
	  it.find(".list-item-place .line2 .item li").attr("data-pros-id",ret_name);
      $(".list-items").append(it.attr("dDocName", d.id));
      it.find(".list-item-place .line1 a").each(function () {
        $(this).attr("data-t-label", d.id);
        $(this).attr("data-key1", d.id);
      })
      setProductColor(it, d.color);
      setProductBuys(it, d.buys);
      setProductStorePlace(it);
      checkNew(it, d.flag);
    }
    $(".list-items").append("<div class='list-clear'></div>").show();
    $(window).trigger('resize');
  }
  function checkNew(o, f) {
    f && o.find(".list-item-icon").removeClass("list-none");
  }
  function setProductStorePlace(o) {
    o.find(".list-item-place ul:eq(1) a").attr("href", config.storeUrl);
  }
  function setProductBuys(o, a) {
    var os = o.find(".list-item-place ul:eq(0) a");
    for (var i = 0; i < a.length; i++) {
      var h = os.eq(i);
      var s = a[i].replace(/[ ]/g, "");
      if (s == "") {
        h.attr("href", "javascript:void(0);");
        h.parent().addClass("x-disabled");
      } else {
        h.attr("href", s).attr("target", "_blank");
      }
    }
  }
  function setProductColor(o, c) {
    var obj = o.find(".list-item-colors").empty();
    var cs = c.split("|");
    for (var i = 0; i < cs.length; i++) {
      obj.append('<div class="list-item-color-sel"><div class="list-item-color x-p-c' + cs[i] + '"></div></div>');
    }
  }
  $(document).ready(function () {
    $(".list-filter-val").click(function () {
      $selectedVal = $(this);
      setTimeout(function () { doFilter(); }, 100);
    });
    $(".list-compare-btn").click(function () {
      var p = "";
      $(".list-compare-item").each(function (idx) {
        p += "pro" + (idx + 1) + "=" + $(this).attr("dDocName") + "&";
      });
      if ($(".list-compare-item").size() > 1) {
        var _value = '{"con_key0":"' + config.scope + '","con_key1":"compare","con_key2":"' + p + '"}';
        try { trackEvent(config.scope, p, 'compare', _value); } catch (e) { }
        document.location.href = config.compareURL + p.replace(/&$/, "")
      };
    });
  });
})(window.productFilterOptions || {});
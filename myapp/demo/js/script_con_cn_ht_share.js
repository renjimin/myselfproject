var console = window.console || { log: function (s) { } };
$(function () {
  var $MAIN_NAV = $('#cbg-main-nav');
  var $ACTIVE_ITEM = $MAIN_NAV.find('li.cbg-current');
  var $SUBMENU_WRAPPER = $('#cbg-submenu-wrapper');
  var SLIDE_SPEED = 0;
  var $hoverSubmenu = null;
  var $activeItem = null;
  var hideSubmenuTimer = null;

  function setActiveItem($item, forceReset) {
    if ($item == null) {
      // Reset
      $activeItem = null;
      clearTimeout(hideSubmenuTimer);
      hideSubmenuTimer = setTimeout(function () {
        if ($hoverSubmenu == null) {
          if (forceReset || $MAIN_NAV.find('li.cbg-current').length == 0) {
            $MAIN_NAV.find('li').removeClass('cbg-current');
            $ACTIVE_ITEM.addClass('cbg-current');
            $SUBMENU_WRAPPER.hide();
            $(".cbg-breadcrumbs-x").show();
          }
        }
      }, SLIDE_SPEED);
    }
    else {
      $MAIN_NAV.find('li').removeClass('cbg-current');
      $item.addClass('cbg-current');
      $activeItem = $item;
    }
  }

  $MAIN_NAV.find('ul a')
    .click(function (e) {
      var href = $(this).attr('href');
      if (href.indexOf('#') === 0) {
        e.preventDefault();
        return false;
      }
      return true;
    })
    .hover(
      function () {
      	
        setActiveItem($(this).parent());
        var $menu = $('#cbg-submenu-' + $(this).data('submenu'));
        // Open submenu
        $SUBMENU_WRAPPER.show();
        $menu.show().stop().animate({ top: '0px' }, SLIDE_SPEED, adjustWidth());
        if($(".cbg-inline:eq(0)").find("li:eq(5)").attr("class")=="cbg-current"||$(".cbg-inline:eq(0)").find("li:eq(6)").attr("class")=="cbg-current"||$(".cbg-inline:eq(0)").find("li:eq(7)").attr("class")=="cbg-current"){
        	$(".cbg-breadcrumbs-x").show();
        }else{
        	$(".cbg-breadcrumbs-x").hide();
        }
        var c = $("#cbg-main-nav-wrapper").attr("class")
    	/*if(c == "fixed"){
    		$("#cbg-main-nav .cbg-current span").css("padding-bottom","7px")
    	}else{
    		$("#cbg-main-nav .cbg-current span").css("padding-bottom","15px")	
    	}*/

      },
      function () {
        var $menu = $('#cbg-submenu-' + $(this).data('submenu'));
        if ($menu.length == 0) {
          // No associated submenu
          $(this).parent().removeClass('cbg-current');
          setActiveItem(null);
          return;
        }
        var $this = $(this);
        setTimeout(function () {
          if ($hoverSubmenu != null && $hoverSubmenu.attr('id') == $menu.attr('id')) {
            // Into submenu
            $activeItem = null;
            return;
          }
          else {
            $this.parent().removeClass('cbg-current');
            setActiveItem(null);
          }
          // Close submenu
          $hoverSubmenu = null;
          $menu.stop().animate({ top: '-' + ($menu.height() + 40) + 'px' }, SLIDE_SPEED);
     	}, 0);
      }
    );
  // Sub-menu elements
  // Clone SNS items to each submenu
  for (var i = 1; i < $('.cbg-submenu').length; i++) {
    $('.cbg-submenu').eq(0).find('li.col-sns').clone().appendTo($('#cbg-submenu-' + (i + 1)).find('ul.cbg-wrapper'));
  }
  $('.cbg-submenu').each(function () {
    $(this).css('top', '-' + ($(this).height() + 300) + 'px').show().hover(
      function () {
        $hoverSubmenu = $(this);
      },
      function () {
        // Close submenu
        $hoverSubmenu = null;
        //$(this).stop().animate({ top: '-' + ($(this).height() + 40) + 'px' }, SLIDE_SPEED);
        var $menu = $(this);
        $(this).fadeOut(300, function () { $menu.css('top', '-' + ($menu.height() + 40) + 'px'); });
        setTimeout(function () {
          var forceReset = $activeItem == null ? true : false;
          setActiveItem(null, forceReset);
        }, 200);
      }
    );
  });
  function adjustWidth() {
    $('.cbg-submenu').each(function () {
      // Adjust overlay width
      var sns = $(this).find('ul.cbg-inline .col-sns');
      var overlay = $(this).find('.cbg-overlay-left');
      var viewall = $(this).children('.cbg-view-all');
      overlay.css('width', sns.offset().left + 'px');
      viewall.css('width', sns.offset().left + 'px'); 
    });
  }
  adjustWidth();
  $(window).on('resize', function () {
    adjustWidth();
  });
  //$('#cbg-submenu-2').show();
  // Now we can hide the submenu wrapper
  $SUBMENU_WRAPPER.hide();

  // scrolling
  var scrollTimer;
  var $searchForm = $('#cbg-main-nav-search div:eq(0)');
  var $searchIcon = $('#cbg-main-nav-search .cbg-icon-search');
  $searchIcon.on('click', function () {
    $searchIcon.fadeOut('fast', function () { $searchForm.fadeIn(function () { $searchForm.find('input[type=text]').focus(); }); });
  });
   $(window).on('scroll', function () {
    var scrollTop = $(window).scrollTop();
    var $wrapper = $('#cbg-main-nav-wrapper');

    if (scrollTop > 67) {
      if (!$wrapper.hasClass('fixed')) {
        $wrapper.addClass('y-header-border-bottom fixed');
        $('body').addClass('main-nav-fixed');
        $searchForm.fadeOut('fast', function () { $searchIcon.fadeIn(); });
      }
    }
    else {
      // Page top
      $wrapper.removeClass('y-header-border-bottom fixed');
      $('body').removeClass('main-nav-fixed');
      $searchIcon.fadeOut('fast', function () { $searchForm.fadeIn(); });
    }
    
    // Other elements that needs to be fixed.
    
    $('div[data-fixed-scrolltop]').each(function () {
      var id = $(this).attr('id');
      var cls = '';
      if (id) {
        cls = id + '-fixed';
      }
      if (scrollTop > $(this).data('fixed-scrolltop')) {
        $('body').addClass(cls);
        $(this).addClass('y-header-border-bottom fixed');
      }
      else {
        $('body').removeClass(cls);
        $(this).removeClass('y-header-border-bottom fixed');
      }
    });
  });
});

// Search form
$(function () {
  $('.cbg-search-form').submit(function (e) {
    var k = $(this).find('input[name=keywords]').val();
    if (k.length > 90) {
      alert(LAG_CON_LENGTH_90);
      e.preventDefault();
      return false;
    }
    else if (k == "") {
      alert(LAG_CON_ENTER_SEARCH_TERM);
      e.preventDefault(); 
      return false;
    }
    
    else if (k.length < 2) {
      alert(LAG_CON_ENTER_MORE_TERM);
      e.preventDefault();
      return false;
    }
    return true;
  });
});

// Login/logout
$(function () {
  $('.cbg-login-link').attr('href', "http://consumer.huawei.com/support/login/cloudplatforms?siteURL=" + encodeURIComponent(window.location.href));
  $('.cbg-logout-link').attr('href', "http://consumer.huawei.com/support/logout/cloudplatforms?siteURL=" + encodeURIComponent("https://hwid1.vmall.com/casserver/logout?service=" + window.location.href));
  $('.cbg-register-link').attr('href', "https://hwid1.vmall.com/oauth2/portal/regbymail.jsp?service=" + encodeURIComponent("http://consumer.huawei.com/support/login/cloudplatforms?siteURL=http://consumer.huawei.com/cn/index.htm") + "?loginChannel=27000000&reqClientType=27&deviceID=");
  var _userAccount;
  var strCookie = document.cookie;
  var arrCookie = strCookie.split("; ");

  for (var i = 0; i < arrCookie.length; i++) {
    var arr = arrCookie[i].split("=");
    var _account = "UserAccount";
    if (_account == arr[0]) {
      _userAccount = decodeURIComponent(arr[1]);
    }
  }

  if (typeof _userAccount != "undefined" && _userAccount != "undefined" && _userAccount != "anonymous" && _userAccount != "") {
    // Logged in
    $('.cbg-not-logged-in').hide();
    $('.cbg-logged-in').show();
    $('.cbg-user-account').text(_userAccount);
  }
  else {
    // Not logged in
    $('.cbg-not-logged-in').show();
    $('.cbg-logged-in').hide();
  }

  // Customer service online stores button
  $('#cbg-customer-service .col-buy > .cbg-btn').on('mouseenter', function (e) {
    $(this).hide();
    $(this).siblings('ul').fadeIn();
  });
  $('#cbg-customer-service .col-buy').on('mouseleave', function (e) {
    $(this).find('ul').hide();
    $(this).find('.cbg-trigger').show();
  });
});

$(function () {
  // Back to top button
  var $backtotop = $('.cbg-backtotop');
  $backtotop.on('click', function (e) {
    $('html,body').animate({ scrollTop: 0 }, 500);
    e.preventDefault();
  });

  // Product nav
  if(!$('.product-nav').hasClass("minisite-head")){
  	$('.product-nav .btn-buy').on('click', function (e) {
      	$('.product-nav .discover').slideUp();
      	$('.product-nav .buy').slideToggle();
      	e.stopPropagation();
      	e.preventDefault();
    })
  }  
  $('.product-nav .btn-more').not('.product-nav .btn-follow-link').on('click', function (e) {
      $('.product-nav .buy').slideUp();
      $('.product-nav .discover').slideToggle();
      e.stopPropagation();
      e.preventDefault();
    });
  $(window).on('scroll', function (e) {
    var scrollTop = $(window).scrollTop();
    var c = $("#cbg-main-nav-wrapper").attr("class")
    /*if(c == "fixed"){
    	$("#cbg-main-nav .cbg-current span").css("padding-bottom","7px")
    }else{
    	$("#cbg-main-nav .cbg-current span").css("padding-bottom","15px")	
    }*/
    if($('#cbg-main-nav').length){
    
    }
    if ($('#cbg-main-nav').length && scrollTop > $('#cbg-main-nav').offset().top + $('#cbg-main-nav').height()) {
      !$('.product-nav').hasClass("minisite-head")?$('.product-nav').addClass('y-header-border-bottom fixed').hide():$('.product-nav').addClass('fixed');
    }
    else {
      // Page top
      if ($('body').hasClass('cbg-localnav')) {
        // Don't hide local nav
        $('.product-nav').removeClass('y-header-border-bottom fixed');
      }
      else {
        $('.product-nav').removeClass('y-header-border-bottom fixed').show();
      }
    }
    // back to top
    if (scrollTop > 200) {
      if ($backtotop.css('display') != 'block') {
        $('.cbg-backtotop').fadeIn();
      }
    }
    else {
      if ($backtotop.css('display') != 'none') {
        $('.cbg-backtotop').fadeOut();
      }
    }
  }).trigger('scroll');
});

// Wechat button (display QR code)
$(function(){
	$('.cbg-icon-wechat').mousemove(function(){
	  if(!$(this).prev('.ui-QR').is(':animated')){
		  $(this).prev('.ui-QR').show();
	  }
  });
  $('.cbg-icon-wechat').mouseleave(function(){
	  $(this).prev('.ui-QR').hide();
  }); 
})

// Share buttons
var share = window.share || {};
share.openShareWindow = function (site, text, linkUrl, imageUrl, title) {
  text = encodeURIComponent(text || document.title);
  linkUrl = encodeURIComponent(linkUrl || window.location.href);
  imageUrl = encodeURIComponent(imageUrl || "");
  title = encodeURIComponent(title || document.title);
  var shareUrl;
  switch (site) {
    case "facebook":
      shareUrl = "http://www.facebook.com/sharer.php?s=100&p[title]=" + title + "&p[summary]=" + text + "&p[url]=" + linkUrl + "&p[images][0]=" + imageUrl;
      break;
    case "googleplus":
      shareUrl = "https://plus.google.com/share?url=" + linkUrl;
      break;
    case "twitter":
      shareUrl = "https://twitter.com/intent/tweet?text=" + text + encodeURIComponent(' ') + linkUrl;
      break;
    case "sina":
    case "sinaweibo":
      shareUrl = "http://v.t.sina.com.cn/share/share.php?url=" + linkUrl + "&pic=" + imageUrl + "&title=" + text + "&content=utf8";
      break;
    case "qq":
      shareUrl = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + linkUrl + "&title=" + title + "&desc=" + text + "&summary=" + text + "&pics=" + imageUrl;
      break;
    case "qqweibo":
      shareUrl = "http://share.v.t.qq.com/index.php?c=share&a=index&pic=" + imageUrl + "&url=" + linkUrl + "&title=" + text;
      break;
    case "kaixin":
      shareUrl = "http://www.kaixin001.com/rest/records.php?style=11&url=" + linkUrl + "&content=" + text;
      break;
    case "renren":
      shareUrl = "http://widget.renren.com/dialog/share?charset=UTF-8&description=" + text + "&pic=" + imageUrl + "&resourceUrl=" + linkUrl + "&title=" + title;
      break;
    case "douban":
      shareUrl = "http://shuo.douban.com/!service/share?href=" + linkUrl + "&name=" + title + "&image=" + imageUrl + "&text=" + text;
      break;
    case "taobao":
    default:
      return;
  }
  window.open(shareUrl, "sw", "width=800,height=500,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
}

$(function () {
  $('.cbg-share a, a.cbg-chare').click(function (e) {
    e.preventDefault();
    share.openShareWindow($(this).data('sns'));
  });
});

/*pws support product dt 2015-08-25 support-product.js*/


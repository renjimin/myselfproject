$(function () {
  var console = window.console || { log: function (s) { } };
  // Main menu
  var menuTimer = null;
  var menuHoverFlag = false;
  $('#cbg-main-nav').hover(
    function () { menuHoverFlag = true; },
    function () { menuHoverFlag = false; }
  );
  $('#cbg-main-nav ul.cbg-menu > li').hover(
    function () {
      clearTimeout(menuTimer);
      var $menu = $(this).find('.cbg-submenu');
      if ($menu.length == 0) {
        return;
      }
      if (menuHoverFlag) {
        $('body').addClass('main-nav-visible');
        $menu.css('visibility', 'visible');
      }
      else {
        menuTimer = setTimeout(function () {
          $('body').addClass('main-nav-visible');
          $menu.css('visibility', 'visible');
        }, 200);
      }
    },
    function () {
      clearTimeout(menuTimer);
      var $menu = $(this).find('.cbg-submenu');
      $('body').removeClass('main-nav-visible');
      $menu.css('visibility', 'hidden');
    }
  );
  $('#cbg-main-nav ul.cbg-menu > li > a').click(function (e) {
    if ($(this).attr('href') == '#') {
      e.preventDefault();
    }
  });
  // Clone SNS items to each submenu
  for (var i = 1; i < $('.cbg-submenu').length; i++) {
    $('.cbg-submenu').eq(0).find('li.col-sns').clone(true).appendTo($('.cbg-submenu').eq(i).find('ul.cbg-wrapper'));
  }
  // Adjust submenu overlay width
  function adjustWidth() {
    $('.cbg-submenu').each(function () {
      $(this).offset({ left: 0 }).width($(window).width());
      var sns = $(this).find('ul.cbg-inline .col-sns');
      var overlay = $(this).find('.cbg-overlay-left');
      var viewall = $(this).children('.cbg-view-all');
      var ul = $(this).children('ul.cbg-inline');
      var margin = ($(window).width() - ul.width()) / 2;
      overlay.css('width', sns.offset().left + 'px');
      viewall.css({
        width: (sns.offset().left - margin) + 'px',
        paddingLeft: margin + 'px'
      });
    });
  }
  adjustWidth();
  $(window).on('resize', function () {
    adjustWidth();
  });

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
    var threshold = $('#cbg-top-nav').css('display') == 'none' ? 0 : $('#cbg-top-nav').height();
    if (scrollTop > threshold) {
      if (!$wrapper.hasClass('fixed')) {
        $wrapper.addClass('fixed');
        $('body').addClass('main-nav-fixed');
        $searchForm.fadeOut('fast', function () { $searchIcon.fadeIn(); });
      }
    }
    else {
      // Page top
      $wrapper.removeClass('fixed');
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
        $(this).addClass('fixed');
      }
      else {
        $('body').removeClass(cls);
        $(this).removeClass('fixed');
      }
    });
  });
});


// Search form
$(function () {
  var keypressFlag = false;
  $('.cbg-search-form input[type=text]').on('keydown', function (e) {
    keypressFlag = true;
  });
  $('.cbg-search-form').submit(function (e) {
    var $k = $(this).find('input[name=keywords]');
    var placeholder = $k.attr('placeholder');
    var k = $.trim($k.val());
    if (k.length > 90) {
      alert(window.LAG_CON_LENGTH_90 || $k.data('prompt-keyword-too-long') || "Key length of input cannot be longer than 90.");
      return false;
    }
    else if (k == "" || (k == placeholder && !keypressFlag)) {
      if ($k.data('allow-empty') == true) {
        $k.val(placeholder);
        // Tracking
        try { $.multitrack.trackEvent(cbgtracking.defaultEventCategory, 'top-nav', 'search'); } catch (e) { }
        return true;
      }
      alert(window.LAG_CON_ENTER_SEARCH_TERM || $k.data('prompt-keyword-empty') || "Please enter a search term.");
      return false;
    }
    else if (k.length < 2) {
      alert(window.LAG_CON_LENGTH_2 || window.LAG_CON_ENTER_MORE_TERM || $k.data('prompt-keyword-too-short') || "Please enter more term.");
      return false;
    }
    // Tracking
    try { $.multitrack.trackEvent(cbgtracking.defaultEventCategory, 'top-nav', 'search'); } catch (e) { }
    return true;
  });
});

function search(){
  var $k = $('.cbg-search-form input[type=text]')
  var p = $k.attr("placeholder")
  var k = $.trim($k.val())
  if(k == ""){
    $.multitrack.trackEvent(cbgtracking.defaultEventCategory, 'top-nav', 'search');
    window.location.href = "http://consumer.huawei.com/cn/search/index.htm?keywords=" + encodeURIComponent(p)
  }else{
    if(k.length == 1){
      alert(window.LAG_CON_ENTER_MORE_TERM)
      return false
    }
    if(k.length > 90){
      alert(window.LAG_CON_LENGTH_90 || $k.data('prompt-keyword-too-long') || "Key length of input cannot be longer than 90.");
      return false
    }
    $.multitrack.trackEvent(cbgtracking.defaultEventCategory, 'top-nav', 'search');
    window.location.href = "http://consumer.huawei.com/cn/search/index.htm?keywords=" + encodeURIComponent(k)
  }
}
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
});

$(function () {
  // Customer service online stores button
  $('#cbg-customer-service .col-buy > .cbg-btn').on('mouseenter', function (e) {
    $(this).hide();
    $(this).siblings('ul').fadeIn();
  });
  $('#cbg-customer-service .col-buy').on('mouseleave', function (e) {
    $(this).find('ul').hide();
    $(this).find('.cbg-trigger').show();
  });

  // Back to top button
  var $backtotop = $('.cbg-backtotop');
  $backtotop.on('click', function (e) {
    $('html,body').animate({ scrollTop: 0 }, 500);
    e.preventDefault();
  });

  // Product nav
  $('.product-nav .btn-buy').on('click', function (e) {
      $('.product-nav .discover').slideUp();
      $('.product-nav .buy').slideToggle();
      e.stopPropagation();
      e.preventDefault();
    })
  $('.product-nav .btn-more').not('.product-nav .btn-follow-link').on('click', function (e) {
      $('.product-nav .buy').slideUp();
      $('.product-nav .discover').slideToggle();
      e.stopPropagation();
      e.preventDefault();
    });
  $(window).on('scroll', function (e) {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > $('#cbg-top-wrapper').height()) {
      $('.product-nav').addClass('fixed').slideDown();
    }
    else {
      // Page top
      if ($('body').hasClass('cbg-localnav')) {
        // Don't hide local nav
        $('.product-nav').removeClass('fixed');
      }
      else {
        $('.product-nav').removeClass('fixed').slideUp();
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
$(function () {
  $('.cbg-wechat-qrcode').append('<div class="cbg-wechat-qr-container" />');
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
      shareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + linkUrl;
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
  $('.cbg-share a, a.cbg-share').click(function (e) {
    e.preventDefault();
    share.openShareWindow($(this).data('sns'));
  });
});
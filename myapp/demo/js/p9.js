"use strict";
var Scroller = {"const": {SELECTORS: {revealClass: ".reveal",revealDelayClass: ".reveal-delay",revealWaterfallClass: ".reveal-waterfall"},CONFIG: {duration: 1e3,scale: 1,viewFactor: .15,distance: "50px",origin: "bottom",mobile: "false",delay: 0}},init: function() {
        this.sr = ScrollReveal({reset: !1}), this.setScrollPoints()
    },setScrollPoints: function() {
        this.sr.reveal(this["const"].SELECTORS.revealClass, this["const"].CONFIG), this.sr.reveal(this["const"].SELECTORS.revealDelayClass, $.extend({}, this["const"].CONFIG, {delay: 200})), this.sr.reveal(this["const"].SELECTORS.revealWaterfallClass, $.extend({}, this["const"].CONFIG, {delay: 50}))
    }}, 
VideoPlayer = {init: function() {
        this.cacheDomElements(), this.switchVideoSource(), this.playerEvents()
    },switchVideoSource: function() {
        $(window).width()
    },cacheDomElements: function() {
        this.els = $(".video-section")
    },playerEvents: function() {
        this.els.find(".video--play__btn").on("click", function(e) {
            var t = $(e.target), 
            o = t.parents(".video-section"), 
            i = o.find("video");
            i.get(0).play(), i.get(0).controls = !0, t.fadeOut(300)
        }.bind(this)), this.els.find("video").on("ended", function(e) {
            var t = $(e.target), 
            o = t.parents(".video-section"), 
            i = o.find(".video--play__btn");
            t.get(0).autoplay = !1, t.get(0).controls = !1, t.get(0).load(), i.fadeIn(300)
        }.bind(this))
    }}, 
SocialBlock = {init: function() {
        this.cacheDomElements(), $(".share-sub__block").length > 0 && (this.setEvents(), this.setShareUrl())
    },cacheDomElements: function() {
        this.el = {shareApi: $(".share__api"),shareUrl: $(".share__url")}
    },setShareUrl: function() {
        this.el.shareUrl.each(function() {
            0 == $(this).val().length && $(this).val(window.location.href)
        })
    },setEvents: function() {
        $(".share-block").on("click touchstart", function(e) {
            e.preventDefault();
            var t = $(e.target), 
            o = t.closest(".social-share"), 
            i = {shareSubBlock: o.find(".share-sub__block"),conceal: o.find(".conceal--")};
            this.openSocialIcons(i, t)
        }.bind(this)), this.el.shareApi.on("click touchstart", function() {
            var e = $(this).attr("href");
            return window.open(e, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"), !1
        }), this.el.shareUrl.on("click touchstart", function() {
            $(this).select(), document.execCommand && document.execCommand("copy")
        })
    },openSocialIcons: function(e, t) {
        e.shareSubBlock.hasClass("active--") ? (t.removeClass("open--"), e.conceal.animate({opacity: "0.01"}, 300, function() {
            e.shareSubBlock.removeClass("active--")
        }.bind(this))) : (t.addClass("open--"), e.shareSubBlock.addClass("active--"), e.conceal.delay(300).animate({opacity: 1}, 300))
    }}, 
DropDownSelect = {"const": {BTNSELECTOR: ".dropdown-select .btn"},init: function() {
        this.setupEvents()
    },closeDropdown: function(e) {
        e.slideUp()
    },openDropdown: function(e) {
        e.slideDown()
    },setupEvents: function() {
        var e = this;
        $(document).on("click", this.BTNSELECTOR, function(t) {
            t.stopPropagation();
            //t.preventDefault();
            var o = $(this), 
            i = o.parent(), 
            s = i.find(".dropdown");
            s.is(":visible") ? (e.closeDropdown(s), $("body").off("click.dropdown")) : (e.openDropdown(s), $("body").on("click.dropdown", function(t) {
                $(t.target).hasClass("dropdown-select") || $(t.target).parent().hasClass("dropdown-select") || t.stopPropagation(), t.target !== s[0] && t.target !== o[0] && t.target !== i[0] && s.is(":visible") ? (e.closeDropdown(s), $("body").off("click.dropdown")) : t.target !== o[0] && t.target !== i[0] || (t.preventDefault(), e.closeDropdown(s), $("body").off("click.dropdown"))
            }))
        })
    }}, 
DeviceDetect = {init: function() {
        var e = !1;
        !function(t) {
            (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0)
        }(navigator.userAgent || navigator.vendor || window.opera), e === !0 && $("html").addClass("mobile");
        var t = "undefined" != typeof InstallTrigger;
        t === !0 && $("html").addClass("firefox")
    }}, 
threesixty, ThreesixtyStarter = {"const": {TOTAL_IMAGES: 99},getImagesToPreload: function(e, t) {
        t = t || 0;
        for (var o, i = [], s = 0; s < this["const"].TOTAL_IMAGES; s++)
            o = 10 > s ? "0" + s : s, i.push("images/" + e + "/360-sequence/" + o + ".jpg");
        return i.filter(function(e, o) {
            return o % t
        }), i
    },init: function() {
        threesixty = Threesixty($(".threesixty__sequence")[0], hcw.utils.viewportCheck.isMobile() ? this.getImagesToPreload("p9") : this.getImagesToPreload("p9", 2))
    }};
$(function() {
    function e() {
        c && (threesixty.gotoPrevFrame(), c && setTimeout(e, n))
    }
    
    function t() {
        c && (threesixty.gotoNextFrame(), c && setTimeout(t, n))
    }
    var o = $(".color-chooser label"), 
    i = $(".buy-panel__image-item.top"), 
    s = $(".buy-panel__image-item.bottom"), 
    a = $(".buy-panel__buy-button, .btn--buy-fixed");
    o.on("click", function() {
        var e = $("#" + this.htmlFor), 
        t = s.attr("src");
        i.attr({src: t}), i.show(), $(".color-chooser__selected-color").text(e.val()), s.attr("src", e.data("src")), i.fadeOut("fast"), a.attr("href", e.data("buy-href"))
    });
    var n = 20, 
    c = !1;
    $(".rotate-controls__left").on("mousedown touchstart", function(t) {
        c = !0, e()
    }), $(".rotate-controls__right").on("mousedown touchstart", function(e) {
        c = !0, t()
    }), $(document).on("mouseup touchend dragend", function(e) {
        c = !1
    }), $(".rotate-controls__left, .rotate-controls__right").on("click", function(e) {
        e.preventDefault()
    }), $(".collapsible__header").click(function() {
        $(this).parent().toggleClass("collapsible--collapsed")
    }), $(".specs .sku-btn").click(function(e) {
        $(".specs .sku-btn").removeClass("selected");
        var t = $(this);
        t.addClass("selected"), $(".specs dl").removeClass(), $(".specs dl").addClass(t.data("sku"))
    }), ThreesixtyStarter.init(), Scroller.init(), DropDownSelect.init(), SocialBlock.init(), DeviceDetect.init(), VideoPlayer.init()
});






$(function(){

    // 追踪事件
    try {
        bindTrackEvents();
    } catch (err) {
        console.log(err);
    }
    
});

// 绑定追踪事件
function bindTrackEvents() {
    var labels = 'P9 product page ' + WEB_SITE_SHORT;
    var prefix = 'bte';
    var doch = $(document).height();
    var $win = $(window);
    var winh = $win.height();
    var scrollTime;

    // 按钮购买
    $('.btn--buy-fixed').on('click.' + prefix, function() {
        trackEvent('buyclick', 'floating', labels);
    });
    $('.buy-panel__buy-button').on('click.' + prefix, function() {
        trackEvent('buyclick', 'vmall', labels);
    });

    // 合作购买
    $('.buy-panel__plans__list a').on('click.' + prefix, function(i) {
        var n = $(this).prev().attr('src');
        n = n.replace('images/', '').replace('partner-', '').replace('.png', '');
        trackEvent('buyclick', n, labels);
    });

    // 视频播放
    $('#section-3').find('.video--play__btn').on('click.' + prefix, function(){
        trackEvent('videoPlay', 'tvc', labels);
    });
    $('#section-10').find('.video--play__btn').on('click.' + prefix, function(){
        trackEvent('videoPlay', 'productvideo', labels);
    });

    // 分享
    $('#section-3').find('.share-sub__block a').on('click.' + prefix, function(){
        share($(this), 'videoShare');
    });
    $('#section-15').find('.share-sub__block a').on('click.' + prefix, function(){
        share($(this), 'productShare');
    });

    //滚动比例
    $win.on('beforeunload.' + prefix, function(){
        var p = $win.scrollTop() / (doch - winh) * 100
        p = Math.round(p);
        if(p < 25){
            p = 'fold';
        }else if(p >= 25 && p < 50){
            p = '25%';
        }else if(p >= 50 && p < 75){
            p = '50%';
        }else if(p >= 75 && p < 100){
            p = '75%';
        }else{
            p = '100%';
        }
        trackEvent('scrollPercentage', p, labels);
    });

    function share($this, cata){
        var n;
        var href = $this.attr('href');
        if (href.indexOf('twitter') > -1) {
            n = 'twitter';
        } else if (href.indexOf('facebook') > -1) {
            n = 'facebook';
        }
        trackEvent(cata, n, labels);
    }
}
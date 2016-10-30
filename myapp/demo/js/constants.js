// Namespace: hcw
window.hcw = window.hcw || {};

window.hcw.constants = (function(){
    return {
        BREAKPOINT_DESKTOP: 992
    }
}());

function hoverFix() {
    var el = this;
    var par = el.parentNode;
    var next = el.nextSibling;
    par.removeChild(el);
    setTimeout(function() {par.insertBefore(el, next);}, 0)
}

if (!window.ontouchstart
    && !navigator.maxTouchPoints
    && !navigator.msMaxTouchPoints) {
    $('body').addClass('notouch');
}

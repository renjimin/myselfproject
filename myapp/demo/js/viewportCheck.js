// Namespace: hcw
window.hcw = window.hcw || {};
window.hcw.utils = window.hcw.utils || {};

window.hcw.utils.viewportCheck = (function(){
    function isMobile(){
        return $(document).width() < window.hcw.constants.BREAKPOINT_DESKTOP;
    }

    return {
        isMobile: isMobile
    };
}());

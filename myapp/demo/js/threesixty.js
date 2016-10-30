var Threesixty = window.Threesixty || {};
Threesixty = (function(domElement, imagesToLoad, interactive){
    'use strict';

    var isTouchSupported = 'ontouchstart' in window;
    var startEvent = isTouchSupported ? 'touchstart' : 'mousedown';
    var stopEvent = isTouchSupported ? 'touchend' : 'mouseup';
    var moveEvent = isTouchSupported ? 'touchmove' : 'mousemove';

    var currentFrame = 0;
    var mouseX = 0;
    var oldMouseX = 0;
    var container;
    var images;
    var totalImages;
    var interactive = interactive || true;

    function init() {
        container = domElement;
        totalImages = imagesToLoad.length;

        preloadimages(imagesToLoad, prepareImages);
    }

    function preloadimages(obj, cb) {
        var loaded = 0;
        var toload = 0;
        var images = obj instanceof Array ? [] : {};

        for (var i in obj) {
            toload++;
            images[i] = new Image();
            images[i].src = obj[i];
            images[i].onload = load;
            images[i].onerror = load;
            images[i].onabort = load;
        }

        function load() {
            if (++loaded >= toload) cb(images);
        }
    }

    function prepareImages(loadedImages) {
        images = loadedImages.map(function(item){
            item.draggable = false;
            return item;
        });

        emptyDomNode(container);
        container.appendChild(images[currentFrame]);

        if (interactive) {
            initListeners();
        }
    }

    function emptyDomNode(element) {
        if (element.hasChildNodes()) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }
    }

    function initListeners() {
        container.addEventListener(startEvent, startDrag);
    }

    function startDrag(e) {
        console.log('startDrag');
        e.preventDefault();
        document.addEventListener(moveEvent, drag);
        document.addEventListener(stopEvent, stopDrag);
        container.classList.add('threesixty--grabbing');
    }

    function stopDrag(e) {
        console.log('stopDrag');
        e.preventDefault();
        document.removeEventListener(moveEvent, drag);
        document.removeEventListener(stopEvent, stopDrag);
        container.classList.remove('threesixty--grabbing');
    }

    function drag(e){
        e.preventDefault();

        mouseX = e.pageX || e.changedTouches[0].pageX;

        if (mouseX < oldMouseX) {
            prevFrame();
        } else if (mouseX > oldMouseX) {
            nextFrame();
        }

        oldMouseX = mouseX;
    }

    function prevFrame() {
        currentFrame--;

        if (currentFrame < 0) currentFrame = totalImages - 1;

        replaceImage();
    }

    function nextFrame() {
        currentFrame++;

        if (currentFrame === totalImages) currentFrame = 0;

        replaceImage();
    }

    function replaceImage() {
        container.replaceChild(images[currentFrame], container.childNodes[0]);
    }

    init();

    return {
        gotoPrevFrame: prevFrame,
        gotoNextFrame: nextFrame
    };
});


//DOM ready
$(() => {
    // ** Variables ** //
    const $startView = $('#startView');
    const $enterPageBtn = $("#enterPageBtn");
    const $enterPageTxt = $("#enterPageTxt");
    const $enterPageLogo = $("#enterPageLogo");
    const $hamburger = $(".hamburger");
    const $nav = $("nav");
    const $logoBtn = $("#logoBtn");
    const $discoverFremmedBtn = $("#discoverFremmedBtn");
    const $homeBtn = $("#homeBtn");
    const $handsVideo = $(".handsVideo");
    const $handsVideoMobile = $('#handsVideoMobile');
    const $handsVideoWeb = $('#handsVideoWeb');
    const $playDeidreBtn = $("#playDeidreBtn");
    const $deidreVideo = $('.deidreVideo');
    const $videoControls = $(".videoControls");
    const $fullscreenBtn = $("#fullscreenBtn");
    const $pauseBtn = $("#pauseBtn");
    const $playBtn = $("#playBtn");
    const $muteBtn = $("#muteBtn");
    const $loudBtn = $("#loudBtn");
    let $progressBar = $('.progressBar');
    const $timeBar = $('#timeBar');
    const $current =  $('#current');
    const $duration =  $('#duration');
    const $exitBtn = $('#exitBtn');
    const $discoverMoreMain = $('.discoverMoreMain');
    const $footer = $("footer");

    // ** Hide on page load ** //
    $enterPageLogo.addClass('kenburns-top');
    $logoBtn.hide();
    $hamburger.hide();
    $nav.hide();
    $handsVideo.hide();
    $discoverMoreMain.hide();
    $footer.hide();

    // ** Enter page function ** //
    $enterPageBtn.click(function(){
        loadHomepage();
    });

    $enterPageTxt.click(function(){
        loadHomepage();
    });

    function loadHomepage(){
        $startView.hide();
        $homeBtn.hide();
        $discoverFremmedBtn.show();
        $logoBtn.show();
        if (window.matchMedia("(min-width: 700px)").matches) {
            $hamburger.hide();
            $nav.show();
            $handsVideoWeb.show();
            $handsVideoWeb[0].play();
        }else {
            $hamburger.show();
            $handsVideoMobile.show();
            $handsVideoMobile[0].play();
        }
    }

    // ** Logo button ** //
    $logoBtn.click(function(){
        location. reload(true);
        $startView.show();
    });

    // ** Hamburger menu ** //
    $hamburger.click(function(){
        $hamburger.toggleClass("is-active");
        $nav.toggle();
    });

    // ** Play Diedre button ** //
    $playDeidreBtn.click(function(){
        $(this).hide();
        $logoBtn.hide();
        $nav.hide();
        $hamburger.hide();
        $handsVideo.hide();
        $discoverMoreMain.hide();
        $footer.hide();
        $deidreVideo.show();
        $videoControls.css('display', 'flex');
        if($deidreVideo[0].paused) {
            $deidreVideo[0].play();
        }
        if (window.matchMedia("(min-width: 700px)").matches) {
            $fullscreenBtn.hide();
        }
    });

    // ** Fullscreen video ** //
    $fullscreenBtn.on('click', function() {
        //For Webkit
        $deidreVideo[0].webkitEnterFullscreen();

        //For Firefox
        $deidreVideo[0].mozRequestFullScreen();

        return false;
    });

    // ** Pause video ** //
    $pauseBtn.click(function(){
        $(this).hide();
        $playBtn.css('display', 'flex');
        if($deidreVideo[0].played) {
            $deidreVideo[0].pause();
        }
        console.log('paused');
    });

    // ** Play video ** //
    $playBtn.click(function(){
        $(this).hide();
        $pauseBtn.css('display', 'flex');
        if($deidreVideo[0].paused) {
            $deidreVideo[0].play();
        }
        console.log('played');
    });

    // ** Mute video ** //
    $muteBtn.click(function () {
        $(this).hide();
        $loudBtn.css('display', 'flex');
        $deidreVideo.prop('muted', true);
        console.log('muted');
    });

    // ** Unmute video ** //
    $loudBtn.click(function () {
        $(this).hide();
        $muteBtn.css('display', 'flex');
        $deidreVideo.prop('muted', false);
        console.log('unmuted');
    });

    // ** Progress bar video ** /

    //get HTML5 video time duration
    $deidreVideo.on('loadedmetadata', function() {
        var minutes = Math.floor($deidreVideo[0].duration / 60);
        var seconds = Math.floor($deidreVideo[0].duration);
        $duration.text(minutes+':'+seconds);
    });

    //update HTML5 video current play time
    $deidreVideo.on('timeupdate', function() {
        var minutes = Math.floor($deidreVideo[0].currentTime / 60);
        var seconds = Math.floor($deidreVideo[0].currentTime);
        $current.text(minutes+':'+seconds);
    });

    $deidreVideo.on('timeupdate', function() {
        var percentage = 100 * $deidreVideo[0].currentTime / $deidreVideo[0].duration;
        $timeBar.css('width', percentage+'%');
    });

    var timeDrag = false;   /* Drag status */
    $progressBar.mousedown(function(e) {
        timeDrag = true;
        updateProgressBar(e.pageX);
    });

    $(document).mouseup(function(e) {
        if(timeDrag) {
            timeDrag = false;
            updateProgressBar(e.pageX);
        }
    });

    $(document).mousemove(function(e) {
        if(timeDrag) {
            updateProgressBar(e.pageX);
        }
    });

    var updateProgressBar = function(x) {
        var position = x - $progressBar.offset().left;
        var percentage = 100 * position / $progressBar.width();

        //Check within range
        if(percentage > 100) {
            percentage = 100;
        }
        if(percentage < 0) {
            percentage = 0;
        }

        //Update progress bar and video currenttime
        $timeBar.css('width', percentage+'%');
        $deidreVideo[0].currentTime = $deidreVideo[0].duration * percentage / 100;
    };


    // ** Exit video ** //
    $exitBtn.click(function(){
        if($deidreVideo[0].played) {
            $playBtn.hide();
            $pauseBtn.show();
            $deidreVideo[0].pause();
        }
        $videoControls.hide();
        $deidreVideo.hide();
        $homeBtn.hide();
        $logoBtn.show();
        $playDeidreBtn.show();
        $discoverFremmedBtn.show();
        if (window.matchMedia("(min-width: 700px)").matches) {
            $hamburger.hide();
            $nav.show();
            $handsVideoWeb.show();
        }else {
            $nav.hide();
            $hamburger.show();
            $hamburger.removeClass("is-active");
            $handsVideoMobile.show();
        }
    });

    // ** Discover Fremmed button ** //
    $discoverFremmedBtn.click(function(){
        $('body').css('overflow-y', 'visible');
        if($deidreVideo[0].played) {
            $deidreVideo[0].pause();
        }
        $(this).hide();
        $handsVideo.hide();
        $logoBtn.show();
        $homeBtn.show();
        $homeBtn.css('bottom','40%');
        $discoverMoreMain.show();
        $footer.show();
        if (window.matchMedia("(min-width: 700px)").matches) {
            $hamburger.hide();
            $nav.show();
        }else {
            $nav.hide();
            $hamburger.show();
            $hamburger.removeClass("is-active");
        }
    });

    // ** Home button ** //
    $homeBtn.click(function(){
        window.scrollTo(0, 0);
        $('body').css('overflow-y', 'hidden');
        $(this).hide();
        $deidreVideo[0].pause();
        $discoverFremmedBtn.show();
        $logoBtn.show();
        if (window.matchMedia("(min-width: 700px)").matches) {
            $hamburger.hide();
            $nav.show();
            $handsVideoWeb.show();
            $handsVideoWeb[0].play();
        }else {
            $nav.hide();
            $hamburger.show();
            $hamburger.removeClass("is-active");
            $handsVideoMobile.show();
            $handsVideoMobile[0].play();
        }
    });
}); //END DOM ready

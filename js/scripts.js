//DOM ready
$(() => {
    // ** Variables ** //
    const $header = $("header");
    const $main =$("main");
    const $enterPageBtn = $("#enterPageBtn");
    const $enterPageLogo = $("#enterPageLogo");
    const $hamburger = $(".hamburger");
    const $nav = $("nav");
    const $logoBtn = $("#logoBtn");
    const $discoverFremmedBtn = $("#discoverFremmedBtn");
    const $homeBtn = $("#homeBtn");
    const $handsVideo = $(".handsVideo");
    const $handsVideoMobile = $('#handsVideoMobile');
    const $handsVideoWeb = $('#handsVideoWeb');
    const $videoBox = $('#video_player_box');
    const $playDeidreBtn = $("#playDeidreBtn");
    const $deidreVideo = $('.deidreVideo');
    const $videoControls = $(".videoControls");
    const $fullscreenBtn = $("#fullscreenBtn");
    const $pauseBtn = $("#pauseBtn");
    const $playBtn = $("#playBtn");
    const $muteBtn = $("#muteBtn");
    const $loudBtn = $("#loudBtn");
    let $progressBar = $('.progressBar');
    let $timeBar = $('#timeBar');
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

    // ** Enter page button ** //
    $enterPageBtn.click(function(){
        $(this).hide();
        $homeBtn.hide();
        $discoverFremmedBtn.show();
        $main.show();
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
    });

    // ** Logo button ** //
    $logoBtn.click(function(){
        $main.hide();
        $enterPageBtn.show();
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
        $duration.text($deidreVideo[0].duration);
    });

    //update HTML5 video current play time
    $deidreVideo.on('timeupdate', function() {
        $current.text($deidreVideo[0].currentTime);
    });

    $deidreVideo.on('timeupdate', function() {
        var currentPos = $deidreVideo[0].currentTime; //Get currenttime
        var maxduration = $deidreVideo[0].duration; //Get video duration
        var percentage = 100 * currentPos / maxduration; //in %
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
        var progress = $('.progressBar');
        var maxduration = $deidreVideo[0].duration; //Video duraiton
        var position = x - progress.offset().left; //Click pos
        var percentage = 100 * position / progress.width();

        //Check within range
        if(percentage > 100) {
            percentage = 100;
        }
        if(percentage < 0) {
            percentage = 0;
        }

        //Update progress bar and video currenttime
        $('.timeBar').css('width', percentage+'%');
        $deidreVideo[0].currentTime = maxduration * percentage / 100;
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
        if($deidreVideo[0].played) {
            $deidreVideo[0].pause();
        }
        $(this).hide();
        $handsVideo.hide();
        $logoBtn.show();
        $homeBtn.show();
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

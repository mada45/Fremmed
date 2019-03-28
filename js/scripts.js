//DOM ready
$(() => {
    //Initialise variables
    var $enterPageBtn = $("#enterPageBtn");
    var $header = $("header");
    var $nav = $("nav");
    var $hamburger = $(".hamburger");
    var $breadcrumbItem = $('.breadcrumbItem');
    var $watchNowBtn = $("#watchNowBtn");
    var $videoContainer = $('#videoContainer');
    var $videoPlayer = $ ("#videoPlayer");
    var $playVideoBtn = $('#playVideoBtn');
    var $pauseVideoBtn = $('#pauseVideoBtn');
    var $exitVideoBtn = $("#exitVideoBtn");
    var $backgroundImage = $("body");

    //Hide elements before entering homepage
    $header.addClass('hide');
    $nav.addClass('hide');
    $watchNowBtn.addClass('hide');
    $videoContainer.addClass('hide');

    //Enter page
    $enterPageBtn.click(function(){
        $header.removeClass('hide');
        $watchNowBtn.removeClass('hide');
        $backgroundImage.addClass('set-background');
        $(this).hide();
    });

    //Burger menu
    $hamburger.click(function(){
        $hamburger.toggleClass("is-active");
        $nav.show();
        $nav.toggleClass('hide');
    });

    //Watch Now
    $watchNowBtn.click(function(){
        $(this).hide();
        $header.hide();
        $exitVideoBtn.show();
        $backgroundImage.removeClass('set-background');
        $videoContainer.removeClass('hide');
        $videoContainer.addClass('slide-fwd-center');
        if($videoPlayer[0].paused) {
            $videoPlayer[0].play();
        }
    });

    //Play video
    $playVideoBtn.on('click', function() {
        if($videoPlayer[0].paused) {
            $videoPlayer[0].play();
        }
    });

    //Pause video
    $pauseVideoBtn.on('click', function() {
        if($videoPlayer[0].play) {
            $videoPlayer[0].pause();
        }
    });

    var timeDrag = false;
    $('.progressBar').mousedown(function(e) {
        timeDrag = true;
        updatebar(e.pageX);
    });
    $(document).mouseup(function(e) {
        if(timeDrag) {
            timeDrag = false;
            updatebar(e.pageX);
        }
    });
    $(document).mousemove(function(e) {
        if(timeDrag) {
            updatebar(e.pageX);
        }
    });

    //Display time duration
    $videoPlayer.on('loadedmetadata', function() {
        $('.duration').text($videoPlayer[0].duration);
    });

    //Display current play time
    $videoPlayer.on('timeupdate', function() {
        $('.current').text($videoPlayer[0].currentTime);
        var currentPos = $videoPlayer[0].currentTime;
        var maxduration = $videoPlayer[0].duration;
        var percentage = 100 * currentPos / maxduration;
        $('.timeBar').css('width', percentage+'%');
    });

    //Exit video
    $exitVideoBtn.click(function(){
        $(this).hide();
        $header.show();
        $watchNowBtn.show();
        $videoContainer.addClass('hide');
        $videoContainer.removeClass('slide-fwd-center');
        $backgroundImage.addClass('set-background');
        if($videoPlayer[0].play) {
            $videoPlayer[0].pause();
        }
    });

    //Update Progress Bar control
    var updatebar = function(x) {
        var progress = $('.progressBar');
        var maxduration = $videoPlayer[0].duration;
        var position = x - progress.offset().left;
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
        $videoPlayer[0].currentTime = maxduration * percentage / 100;
    };

}); //END DOM ready
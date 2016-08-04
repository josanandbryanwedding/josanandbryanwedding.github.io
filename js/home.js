var main = {} || "";

main.init = function(){
    main.onNavbarScroll();
    main.onBurgerMenuClick();
    main.onIconTransition();
    main.initCountDown();
    main.onMenuClick();
    main.onClickBrandLogo();
    main.onClickIntroButton();
    main.onFormSubmit();
    setTimeout(function(){
        main.instagramFeed();
    }, 3000);
}

main.instagramFeed = function () {
    $.getScript('/js/instafeed.min.js', function () {
        if (Instafeed) {
            new Instafeed({
                get: 'user',
                userId: '3257918608',
                accessToken: '3257918608.1677ed0.9f949224876042d4b60ecc07c66bb24a',
                limit: 9,
                sortBy: 'most-recent',
                orientation: 'square',
                template: '<a href="{{link}}" target="_blank" class="col-md-2 col-sm-2 col-xs-6"><img src="{{image}}" /></a>',
                resolution: 'standard_resolution',
                success: function(feed){
                    var data = feed.data.reverse();
                    $('.placeholder').each(function(index, placeholder){
                        var model = data.pop();
                        $(placeholder).html(
                            '<a class="image-link" href="'+ model.link +'" target="_blank">'
                            + '<img src="'+ model.images.standard_resolution.url +'" />'
                            + '</a>').hide().fadeIn();
                    });
                }
            }).run();
        }
    });
};

main.onFormSubmit = function (){
    $("#form-content").submit(function(){
        $("#ss-submit").attr("disabled", true);
        setTimeout(function(){
            $("#ss-submit").attr("disabled", false);
        }, 1000);
    });

    $("#hidden_iframe").on('load',function () {
        $("#myModal").modal('show');
        $("#form-content")[0].reset();
        setTimeout(function(){
            $("#myModal").modal('hide');
        }, 2000);
    });
};

main.onClickIntroButton = function(){
    var introButton = $('#cover .intro-text-container .intro-header .intro-button');
    $(function() {
        $(introButton).click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: $($(this).attr('href')).offset().top - 40
                    }, 700);
                    return false;
                }
            }
        });
    });
};

main.onClickBrandLogo = function(){
    var brandlogo = $('nav.navbar-default .container .navbar-header .navbar-brand');
    $(function() {
        $('brandlogo').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: $($(this).attr('href')).offset().top
                    }, 700);
                    return false;
                }
            }
        });
    });
};

main.onMenuClick = function(){
    $(document).on("scroll", onScroll);
    
    $('.navbar-menu a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active-menu');
        })
        $(this).addClass('active-menu');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 80
        }, 700, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });

    function onScroll(event){
        var scrollPos = $(document).scrollTop() + 96;
        $('.navbar-menu a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top  + refElement.height() > scrollPos) {
                $('.navbar-menu a').removeClass("active-menu");
                currLink.addClass("active-menu");
            }
            else{
                currLink.removeClass("active-menu");
            }
        });
    }
};

main.onNavbarScroll = function(){
    $(window).scroll(function() {
        if ($(document).scrollTop() > 50 && $(document).width() >= 992) {
            $('nav').addClass('navbar-shrink');
        }

        else if ($(document).width() <= 991){
            $('nav').addClass('navbar-shrink');
        }
        else {
            $('nav').removeClass('navbar-shrink');
        }
    });

    if ($(document).width() <= 991) {
        $('nav').addClass('navbar-shrink');
    }
}

main.onBurgerMenuClick = function(){

    $('.toggle-menu').jPushMenu({closeOnClickLink: false});
    $('.dropdown-toggle').dropdown();

}
main.onIconTransition = function() {
    $('#icon-transition').on('click', function () {
        $(this).toggleClass('open');
    });
}

main.initCountDown = function(){
    $('.countdown').final_countdown({
        start: new Date("April 29, 2016 12:41:00").getTime() / 1000,
        end: new Date("May 22, 2016 2:00:00").getTime() / 1000,
        now: new Date().getTime() / 1000,
        seconds: {
            borderColor: 'white',
            borderWidth: '6'
        },
        minutes: {
            borderColor: 'white',
            borderWidth: '6'
        },
        hours: {
            borderColor: 'white',
            borderWidth: '6'
        },
        days: {
            borderColor: 'white',
            borderWidth: '6'
        }
    });
}

$(function(){
    main.init();
});
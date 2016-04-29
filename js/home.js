var main = {} || "";

main.init = function(){
    main.onNavbarScroll();
    main.onBurgerMenuClick();
    main.onIconTransition();
    main.initCountDown();
    main.onMenuClick();
    main.onClickBrandLogo();
    main.initGoogleMap();
}

main.initGoogleMap = function(){
    var mapLocation = {lat: 14.370429, lng: 121.008782};
    var customMapType = new google.maps.StyledMapType([
        {
            featureType: 'road',
            stylers: [
                {visibility: 'simplified'},
                {gamma: 0.5},
                {weight: 0.5},
                { hue: "#333333" }
            ]
        },
        {
            elementType: 'labels',
            stylers: [{visibility: 'on'}]
        },
        {
            featureType: 'water',
            stylers: [{color: '#2d2d2d'}]
        }
    ], {
        name: 'Custom Style'
    });
    var customMapTypeId = 'custom_style';

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: mapLocation,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
        }
    });

    var image = '/img/map-icon/century.png'

    var marker = new google.maps.Marker({
        position: mapLocation,
        map: map,
        center: mapLocation,
        icon: image
    });

    map.mapTypes.set(customMapTypeId, customMapType);
    map.setMapTypeId(customMapTypeId);

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
    $(function() {
        $('.navbar-menu a[href*="#"]').click(function() {
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

main.onNavbarScroll = function(){
    $(window).scroll(function() {
        if ($(document).scrollTop() > 50 && $(document).width() >= 992) {
            $('nav').addClass('navbar-shrink');
        } else {
            $('nav').removeClass('navbar-shrink');
        }
    });
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
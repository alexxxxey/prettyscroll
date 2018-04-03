$(function() {
    var defaults = {
        speed: '2000',
        exclude: {},
        adaptive: true,
        animation: 'swing',
        offset: 0
    };

    var options;

    var $prettyScroll = $.prettyScroll = function( params ){
        $(window).prettyScroll( params );
    };


    $.fn.prettyScroll = function(params) {
        options = $.extend({}, defaults, params);

        if(window.location.hash) {
            toscroll_obj = _getToScrollObj(window.location.hash.replace('#', ''));

            if(toscroll_obj.length>0) {
                orig_hash = window.location.hash;
                window.location.hash = "";
                _prettyScroll(toscroll_obj, false, function() { window.location.hash = orig_hash; } );

            }
        }

        $('a[href*=#]').not(options.exclude).click(function(e){
            elem_from = $(this);

            future_href = elem_from[0].href.split("#");
            current_href = $(location).attr('href').split("#");


            toscroll_obj = _getToScrollObj(future_href[1]);

            if(current_href[0] == future_href[0] && toscroll_obj.length > 0 ) {

                _prettyScroll(
                    toscroll_obj,
                    elem_from,
                    function() { window.location.hash=future_href[1]; }
                 );

                e.preventDefault();
            }
        });


        function _getToScrollObj(anchor) {
            if(anchor.length>0) {

                toscroll_obj = $('[name="'+anchor+'"], [id="'+anchor+'"]').not(options.exclude);
                if(toscroll_obj.length>0) {
                    return toscroll_obj;
                }
            }

            return false;
        };

        function _prettyScroll(elem_to, elem_from, callback) {
                pixels = elem_to.offset().top;
                speed = options.speed;
                offset = options.offset;

                if(pixels > $(document).height() - window.innerHeight) pixels = $(document).height() - window.innerHeight;

                if(options.adaptive == true) {
                    pixels_from = $('body').scrollTop();
                    speed = parseInt(Math.abs(pixels - pixels_from) / 1000 * speed);
                }


                $('html, body').animate({
                    scrollTop: pixels - offset
                }, speed, options.animation, callback);
        };


        return this;
    };

});

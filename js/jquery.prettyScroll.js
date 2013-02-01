(function($) {
    var defaults = {
        speed: '2000',
        exclude: {},
        adaptive: true,
        animation: 'swing' // swing or linear defaults
    };

    var options;

    var $prettyScroll = $.prettyScroll = function( params ){
        $(window).prettyScroll( params );
    };


    $.fn.prettyScroll = function(params) {
        options = $.extend({}, defaults, params);

        if(window.location.hash) {
            elem_to = $('[name="'+window.location.hash.replace('#', '')+'"]').not(options.exclude);
            if(elem_to.length>0) {
                window.location.hash = '';
                _prettyScroll(
                    elem_to,
                    false,
                    function() {
                        window.location.hash = elem_to.attr('name');
                    }
                );
            }
        }


        $('a[href*=#]').not(options.exclude).click(function(e){
            elem_from = $(this);

            future_href = elem_from[0].href.split("#");
            current_href = $(location).attr('href').split("#");

            if(current_href[0] == future_href[0]) {

                _prettyScroll(
                    $('a[name='+future_href[1]+']'),
                    elem_from,
                    function() { window.location.hash=future_href[1]; }
                 );
                e.preventDefault();
            }

        });


        function _prettyScroll(elem_to, elem_from, callback) {
            pixels = elem_to.offset().top;

            speed = options.speed;
            if(options.adaptive == true) {
                if(elem_from == false) pixels_from = 0;
                else pixels_from = elem_from.offset().top;
                speed = Math.abs(pixels - pixels_from) / 4000 * speed;
            }


            if(pixels > $(document).height() - window.innerHeight) pixels = $(document).height() - window.innerHeight;

            $('body, html').animate({
                scrollTop: pixels
            }, speed, options.animation, callback);

        }
        return this;
    };
})(jQuery);

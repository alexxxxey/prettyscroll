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
                orig_elem_to_name = elem_to.attr('name')

                // save real anchor name
                elem_to.data('orig_name', orig_elem_to_name );

                // change name to avoid anchor standart jump
                elem_to.attr('name', '_'+orig_elem_to_name );

                $(window).load(function() {
                    _prettyScroll(
                        elem_to,
                        false,
                        function() {
                            // change to real anchor name
                            elem_to.attr('name', elem_to.data('orig_name') );
                        }
                    );
                });
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

                if(pixels > $(document).height() - window.innerHeight) pixels = $(document).height() - window.innerHeight;

                if(options.adaptive == true) {
                    pixels_from = $('body').scrollTop();
                    speed = parseInt(Math.abs(pixels - pixels_from) / 1000 * speed);
                }


                $('html, body').animate({
                    scrollTop: pixels
                }, speed, options.animation, callback);
        }
        return this;
    };
})(jQuery);

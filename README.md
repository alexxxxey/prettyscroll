prettyScroll
============
jquery.prettyScroll.js is a jQuery plugin, which implements pretty page scrolling to HTML anchor (<a name="..."></a>).

Plugin supports both smooth page scrolling, when anchor are placed in the same page or anchor is placed on different page (raise page refresh).
Plugin can be inserted on page without any source code modifications, like adding special classnames to tags, etc.
Plugin doesn't modify HTML code, doesn't delete link hashes.

## Usage
1. Include into page jQuery and prettyScroll files like this:
`
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/jquery.prettyScroll.js"></script>
`
2. Simply call prettyScroll function, for example:
`
        <script type="text/javascript">
            $(function() {
                $.prettyScroll();
            });
        </script>
`
3. If all are right, now your standart anchor jumps will be animated by scrolling.

## Features
###Parameters by default:
*speed: '2000' - animation speed;
*exclude: {} - basically, plugin works on all links with anchors in page. If you need stay some links standart anchor behavior you can do this by pass parametrs to *exclude* option:
`
$.prettyScroll({
    exclude: 'a.no_scroll'
});
`
or
`
$.prettyScroll({
    exclude: $('a.no_scroll, a.no_class')
});
`

*adaptive: true - if adaptive true, animation speed calculates by speed = <pixels_to_object> / 4000 * speed;
*animation: swing - animation type. Supports swing / linear;


## Demo
[Demo page](http://www.trialine.lv/prettyScroll/demo.html)
=======
jQuery plugin, hat implements the smooth scroll to HTML anchor
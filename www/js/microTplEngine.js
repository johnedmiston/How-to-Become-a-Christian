// From https://gist.github.com/tsi/5137145
// By tsi

(function($) {
 
  // My micro jQuery templating engine
  // Usage:
  //
  //    <section data-html="content"></section>
  //
  // Will load <content.html> into <section>
 
  $(document).ready(function() {
 
    // Load external contents
    $("[data-html]").each(function() {
      el = $(this);
      var src = "content/" + $(this).attr("data-html") + ".html";
      el.load(src);
    });
 
  });
})(jQuery);
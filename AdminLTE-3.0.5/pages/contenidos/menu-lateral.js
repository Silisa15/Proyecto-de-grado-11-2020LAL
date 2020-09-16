$(function(){
    var includes = $('[data-include]');
    jQuery.each(includes, function(){
      
      var file = $(this).data('include') + '.html';
      $(this).load(file, function (params) {
        links = $(document).find('.nav-item a');
        links.each(function () {
          if (document.location.pathname == '/index.html') {
            $(this).attr('href', 'pages/' + $(this).attr('href'));
          }else{
            $(this).attr('href', '../' + $(this).attr('href'));
          }

        });
      });
    });
});
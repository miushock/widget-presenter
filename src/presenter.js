define(['domReady!','jquery', 'freelog_api','reveal'],  function(doc, $, freelog_api, reveal){
  var presenter = {};

  presenter.toplevel_node = $('#presenter');
  presenter.wrapper_node = $('#presenter .slides-wrapper');
  presenter.current_slide = '';

  presenter.refresh = function (){
    if (presenter.current_slide !== '') {
      freelog_api.getResource(presenter.current_slide, function(slide_content){
        $('#presenter .slides-wrapper .reveal .slides').html(slide_content);
        reveal.initialize({
          controls: true,
          progress: true,
          history: true,
          center: true,
          wrapper: presenter.wrapper_node[0],
          transition: 'slide', 
        });
      });
    }
  }

  presenter.init = function () {
    freelog_api.getResources('reveal_slide', function(resources){
      if (resources === null) {
        throw new TypeError ('resources list is null')
      }

      var size = resources.length;
      var slide_list = $('#presenter .control-wrapper .slide-list');
      slide_list.attr('size', size);

      //list all slides a node can present
      resources.forEach(function(resource, index, array){
        slide_list.append($('<li>')
        .attr('data-rid', resource.resource_id)
        .addClass('slide-list-item')
        .text((function(resource){
          if (resource.name !== null && resource.name !== ''){
            return resource.name;
          }
          else {
            return resource.resource_id.substring(0,5);
          }
        })(resource))
        )
      }); 

      //bind click event on each list item
      $('#presenter .control-wrapper .slide-list .slide-list-item').click(function(){
        presenter.current_slide = $(this).data('rid');
        presenter.refresh();
      });

    });
  };

  presenter.init();

  return presenter;
});

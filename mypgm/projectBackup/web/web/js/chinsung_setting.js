
/** UI 설정 */
$(function() {
  $("#itemBoxWrap").sortable({
      placeholder:"itemBoxHighlight",
      start: function(event, ui) {
          ui.item.data('start_pos', ui.item.index());
          $("#content").css('background-color','black');
      },
      stop: function(event, ui) {

          var spos = ui.item.data('start_pos');
          var epos = ui.item.index();
          reorder();
      }
  });
  //$("#itemBoxWrap").disableSelection();
  
  $( "#sortable" ).sortable();
  $( "#sortable" ).disableSelection();
});

/** 아이템 순서 조정 */
function reorder() {
  
  $(".itemBox").each(function(i, box) {
      $(box).find(".itemNum").html(i + 1);
  });
}

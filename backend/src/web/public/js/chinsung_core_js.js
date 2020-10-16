$(function() {
  $(window).on('beforeunload', function() {
    return "이 페이지를 벗어나면 데이터가 초기화 됩니다.";
  });
});
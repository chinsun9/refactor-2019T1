// 제이쿼리를 이용한 ctrl + F... 구현. 출처 : http://blog.nachal.com/775
$("button[name='btnContSrch']").unbind('click').click(searchh);
$('#mySearch').keypress(function(event){
  if ( event.which == 13 ) {
    $("button[name='btnContSrch']").click();
    return false;
  }
});
function searchh(){
  var strContSrch=$('input[name="txtContSrch"]').val();
  // alert(strContSrch.length);
  
  if(strContSrch==0){
    alert('검색어를 입력하세요.');
    $('input[name="txtContSrch"]').focus();
    return false;}
  if(navigator.appName.indexOf("Microsoft")<0){
    if(!window.find(strContSrch,false,false,true,false,false,true)){
    }
    return false;
  }
  bodySearchAll('body'/*bodySideContent*/,strContSrch,'txtContSrch'/*bdySearch 버튼*/, 'down'/*chkMode*/);
  return false;
}

function open_chatroom(){
  var windowWidth = $( window ).width();
  if(windowWidth < 500) {
    console.log(windowWidth)
    $("#sidebarToggleTop")[0].click();
  } 
}

open_chatroom()
  // 출처: https://kkotkkio.tistory.com/52 [KKOTKKIO'S CAVE]
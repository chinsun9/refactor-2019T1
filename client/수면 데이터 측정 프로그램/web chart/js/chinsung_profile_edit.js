$(".switch span").click(function() {
  $(".switch span").html($(".switch span").html() == 'M' ? 'W' : 'M');

  

  
  document.getElementById('myField').value = ($(".switch span").html() == 'M' ? '0' : '1');//
  // console.log(document.getElementById('myField').value);
});

$("#content > div > div > form > div:nth-child(2) > div > div > label").click(function() {
  var res1 = $("#customCheck").is(":checked");
  console.log(res1);
  
  if(res1){
    
    document.getElementById('myField2').value = 0;
  }
  else{

    document.getElementById('myField2').value = 1;
  }
  // console.log(document.getElementById('myField').value);
});


$("body > div > div > div > div > div.col-lg-7 > div > form > div:nth-child(5) > div > div > label").click(function() {
  var res = $("#customCheck").is(":checked");
  console.log("asds"+res);
  
  if(res){
    
    document.getElementById('myField2').value = 0;
  }
  else{
    document.getElementById('myField2').value = 1;
  }
  
  console.log(document.getElementById('myField2').value);
  // console.log(document.getElementById('myField').value);
});

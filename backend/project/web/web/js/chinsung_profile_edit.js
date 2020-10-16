$(".switch span").click(function () {
  $(".switch span").html($(".switch span").html() == 'M' ? 'W' : 'M');

  if ($(".switch span").html() == 'M') {
    $(".switch span").addClass('blue');
  } else {
    $(".switch span").removeClass('blue');
  }


  document.getElementById('myField').value = ($(".switch span").html() == 'M' ? '0' : '1');//
  // console.log(document.getElementById('myField').value);
});

$("#content > div > div > form > div:nth-child(2) > div > div > label").click(function () {
  var res1 = $("#customCheck").is(":checked");
  console.log(res1);

  if (res1) {

    document.getElementById('myField2').value = 0;
  }
  else {

    document.getElementById('myField2').value = 1;
  }
  // console.log(document.getElementById('myField').value);
});

// 레지스트의 성별 토글
$("body > div > div > div > div > div.col-lg-7 > div > form > div:nth-child(5) > div > div > label").click(function () {
  var res = $("#customCheck").is(":checked");
  console.log("asds" + res);

  if (res) {

    document.getElementById('myField2').value = 0;
  }
  else {
    document.getElementById('myField2').value = 1;
  }

  console.log(document.getElementById('myField2').value);
  // console.log(document.getElementById('myField').value);
});

//프로필 에딧의 성별 토글

$("#content > div > div > form > div:nth-child(3) > div").click(function () {
  var res = $("#customCheck").is(":checked");
  // console.log("asds" + res);

  if (res) {
    document.getElementById('myField2').value = 1;
  }
  else {
    document.getElementById('myField2').value = 0;
  }

  console.log("res : " + document.getElementById('myField2').value);
  // console.log(document.getElementById('myField').value);
});

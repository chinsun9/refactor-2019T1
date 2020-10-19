

//////////////////////////////////////// json 파일 불러오기 ////////////////////////////////////////
// 파일열기
function openTextFile() {
  var input = document.createElement("input");
  $("#page-top > div > button").css("background-color", "white")  //버튼 색 변경
  $("#page-top > div > button").css("color", "black")  //버튼 색 변경

  input.type = "file";
  input.multiple = "multiple"
  input.name = "fileNames[]"
  input.accept = ".json"; // 확장자가 xxx, yyy 일때, ".xxx, .yyy"

  input.onchange = function (event) {
    var chs_file = event.target.files
    processFile(chs_file);

    document.getElementsByTagName("title")[0].innerHTML = "" // 타이틀 초기화
    for (var i = 0; i < 1; i++) {
      // console.log(i)
      document.getElementsByTagName("title")[0].innerHTML += chs_file.length + "] " + chs_file[i].name + "등 " + chs_file.length + "개 파일 모아보기"
    }
  };

  input.click();
}

// 파일처리 ; 피드백
function processFile(files) {


  var numFile = files.length;
  // console.log(numFile)

  if (numFile < 1) return;    // 아무것도 안불러왔다면 바로 종료

  // 기존에 불러온 데이터 날림
  var existingData = document.getElementsByName("myData[]")
  console.log("기존" + existingData.length)
  if (existingData != null) {

    // 기존 데이터를 품고있는 박스 날리기
    output.remove();

    // 다시 생성하기
    var parentBox = $("#page-top > div:nth-child(2)")[0]  // 부모노드 지정
    // console.log(parentBox)

    var outputBox = document.createElement("input");
    outputBox.setAttribute("id", "output");
    outputBox.setAttribute("type", "hidden");
    outputBox.setAttribute("name", "dataSet");
    parentBox.appendChild(outputBox)
  }

  // 불러온 파일들을 포이치로 처리
  $.each(files, function (index, file) {
    // console.log(file)
    const reader = new FileReader();
    reader.onload = function (e) {
      // output컨테이너안에 파일 내용 저장
      var Box = document.createElement("div");
      Box.setAttribute("id", file.name);
      Box.setAttribute("style", "display:none")    // 눈에 안보이게
      Box.setAttribute("name", "myData[]")
      output.appendChild(Box);

      Box.innerHTML = e.target.result;
    }
    reader.readAsText(file, 'euc-kr');
  });

  // 피드백
  $("#page-top > div > button").css("background-color", "green")  //버튼 색 변경
  $("#page-top > div > button").css("color", "white")  //버튼 색 변경
  $("#selectBox").css("display", "")

  helpMsg.innerHTML = "";
  noData = false;


  console.log("load Done")
}
//////////////////////////////////////// json 파일 불러오기 ////////////////////////////////////////

//전역 변수
var labels = new Array()     // 그래프 그리는 라벨
var bpData = new Array()     // 그래프로 그려지는 데이터
var bpDataName = new Array()     // 그래프로 그려지는 데이터의 이름
var helloColor = new Array()

helloColor[20] = "rgba(233, 134, 127, 0)"

var originColor = [
  "rgba(133, 152, 194, 1)",
  "rgba(174, 145, 184, 1)",
  "rgba(130, 167, 153, 1)",
  "rgba(231, 206, 109, 1)",
  "rgba(233, 134, 127, 1)"]


var dataKeyString = ["DELTA", "THETA", "ALPHA", "BETA", "GAMMA"]
var noData = true;

/// 여기부터 궁극의 전역변수////
var ARR_ORIGINAL_DATA
var NUM_FILE
var INTERVAL_SECOND
var NUM_MAX_SET
/// 여기부터 궁극의 전역변수////



/// 여기부터 사용자 정의 함수////

function getColor(str){
  var i;
  switch (str) {
    case "DELTA":
      var i = 0
      break;
    case "THETA":
      var i = 1
      break;

    case "ALPHA":
      var i = 2
      break;
    case "BETA":
      var i = 3
      break;
    case "GAMMA":
      var i = 4
      break;
  }
  return originColor[i]
}

function cl(str){ // 콘솔로그
  console.log(str)
}


function ratioArr(arr){
  var res=[]
  for(var i=0;i<arr.length;i++){
    res[i] = arr[i] / (bpData[0][i] + bpData[1][i] + bpData[2][i] + bpData[3][i] + bpData[4][i]) * 100
  }
  res[0]=100
  return res
}

function subArr(arrA, arrB){
  var res = []

  for(var i=0;i<arrA.length;i++){
    res[i] = arrA[i] - arrB[i]
  }
  return res
}

// 특정시간동안 평균
function avergaeSubArr(arrA, arrB){
  var temp_average = new Array()
  var sum = 0   // 합계
  var q = 0     // 새로운 배열 인덱스
  var temp = 0  // 간격 카운트하는 변수
  for (var j = 0; j < arrA.length; j++) {
    sum += arrA[j] - arrB[j];
    if (j - temp >= INTERVAL_SECOND) { // INTERVAL_SECOND 마다 평균 계산
      temp_average[q++] = (sum / INTERVAL_SECOND)
      sum = 0;
      temp = j
      j = j - parseInt(INTERVAL_SECOND / 5)   //j를 조금 뒷부분으로 보내서 겹치도록
    }
  }
  console.log(temp_average)
  return temp_average
}

function avergaeArr(arr){
  var temp_average = new Array()
  var sum = 0   // 합계
  var q = 0     // 새로운 배열 인덱스
  var temp = 0  // 간격 카운트하는 변수
  for (var j = 0; j < arr.length; j++) {
    sum += arr[j]
    if (j - temp >= INTERVAL_SECOND) { // INTERVAL_SECOND 마다 평균 계산
      temp_average[q++] = (sum / INTERVAL_SECOND)
      sum = 0;
      temp = j
      j = j - parseInt(INTERVAL_SECOND / 5)   //j를 조금 뒷부분으로 보내서 겹치도록
    }
  }
  console.log(temp_average)
  
  temp_average[0]=100
  return temp_average
}

//체크박스 제조기
function createChkBox(){
  var parentBox = document.getElementById("helpMsg")


  for(var i =0;i<bpData.length;i++){


    var label = document.createElement("label");
    var newContent = document.createTextNode(bpDataName[i]); 

    label.appendChild(newContent)

    var node = document.createElement("input");
    

    node.setAttribute("type", "checkbox");
    node.setAttribute("id", `chkbox${i}`);
    label.setAttribute("for",`chkbox${i}`)
    node.setAttribute("checked","checked");
    node.setAttribute("value", i);
    node.setAttribute("onclick", "chkBox(this)");
    parentBox.appendChild(node)
    parentBox.appendChild(label);
  }
}

//라벨 만들기(1시간 단위)
function createLabel(arr){
  var timeArr = new Array();
  for (var iq = 0; iq < arr.length; iq++) {
    timeArr[iq] = parseInt(iq / 60 / 60);
  }
  return timeArr
}



// 체크박스 클릭시
function chkBox(box) {
  var a = document.getElementById("myAreaChartBox" + box.value)
  a.classList.toggle("hide");
}
/// 여기부터 사용자 정의 함수////

// 카드 클릭시
function cardClick(choice) {
  // option값 
  // 0 ; 모두보기
  // 1 ; sub 결과
  // 2 ; 델타 비율보기
  // 10~14; 델쎄알베감

  helpMsg.innerHTML = ""

  if (noData) {
    alert("파일을 불러와 주세요")
    return
  }

  if (choice != 0) {
    alert("미구현")
    return
  }
  else {
    //여기부터 실시간 분석용 알고리즘

    // 배열 원본데이터            originData
    // 가공해서 보여줄 데이터 배열 bpData

    // helpMsg.innerHTML = "순서대로<br> 베타-알파<br>델타-세타"

    console.log("작업중")

    //인터벌 초기화
    INTERVAL_SECOND = $("#intervalSecond")[0].value;

    bpData = [] //배열 초기화
    labels = [] //배열 초기화
    ARR_ORIGINAL_DATA = document.getElementsByName("myData[]")
    NUM_FILE = ARR_ORIGINAL_DATA.length   // 불러온 파일 갯수

    // cl(ARR_ORIGINAL_DATA)
    // cl(NUM_FILE)


    // 이것은 불러운 파일 개수 반복
    for (var i = 0; i < NUM_FILE; i++) {
      var idx = 0

      // 데이터 셋 처리
      var dataSetParse = JSON.parse(ARR_ORIGINAL_DATA[i].innerHTML);  // 불러온 파일에서


      // 델쎄알베감
      var arr_delta = bpData[idx] = dataSetParse.data[0].DELTA  //데이터 
      bpDataName[idx] = dataKeyString[0]                  // 이름
      helloColor[idx++] = getColor(dataKeyString[0])      // 그래프 색
      var arr_theta = bpData[idx] = dataSetParse.data[1].THETA
      bpDataName[idx] = dataKeyString[1]             
      helloColor[idx++] = getColor(dataKeyString[1]) 
      var arr_alpha = bpData[idx] = dataSetParse.data[2].ALPHA
      bpDataName[idx] = dataKeyString[2]             
      helloColor[idx++] = getColor(dataKeyString[2]) 
      var arr_beta = bpData[idx] = dataSetParse.data[3].BETA
      bpDataName[idx] = dataKeyString[3]             
      helloColor[idx++] = getColor(dataKeyString[3]) 
      var arr_gamma = bpData[idx] = dataSetParse.data[4].GAMMA
      bpDataName[idx] = dataKeyString[4]             
      helloColor[idx++] = getColor(dataKeyString[4]) 

      // 델쎼알베감 비율
      bpData[idx] = avergaeArr(arr_delta)
      bpDataName[idx] = dataKeyString[0]      + "비율"          
      helloColor[idx++] = getColor(dataKeyString[0]) 
      bpData[idx] = avergaeArr(arr_theta)
      bpDataName[idx] = dataKeyString[1]    + "비율"         
      helloColor[idx++] = getColor(dataKeyString[1]) 
      bpData[idx] = avergaeArr(arr_alpha)
      bpDataName[idx] = dataKeyString[2]     + "비율"           
      helloColor[idx++] = getColor(dataKeyString[2]) 
      bpData[idx] = avergaeArr(arr_beta)
      bpDataName[idx] = dataKeyString[3]       + "비율"         
      helloColor[idx++] = getColor(dataKeyString[3]) 
      bpData[idx] = avergaeArr(arr_gamma)
      bpDataName[idx] = dataKeyString[4]         + "비율"       
      helloColor[idx++] = getColor(dataKeyString[4]) 


      // 베타-알파
      bpData[idx] = subArr(arr_beta,arr_alpha)
      bpDataName[idx] = "베타-알파"            
      helloColor[idx++] = "rgb(255, 36, 36)"


      // 델타-세타
      bpData[idx] = subArr(arr_delta,arr_theta)
      bpDataName[idx] = "델타-세타"            
      helloColor[idx++] = "rgba(245, 173, 40,0.9)"


      // 베타-알파
      bpData[idx] = avergaeSubArr(arr_beta,arr_alpha)
      bpDataName[idx] = "베타-알파 " + INTERVAL_SECOND+"평균"
      helloColor[idx++] = "rgb(54, 160, 0)"

      
      // 델타-세타
      bpData[idx] = avergaeSubArr(arr_delta,arr_theta)
      bpDataName[idx] = "델타-세타 " + INTERVAL_SECOND+"평균"
      helloColor[idx++] = "rgb(64, 160, 0)"

      


      // 라벨

      // var tempLabel = createLabel(bpData[idx-1])
      labels[i] = createLabel(bpData[i])


      NUM_MAX_SET = idx+1 



      // // 30씩 분할해서 저장하기
      // var temp_average = new Array()
      // var temp_average2 = new Array()
      // var sum = 0
      // var q = 0

      // var temp = 0
      // for (var j = 0; j < arr_beta.length; j++) {
      //   sum += arr_beta[j] - arr_alpha[j];
      //   if (j - temp >= INTERVAL_SECOND) { // INTERVAL_SECOND 마다 평균 계산
      //     temp_average[q++] = (sum / INTERVAL_SECOND)
      //     sum = 0;
      //     temp = j
      //     j = j - parseInt(INTERVAL_SECOND / 5)   //j를 조금 뒷부분으로 보내서 겹치도록
      //   }
      //   bpData[i] = temp_average
      //   bpDataName[i] = "베타-알파"
      // }

      // temp_average = []


      // sum = 0
      // q = 0
      // temp = 0
      // for (var j = 0; j < arr_beta.length; j++) {
      //   sum += arr_delta[j] - arr_theta[j];
      //   if (j - temp >= INTERVAL_SECOND) { // INTERVAL_SECOND 마다 평균 계산
      //     temp_average2[q++] = (sum / INTERVAL_SECOND)
      //     sum = 0;
      //     temp = j
      //     j = j - parseInt(INTERVAL_SECOND / 5)   //j를 조금 뒷부분으로 보내서 겹치도록
      //   }
      //   bpData[i + 1] = temp_average2
      //   bpDataName[i+ 1] = "델타-세타"
      // }
    }


    // 라벨만들기
    // for (var idx = 0; idx < NUM_FILE; idx++) {
    //   var timeArr = new Array();
    //   for (var i = 0; i < bpData[idx].length; i++) {
    //     timeArr[i] = i * INTERVAL_SECOND;
    //   }
    //   labels[idx] = timeArr
    // }

    chartName.innerHTML = "종합 보기 결과"
    drawChart()
    createChkBox()
    return
  }
}

function trimData3(data, trim) {
  if (trim) {
    if (data >= 76) {
      data *= 100
    }
    else if (data >= 33) {
      data *= 10
    }
  }
  return data
}




///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////



// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}
function drawChart() {

  // 캔버스 초기화가 안되서 그냥 삭제하고 다시생성..
  var box
  // 초기값이냐 아니냐에 따라..
  if (document.getElementById("myAreaChartBox") == null) {
    box = document.getElementById("myAreaChartBox0").parentNode;

    var numChartBox = document.getElementsByClassName("card-body")[0].childElementCount
    for (var idx = 0; idx < numChartBox; idx++) {
      document.getElementById("myAreaChartBox" + idx).remove()
    }
  }
  else {
    box = document.getElementById("myAreaChartBox").parentNode;
    document.getElementById("myAreaChartBox").remove()
  }



  // 인풋으로부터 크기 얻어오기
  var canvasHegit = document.getElementById("canvasHeight").value;
  var canvasWidth = document.getElementById("canvasWidth").value;

  // 녹화 시간에 따른 그래프 길이 차이가 생길텐데 지금은 그냥 일정한 비율로 보여줌.
  // 6시간짜리랑 10시간짜리 데이터를 가져오면 width가 같은 그래프를 그려낸다.
  // 해결하기 위해서 기준 첫번째 데이터로 잡고 보정해주기
  var DataWidth = []
  DataWidth[0] = canvasWidth

  for (var i = 1; i < bpData.length; i++) {
    DataWidth[i] = DataWidth[0]
    // DataWidth[i] = bpData[i].length * canvasWidth / bpData[0].length
  }


  // 여러개를 그래프를 그린다
  for (var idx = 0; idx < bpData.length; idx++) {
    console.log(idx);


    // 새 박스 생성
    var canvasBox = document.createElement("div");
    canvasBox.setAttribute("id", "myAreaChartBox" + idx);
    canvasBox.setAttribute("class", "chart-area");
    canvasBox.style.width = DataWidth[idx] + "px"
    canvasBox.style.height = canvasHegit + "px"


    // 타이틀 생성
    var p = document.createElement("p");
    var newContent = document.createTextNode(bpDataName[idx]); 
    p.appendChild(newContent)
    canvasBox.appendChild(p)

    box.appendChild(canvasBox);

    var canvasID = "myAreaChart" + idx

    //새 캔버스 생성
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", canvasID);
    canvasBox.appendChild(canvas);

    var ctx = document.getElementById(canvasID);
    var context = ctx.getContext('2d');
    context.clearRect(0, 0, ctx.width, ctx.height);

    var tempLabel = labels[parseInt(idx / NUM_MAX_SET)]

    // 특수 그래프 라벨 예외처리
    if(idx>3){
      tempLabel =  createLabel(bpData[idx]) 
      console.log( bpData[idx])
    }

    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: tempLabel,
        datasets: [{
          label: "",
          lineTension: 0,
          backgroundColor: helloColor[idx],
          borderColor: helloColor[20],
          pointRadius: 0,
          pointBackgroundColor: "rgba(78, 115, 223, 0)",
          pointBorderColor: helloColor[20],
          pointHoverRadius: 0,
          pointHoverBackgroundColor: "rgba(78, 115, 223, 0)",
          pointHoverBorderColor: "rgba(78, 115, 223, 0)",
          pointHitRadius: 0,
          pointBorderWidth: 0,
          data: bpData[idx]
        }],
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
          }
        },
        scales: {
          xAxes: [{
            time: {
              unit: 'date'
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              maxTicksLimit: bpData[idx].length / 60 / 60
            }
          }],
          yAxes: [{
            ticks: {
              maxTicksLimit: 5,
              padding: 10,
              // Include a dollar sign in the ticks
              callback: function (value, index, values) {
                return ' ' + number_format(value);
              }
            },
            gridLines: {
              color: "rgb(255, 255, 255)",
              zeroLineColor: "rgb(255, 255, 255)",
              drawBorder: false,
              borderDash: [2],
              zeroLineBorderDash: [2]
            }
          }],
        },
        legend: {
          display: false
        }
      }
    });
  }
}

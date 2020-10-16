// db에서 적절한 값으로 교체하면서 뿌리기

var data = [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 1000];
var labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var suffix = ""
var hoverLabel = ""

// 페이지에서 값 가져오기
function getOrder() {
  suffix="";
  var arr = $("input[name=arr]")
  var result =[]

  for(var i=0;i<arr.length;i++){
    result[i] = arr[i].value;
  }

  // console.log($("#page-top > input[type=hidden]")[0].value.length)
  var chkData = $("#chkData")[0].value

  if( chkData == 0 ){ // 값이없는거 체크
    // console.log("값없는 바보다");
    // 그거 실행
    $("#notice")[0].style.display = ""
  }

// 첫번째놈 그래프로 그리기 == 데이터 덮어쓰기
  var dataSet = $("input[name=dataSet]")[0].value;
  // console.log(dataSet)
  var dataSetParse = JSON.parse(dataSet);
  // console.log(dataSetParse)


  var firstItemIndex =$("#content input[type=hidden]")[0].value;

  var input = dataSetParse[firstItemIndex]


  data= input.ddata;
  labels = input.dlabel;

  hoverLabel = input.dname

  //그래프 타이틀 변경
  $("#content > div > div:nth-child(2) > div > div > div.card-header.py-3.d-flex.flex-row.align-items-center.justify-content-between > h6")[0].innerHTML = input.dname;
}

//첫화면 초기화
getOrder();


// 카드 클릭시
function cardClick(i){
  var dataSet = $("input[name=dataSet]")[0].value;
  var dataSetParse = JSON.parse(dataSet);

  var input = dataSetParse[i]

  data= input.ddata;
  labels = input.dlabel;
  hoverLabel = input.dname
  console.log(hoverLabel)

  $("#content > div > div:nth-child(2) > div > div > div.card-header.py-3.d-flex.flex-row.align-items-center.justify-content-between > h6")[0].innerHTML = input.dname;

  drawChart()
}



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
    toFixedFix = function(n, prec) {
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

    var mode = 10;//디폴트

    switch(hoverLabel){ //0 n.m //1 1234초 //2 %
          case "누운시간":
          case "기상 시간":
            mode = 0;
            break;

          case "Stage1,2 수면 단계 시간":
          case "일일 수면 시간":
          case "수면까지 걸린 시간":
          case "Stage3,4 수면 단계 시간":
          case "총 수면 시간":
            mode = 1;
            break;

          case "수면 효율":
            mode = 2;
            break;
          default:
        }


    if(mode==0){
    // n.m을 00시 00분으로 나타내는 것
      var temp = n.toString()
      var jbSplit=[]
      jbSplit = temp.split('.')

      if(jbSplit.length==1){
        jbSplit[1]='00'
      }

      var result = jbSplit[0] +"시 " +jbSplit[1]+"분"
    }
    else if(mode==1){
      // 초를 00시 00분으로 나타내는 것
      var result = getTimeStringSeconds(n);
    }
    else if(mode==2){
      var result = n+"%"
    }
    else{
      result = s.join(dec);
    }


  // console.log("prec"+prec)
  // console.log("sep"+sep)
  // console.log("dec"+dec)
  // return s.join(dec)+"";
  return result
}




function getTimeStringSeconds(seconds){
	var hour, min, sec
	hour = parseInt(seconds/3600);
	min = parseInt((seconds%3600)/60);
	sec = seconds%60;
	if (hour.toString().length==1) hour = "0" + hour;
	if (min.toString().length==1) min = "0" + min;
	if (sec.toString().length==1) sec = "0" + sec;

  if(hour==0){
    return min + ":" + sec;
  }
  else{

	return hour + ":" + min + ":" + sec;
  }
}


drawChart()

function drawChart()  {
  // Area Chart Example

  // 캔버스 초기화가 안되서 그냥 삭제하고 다시생성..
  var box = document.getElementById("myAreaChart").parentNode;
  document.getElementById("myAreaChart").remove()

  //새 캔버스 생성
  var canvas = document.createElement("canvas");
  canvas.setAttribute("id", "myAreaChart");
  box.appendChild(canvas);

  var ctx = document.getElementById("myAreaChart");
  var context = ctx.getContext('2d');
  context.clearRect(0, 0, ctx.width, ctx.height);

  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: hoverLabel,
        lineTension: 0.3,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "rgba(78, 115, 223, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
        pointBorderColor: "rgba(78, 115, 223, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: data,
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
            maxTicksLimit: 7
          }
        }],
        yAxes: [{
          ticks: {
            maxTicksLimit: 5,
            padding: 10,
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
              return ' ' + number_format(value);
            }
          },
          gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        intersect: false,
        mode: 'index',
        caretPadding: 10,
        callbacks: {
          label: function(tooltipItem, chart) {
            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            // return datasetLabel + ': ' + tooltipItem.yLabel + suffix
            return datasetLabel + ': ' + number_format(tooltipItem.yLabel);
          }
        }
      }
    }
  });

}

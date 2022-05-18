let candidate = [];
let emailCol = 0;
let phoneNumberCol = 0;
let nameCol = 0;
const COL_NAME = {
  EMAIL: "이메일 주소",
  PHONE_NUMBER: "전화번호",
  NAME: "이름"
}

$(document).ready(function(){

  $("#execute").on("click", () => {
    if(candidate.length < 1) {
      alert("파일이 선택되지 않았거나 유효하지 않은 파일입니다.");
      return;
    }

    beforeAnimation();

    const drawTimer = setTimeout(function() {
      executeAnimation();
      clearTimeout(drawTimer);
      const alertTimer = setTimeout(function() {
        document.getElementById("drawResult").innerText = "당첨자는: " + drawCandidate(candidate) + " 입니다.";      
      }, 200);
    }, 3000);
  });
});

function beforeAnimation() {

  let drawResult = document.getElementById("drawResult");
  let countDown = 3;

  drawResult.innerText = "당첨자는? " + countDown;

  const countTimer = setInterval(function() {

    countDown--;

    if(countDown === 0) {
      clearInterval(countTimer);
    } else {
      drawResult.innerText = "당첨자는? " + countDown;
    }
  }, 1000);

  let btnExecute = document.getElementById("execute")
  btnExecute.style.visibility = "hidden";
}

function executeAnimation() {
  initDrawingCanvas();
  requestAnimationFrame(loop);
}

function endAnimation() {
  document.getElementById("execute").style.visibility = "visible";
}

function drawCandidate(array) {
  const random = Math.floor(Math.random() * array.length);
  const pickedCandidateInfo = array[random].split(",");
  return generatePrintPersonalInfo(pickedCandidateInfo[nameCol], pickedCandidateInfo[phoneNumberCol]);
}

function openTextFile() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "text/csv";
  input.onchange = function (event) {
      processFile(event.target.files[0]);
  };
  input.click();
}

function processFile(file) {
  const reader = new FileReader();

  reader.onload = function () {
    let output = document.getElementById("output");
    candidate = reader.result.split("\r\n");
    emailCol = candidate[0].split(",").findIndex(e => e == COL_NAME.EMAIL);
    phoneNumberCol = candidate[0].split(",").findIndex(e => e == COL_NAME.PHONE_NUMBER);
    nameCol = candidate[0].split(",").findIndex(e => e == COL_NAME.NAME);
    candidate.shift();

    let printList = [];
    for(const element of candidate) {

      let personalInfo = element.split(",");
      let printPersonalInfo = generatePrintPersonalInfo(personalInfo[nameCol], personalInfo[phoneNumberCol].replaceAll("-", ""));

      printList.push(printPersonalInfo);
    }
    output.innerText = printList.join("\r\n");
  };

  reader.readAsText(file, "utf-8");
}

function generatePrintPersonalInfo(name, phoneNumber) {
  return name + " " + phoneNumber.substr(phoneNumber.length - 4)
}

let candidate = [];
let emailCol = 0;

$(document).ready(function(){

  $("#execute").on("click", () => {
    if(candidate.length < 1) {
      alert("파일이 선택되지 않았거나 유효하지 않은 파일입니다.");
      return;
    }

    beforeAnimation();
    executeAnimation();

    timer = setTimeout(function() {
      drawResult.innerText = "당첨자는: " + drawCandidate(candidate) + " 입니다.";      
    }, 500);
  });
});

function beforeAnimation() {

  let drawResult = document.getElementById("drawResult");
  drawResult.innerText = "당첨자는? ";

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
  return array[random].split(",")[emailCol];
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
    emailCol = candidate[0].split(",").findIndex(e => e == "이메일 주소");
    candidate.shift();

    let emailList = [];
    for(const element of candidate) {
      emailList.push(element.split(",")[emailCol]);
    }
    output.innerText = emailList.join("\r\n");
  };

  reader.readAsText(file, "utf-8");
}

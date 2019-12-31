var difficulty = "hard"

var colors = generateRandomColors(difficulty);
// var colors = [
// "rgb(255, 0, 0)",
// "rgb(255, 255, 0)",
// "rgb(0, 255, 0)",
// "rgb(0, 255, 255)",
// "rgb(0, 0, 255)",
// "rgb(255, 0, 255)",
// ]

var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("messageDisplay");
var heading1 = document.getElementsByClassName("heading1")[0];
var resetButton = document.getElementsByClassName("resetButton")[0];
var squares = document.querySelectorAll(".square");


colorDisplay.textContent = pickedColor;

//초기화
initiate();

//이벤트 리스너 각 직사각형에 추가
function initiate() {
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];

		squares[i].addEventListener("click", addEvent);
	}
}

function addEvent() {
	var clickedColor = this.style.backgroundColor;
	if(clickedColor === pickedColor) {
		messageDisplay.textContent = "Correct!";
		changeColors(clickedColor);
		heading1.style.backgroundColor = clickedColor;
		resetButton.textContent = "Play Again?"
	} else {
		this.classList.add("wrong");
		messageDisplay.textContent = "Try Again";
	}
}


// 이벤트 리스너 : 리셋버튼 만들기
resetButton.addEventListener("click", function() {
	//새로운 배열 생성
	colors = generateRandomColors(difficulty);
	//새 답을 뽑고
	pickedColor = pickColor();
	//헤딩 색깔을 다시 돌려주고
	heading1.style.background = "#232323";
	//스펜도 초기화
	messageDisplay.textContent = "";
	//버튼 이름 초기화
	resetButton.textContent = "New Colors"
	//새 답에 대한 문제를 화면에 출력
	colorDisplay.textContent = pickedColor;
	// 기존 이벤트 리스너 삭제
	for(var i = 0; i < squares.length; i++) {
		squares[i].removeEventListener("click", addEvent);
		squares[i].classList.remove("wrong");
	}
	// 새로운 이벤트 리스너 추가와 새로운 배열 등록
	initiate();
});


//직사각형이 눌리면, 직사각형이 사라지며(배경색과 같게 변화), 
function changeColors(color) {
	for(var i = 0; i < squares.length; i++) {
		squares[i].classList.remove("wrong");
		squares[i].style.background = color;
	}
};

// 직사각형 중 1개 뽑기
function pickColor() {
	//pcik random number
	var random = Math.floor(Math.random() * colors.length);
	//access the number color array
	return colors[random];
}
// 난수 생성
function getRandomNumber(num) {
	return Math.floor(Math.random() * num)
}

// 난이도에 따른 갯수 선정 (easy : 3, hard : 6)
function generateRandomColors(difficulty) {
	var array = Array();
	var objectDifficulty = {
		easy: 3,
		hard: 6,
	}
	var numOfDifficulty = objectDifficulty[difficulty];

	for(var i = 0; i < numOfDifficulty; i++) {
		array.push("rgb(" + getRandomNumber(256) + ", " + getRandomNumber(256) + ", " + getRandomNumber(256) + ")" )
	}
	return array;
}

var difficulty = "hard"

var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("messageDisplay");
var heading1 = document.getElementsByClassName("heading1")[0];
var resetButton = document.getElementsByClassName("resetButton")[0];
var easyButton = document.getElementsByClassName("easy")[0];
var hardButton = document.getElementsByClassName("hard")[0];
var squares = document.querySelectorAll(".square");

resetGame();
initiateDifficultyButton();
initiateResetButton();

// function : reset the game
function resetGame() {
	//새로운 배열 생성
	colors = generateRandomColors(difficulty);
	//새 답을 뽑고
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;	
	//헤딩 색깔을 다시 돌려주고
	heading1.style.background = "steelblue";
	//스펜도 초기화
	messageDisplay.textContent = "";
	//버튼 이름 초기화
	resetButton.textContent = "New Colors"
	// 기존 이벤트 리스너 삭제
	removeEventListenertoSquare();
	addEventListenertoSquare();
	toggleSquareDisplay();
}

// function : add Event Listener to Easy and Hard Button.
function initiateDifficultyButton() {
	easyButton.addEventListener("click", function() {
		if (difficulty === "hard") {
			easyButton.classList.add("selected");
			hardButton.classList.remove("selected");
			difficulty = "easy";
			resetGame();
		}
	})
	hardButton.addEventListener("click", function() {
		if (difficulty === "easy") {
			hardButton.classList.add("selected");
			easyButton.classList.remove("selected");
			difficulty = "hard";
			resetGame();
		}
	})
}

function addEventListenertoSquare() {
	for(var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].addEventListener("click", EventListenertoSquare);
		}
	}
}

function removeEventListenertoSquare() {
	for(var i = 0; i < squares.length; i++) {
		squares[i].removeEventListener("click", EventListenertoSquare);
		squares[i].classList.remove("wrong");
	}
}

function toggleSquareDisplay() {
	for(var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
		} else {
			squares[i].style.display = "none";
		}
	}
}

function EventListenertoSquare() {
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

//직사각형이 눌리면, 직사각형이 사라지며(배경색과 같게 변화), 
function changeColors(color) {
	for(var i = 0; i < colors.length; i++) {
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

function initiateResetButton() {
	resetButton.addEventListener("click", function() {
		resetGame();
	});
}





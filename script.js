const questions = [
	{
		question: "Какое значение вернёт этот код?",
		code: `
<div class="card">
  <div class="header">
    <div class="top">
      <div class="circle">
        <span class="red circle2"></span>
      </div>
      <div class="circle">
        <span class="yellow circle2"></span>
      </div>
      <div class="circle">
        <span class="green circle2"></span>
      </div>
      <div class="title">
        <p id="title2">script.js</p>
      </div>
    </div>
  </div>
  <div class="code-container">
    <textarea class="area" id="code" name="code" readonly="">console.log(typeof null);
		</textarea>
  </div>
</div>
`,
		answers: ["null", "undefined", "object", "NaN"],
		correct: 2
	},
];

let currentQuestion = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let timer;
let timeLeft = 30000;

function startTest() {
	document.querySelector('.theory').style.display = 'none';
	document.querySelector('button').style.display = 'none';
	document.querySelector('.test-container').style.display = 'block';
	showQuestion();
	startTimer();
}

function showQuestion() {
	const q = questions[currentQuestion];
	let questionHTML = `<h3>Вопрос ${currentQuestion + 1}: ${q.question}</h3>`;
	
	// Добавляем код вопроса если есть
	if(q.code) {
			questionHTML += q.code;
	}
	
	document.getElementById('question').innerHTML = questionHTML;
	
	let answersHTML = '';
	q.answers.forEach((answer, index) => {
			answersHTML += `<div class="answer" onclick="checkAnswer(${index})">${answer}</div>`;
	});
	document.getElementById('answers').innerHTML = answersHTML;
}

function startTimer() {
	timeLeft = 30;
	document.getElementById('time').textContent = timeLeft;

	timer = setInterval(() => {
		timeLeft--;
		document.getElementById('time').textContent = timeLeft;

		if (timeLeft <= 0) {
			wrongAnswers++;
			nextQuestion();
		}
	}, 1000);
}

function checkAnswer(answerIndex) {
	clearInterval(timer);

	if (answerIndex === questions[currentQuestion].correct) {
		correctAnswers++;
	} else {
		wrongAnswers++;
	}

	nextQuestion();
}

function nextQuestion() {
	currentQuestion++;

	if (currentQuestion < questions.length) {
		showQuestion();
		startTimer();
	} else {
		showResults();
	}
}

function showResults() {
	document.querySelector('.test-container').style.display = 'none';
	document.querySelector('.results').style.display = 'block';

	const total = correctAnswers + wrongAnswers;
	const percentage = (correctAnswers / total) * 100;

	let grade = '2';
	if (percentage >= 61) grade = '3';
	if (percentage >= 81) grade = '4';
	if (percentage === 100) grade = '5';

	document.getElementById('grade').textContent = grade;
	document.getElementById('correct').textContent = correctAnswers;
	document.getElementById('wrong').textContent = wrongAnswers;
}
//global var
var header = document.getElementById("header")
var quiz = document.getElementById("quiz")
var start = document.getElementById("start")
var highscore = document.getElementById("highscore")
var timeEl = document.getElementById("time")
var question = document.getElementById("question")
var choices = document.getElementById("choices")
var choiceA = document.getElementById("A")
var choiceB = document.getElementById("B")
var choiceC = document.getElementById("C")
var choiceD = document.getElementById("D")
var finished = document.getElementById("finished")
var scoreEl = document.getElementById("score")
var time = 60
var intervalId
var score = 0
var currentQuestion = 0
var grade = 0

var questions = [

    {
        question: "What does HTML stand for?",

        choiceA: "Hypertext Markup Language",
        choiceB: "JavaScript",
        choiceC: "Hypertext Markup",
        choiceD: "Hyper Text Make Language",
        correct: "A"

    }, {

        question: "What does CSS stand for?",
        choiceA: "Cascading Sheets",
        choiceB: "Cascading Style Sheets",
        choiceC: "none",
        choiceD: "All",
        correct: "B"
    }, {

        question: "What does JS stand for?",
        choiceA: "all",
        choiceB: "none",
        choiceC: "JavaScript",
        choiceD: "EA",
        correct: "C"
    }

];
var questionlength = questions.length - 1
//functions
function getQuestion() {
    let q = questions[currentQuestion];
    question.innerHTML = "<p>"+ q.question + "</p>"
    choiceA.innerHTML = "1. " + q.choiceA
    choiceB.innerHTML = "2. " + q.choiceB
    choiceC.innerHTML = "3. " + q.choiceC
    choiceD.innerHTML = "4. " + q.choiceD
}


function finish() {
    var btn = document.getElementById('btn')
    btn.addEventListener('click', function handleClick(event) {
        event.preventDefault();

        var initialsInput = document.getElementById('first_name');
        return initialsInput.value

    });
}
function timer() {
    clearInterval(intervalId)
    intervalId = setInterval(function () {
        time--
        timeEl.innerText = "Time: " + time
        if (time === 0) {
            gameOver()
        }
    }, 1000)
}

function gameOver() {
    clearInterval(intervalId)
    grade = Math.ceil(100 * (score / questions.length))
    quiz.style.display = "none"
    finished.style.display = "block"
    var initials = finish()


    const champ = JSON.parse(localStorage.getItem('jsQuiz'))

    if (!champ || champ.grade < grade) {
        localStorage.setItem('jsQuiz', JSON.stringify({
            initials,
            grade
        }))
    }
}

function checkAnswer(answer) {
    if (answer == questions[currentQuestion].correct) {
        score++;
    }

    if (currentQuestion < questionlength) {
        currentQuestion++;
        getQuestion()

    }
    else {
        gameOver();
    }
}
function startQuiz() {
    header.style.display = "none"
    start.style.display = "none"
    getQuestion()
    
    timer()
    quiz.style.display = "block"
    choices.style.display= "block"
}

//start
start.addEventListener("click", startQuiz)
//global var
var header = document.getElementById("header")
var quiz = document.getElementById("quiz")
var start = document.getElementById("start")
var highscore = document.getElementById("highscore")
var time = document.getElementById("time")
var question = document.getElementById("question")
var choices = document.getElementById("choices")
var choiceA = document.getElementById("A")
var choiceB = document.getElementById("B")
var choiceC = document.getElementById("C")
var choiceD = document.getElementById("D")
var score = document.getElementById("score")
var time = 60
var intervalId
var scoreTime = 0
var currentQuestion = 0;


var questions = [

    {
        question: "What does HTML stand for?",

        choiceA: "Correct",
        choiceB: "Wrong",
        choiceC: "Wrong",
        choiceD: "Wrong",
        correct: "A"

    }, {

        question: "What does CSS stand for?",
        choiceA: "Wrong",
        choiceB: "Correct",
        choiceC: "Wrong",
        choiceD: "Wrong",
        correct: "B"
    }, {

        question: "What does JS stand for?",
        choiceA: "Wrong",
        choiceB: "Wrong",
        choiceC: "Correct",
        choiceD: "Wrong",
        correct: "C"
    }

];

//functions
function getQuestion() {
    let q = questions[currentQuestion];
    question.innerHTML = "<p>"+ q.question +"</p>"
    choiceA.innerHTML = q.choiceA
    choiceB.innerHTML = q.choiceB
    choiceC.innerHTML = q.choiceC
    choiceD.innerHTML = q.choiceD
}

function updateScore() 
    {
        scoreTime++
        score.innerText = scoreTime
    }

    function timer() {
        clearInterval(intervalId)
        intervalId = setInterval(function () {
            time--
            countdownEl.innerText = time
            if (time === 0) {
                gameOver()
            }
        }, 1000)
    }

    function gameOver() {
        clearInterval(intervalId)
        var initials = prompt('Game over! Initials pls')
        const champ = JSON.parse(localStorage.getItem('memoryGameChamp'))
        if (!champ || champ.score < score) {
            localStorage.setItem('memoryGameChamp', JSON.stringify({
                initials,
                score
            }))
        }

        // TODO save score
        var playAgain = confirm('Want to play again?')
        if (playAgain) {
            window.location.reload()
        }
    }

    function checkAnswer(answer){


    }   
    function startQuiz(){
    header.style.display = "none"
    start.style.display = "none"
    getQuestion()
    quiz.style.display= "block";
    }

//start
start.addEventListener("click" , startQuiz)
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
var scoreEl = document.getElementById("score")
var time = 60
var intervalId
var score = 0
var currentQuestion = 0
var grade = 0

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
var questionlength = questions.length-1
//functions
function getQuestion() {
    let q = questions[currentQuestion];
    question.innerHTML = "<p>"+ q.question +"</p>"
    choiceA.innerHTML = q.choiceA
    choiceB.innerHTML = q.choiceB
    choiceC.innerHTML = q.choiceC
    choiceD.innerHTML = q.choiceD
}


    function timer() {
        clearInterval(intervalId)
        intervalId = setInterval(function () {
            time--
            timeEl.innerText ="Time: " + time
            if (time === 0) {
                gameOver()
            }
        }, 1000)
    }

    function gameOver() {
        grade = Math.ceil(100 * (score / questions.length))
        clearInterval(intervalId)
        var initials = prompt('Game over! Initials pls')
        const champ = JSON.parse(localStorage.getItem('jsQuiz'))

        if(!champ || champ.grade < grade){
            localStorage.setItem('jsQuiz', JSON.stringify({
                initials,
                grade
            }))
            }
        

        // TODO save score
        var playAgain = confirm('Want to play again?')
        if (playAgain) {
            window.location.reload()
        }
        else{
            window.location.href = "highscore.html"
        }
    }

    function checkAnswer(answer){
        if(answer == questions[currentQuestion].correct){
           score ++;  
        }
    
        if (currentQuestion < questionlength) {
            currentQuestion++;
            getQuestion()
    
        }
        else{   
            gameOver();
        }
    } 
    function startQuiz(){
    header.style.display = "none"
    start.style.display = "none"
    getQuestion()
    timeEl.style.display = "flex"
    timer()
    quiz.style.display= "block"
    }

//start
start.addEventListener("click" , startQuiz)
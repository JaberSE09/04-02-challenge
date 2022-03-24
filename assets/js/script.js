//global var
var header = document.getElementById("header")
var quiz = document.getElementById("quiz")
var start = document.getElementById("start")
var highscoreEl = document.getElementById("highscore")
var timeEl = document.getElementById("time")
var question = document.getElementById("question")
var choices = document.getElementById("choices")
var choiceA = document.getElementById("A")
var choiceB = document.getElementById("B")
var choiceC = document.getElementById("C")
var choiceD = document.getElementById("D")
var finished = document.getElementById("finished")
var choicesBtn = document.getElementById("choicesBtn")
var time = 60
var intervalId
var score = 0
var currentQuestion = 0
var grade = 0
var high = []
var scoresEl = document.getElementById("scores")
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
    question.innerHTML = "<p>" + q.question + "</p>"
    choiceA.innerHTML = "1. " + q.choiceA
    choiceB.innerHTML = "2. " + q.choiceB
    choiceC.innerHTML = "3. " + q.choiceC
    choiceD.innerHTML = "4. " + q.choiceD
}

function userInput() {
    var yourScore = document.getElementById('yourScore')
    yourScore.innerHTML += grade
    var btn = document.getElementById('submit')
    btn.addEventListener("click", function () {

        var initials = document.getElementById("initials").value.trim()

        var userScore = { initials: initials, grade: grade }

        high = JSON.parse(localStorage.getItem("scores")) || [];
        high.push(userScore)
        console.log(high)
        localStorage.setItem("scores", JSON.stringify(high));
        scores()


    })

}
function finish() {
    userInput()
    goback()
    clear()
}
function clear() {
    var clear = document.getElementById("clear")
    clear.addEventListener("click", function () {
        high = []
        localStorage.setItem("scores", JSON.stringify(high));
        console.log(localStorage)
        scoresEl.innerHTML = ""
        scores()
        reset()
    })
}


function reset() {
    grade = 0;
    currentQuestion = 0;
    timer = 0;
    timeEl.textContent = "Time: " + 0;
}

function goback() {
    goback = document.getElementById("goBack")
    goback.addEventListener("click", function () {
        location.reload()
    })
}


function scores() {
    finished.style.display = "none"
    scoresEl.innerHTML = ""

    high = JSON.parse(localStorage.getItem("scores"));
    for (var i = 0; i < high.length; i++) {
        var scoreItem = document.createElement("p")
        scoreItem.className += "row mb-3 p-2"
        scoreItem.id = "hs"
        console.log(scoreItem)
        scoreItem.textContent = (i + 1) + ". " + high[i].initials + " - " + high[i].grade
        scoresEl.append(scoreItem)
    }
    highscoreEl.style.display = "block"
}

function timer() {
    clearInterval(intervalId)
    intervalId = setInterval(function () {
        time--
        timeEl.style.display = "block"
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
    finish()
    finished.style.display = "block"

}

function checkAnswer(answer) {
    if (answer == questions[currentQuestion].correct) {
        score++;
    } else {
        time -= 10
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
    choices.style.display = "none"
    getQuestion()
    timer()
    quiz.style.display = "block"
    choices.style.display = "block"
}

//start
start.addEventListener("click", startQuiz)
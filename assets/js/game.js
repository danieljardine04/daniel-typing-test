var headerEl = document.getElementById("title");
var pageContentEl = document.querySelector(".pageContent");
var divEl = document.querySelector(".textContent");
var timerEl = document.getElementById("timer");
var paragraphEl = document.createElement("p");

var keyboardEl = document.getElementById("keyboard");
var hEl = document.getElementById("head");

var containerEl = document.querySelector(".form-div");
var formDiv = document.createElement("div");
var clockTime = 0
var div1 = document.createElement("div");
var div2 = document.createElement("div");
var text_box = document.createElement("p");
var text_input_element = document.createElement("input");
var timeLeft = 0;
var timeInterval;
var div3 = document.createElement("div");


var count = 0;


// is it possible to set a parameter on an API URL to adjust number of returned words?//

var random_words_api = 'https://random-word-api.herokuapp.com/word?number=30';
var dad_jokes_api = "https://icanhazdadjoke.com/search?limit=8&page="
var quote_api = "https://quotable.io/quotes?limit=8&page="  
console.log(quote_api.content);

var getRandomQuote = function(api, toWords){
     fetch(api, {headers: {Accept: 'application/json'}})
    .then(response => response.json().then(data => typingPage(toWords(data))));
    
}



divEl.appendChild(paragraphEl);
divEl.append(div1, div2, div3);
containerEl.appendChild(formDiv);



var dropDown = {
    time: [
        {name: "1 minute",
        clockNumber:1,
    },
    {name: "2 minutes",
    clockNumber: 2,
},
{name: "5 minutes",
clockNumber: 5
},

],

type: [
    {name: "Dictionary"},
    {name: "Quotes"},
    {name: "Dad Jokes"},
]
}

var clock = {
    minutes:  0,
    seconds:  0,
}

var clearPage = function(){
    hEl.textContent = "";
    paragraphEl.textContent = "";
    div1.innerHTML = "";
    div2.innerHTML = "";
    div3.innerHTML = "";
    count = 0;
    
}

var startUp = function(){
    clearPage();
    var button = document.createElement("button");
    var selectTimeEl = document.createElement("select");
    var selectTypeEl = document.createElement("select");
    
    selectTimeEl.name = "time";
    selectTypeEl.name= "type";
    selectTimeEl.className = "dropdown";
    selectTypeEl.className = "dropdown";
    
    div1.appendChild(selectTimeEl);
    div1.appendChild(selectTypeEl);
    div2.appendChild(button);
    
    for(i = 0; i < dropDown.time.length; i++){
        var option = document.createElement("option");
        selectTimeEl.appendChild(option);
        option.value = dropDown.time[i].name;
        option.textContent = dropDown.time[i].name; 
        
    }
    
    for(i=0; i < dropDown.type.length; i++){
        var optionEl = document.createElement("option");
        selectTypeEl.appendChild(optionEl);
        optionEl.textContent = dropDown.type[i].name; 
        optionEl.value = dropDown.type[i].name;
    }
    
    
    
    headerEl.textContent = "Ka-chow Typing Test";
    hEl.textContent = "Our Purpose";
    paragraphEl.textContent = "Welcome to Ka-chow Typing Test. Are you looking for a job where you have to sit in front of a computer all day? Great news! This is the place for you. Here at Ka-chow, you can hone your typing skills to feel comfortable in any job you need to type. We want to help YOU become a better typer. With our typing test, and a little bit of luck you too could be like us. KAAAAAA-CHOW! "
    button.textContent = "Start!"
    
    button.addEventListener("click", buttonListener);
    
}

var buttonListener = function(){
    var chosenTime = document.querySelector("select[name='time']");
    var chosenType = document.querySelector("select[name='type']");
    processForm(chosenTime.value, chosenType.value);
}




var processForm = function(time, type){

    if(clock.seconds > 60){
        clock.minutes = clock.seconds/60;
    }
    
    switch(time){
        case "1 minute": {
            clock.seconds = 1;
            break;
        }
        case "2 minutes": {
            clock.seconds = 2;
            break;
        }
        case "5 minutes": {
            clock.seconds = 5;
            break;
        }
        case "10 minutes": {
            clock.seconds = 10;
            break;
        }
    }
    
    clockTime = clock.seconds * 60;
    processType(type);
    
    console.log(time);
    console.log(type);
}

var processType = function(type){
    switch(type){
        case "Dictionary": {
            clearPage();
            type = random_words_api;
            fetch(type).then(function(response){
                response.json().then(function(value){
                    typingPage(value);
                });
            })
            break;
        }
        case "Quotes": {
            clearPage();
            getRandomQuote(quote_api + randomPage(200), contentToWords("content"));
            break;
        }
        case "Dad Jokes": {
            clearPage();
            getRandomQuote(dad_jokes_api + randomPage(82), contentToWords("joke"))
        }
    }
    
}

var randomPage = function(max){
    return Math.floor(Math.random() * max + 1);

}

var dadJokesToWords = function(data){
    var words = [];
    console.log("This function is running");
    console.log(data);
    return words

}

var contentToWords = function(content){
    return function(data){
        var words = [];
        for(var i =0; i<data.results.length; i++){
            var quote = data.results[i][content].split(" ");
            for(var j = 0; j<quote.length; j++){
                words.push(quote[j]);
            }
        }

        return words;

    }
}

countDown = function(){
    timeInterval = setInterval(function(){
        clockTime--
        timerEl.textContent = "Time: " + clockTime;
        
        if(clockTime < 1){
            endGame();
        }
    }, 1000)
}



var typingPage = function(words){
    timerEl.textContent = "Time: " + clockTime;
    var string = "";
    text_box.innerHTML = "";
    for (i = 0; i < words.length; i++) {
        text_box.innerHTML += " ";
        var spanEl = document.createElement("span");
        text_box.appendChild(spanEl);
        spanEl.textContent = words[i];
    }
   // text_box.textContent = string;

    text_input_element.addEventListener("input", function(){

        
        var arrayText = text_box.querySelectorAll("span");
        var arrayValue = text_input_element.value.split(" ");
        
        
        
        arrayText.forEach((characterSpan, index) => {
            var character = arrayValue[index]
            var current = arrayValue.length -1;
        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            characterSpan.classList.remove('current');
        } else if (character === characterSpan.innerText) {
            characterSpan.className = 'correct';
        }else if(index === current) {
            characterSpan.className = 'current';
        } else {
           characterSpan.className = 'incorrect';
        }
    })
    
    
    })  


    div1.appendChild(text_box);
    div2.appendChild(text_input_element);
    text_input_element.addEventListener("keyup", () => {
        startGame();
    })    
}

var endGame = function(){
    clearInterval(timeInterval);
    // Text_input_element shouldn't allow us to type in it after the time is up.
    var correct = text_box.querySelectorAll(".correct");
    var incorrect = text_box.querySelectorAll(".incorrect");

    console.log(correct.length);
    console.log(incorrect.length);


    text_input_element.addEventListener("keydown", function(e){
        e.preventDefault();
        return false;
    })

    var score = (correct.length - incorrect.length)/clock.seconds;
    saveScore(score);

    var textEl = document.createElement("h3");
    div3.appendChild(textEl);
    var buttonEl = document.createElement('button');
    textEl.textContent = "You finished! Your score is: " + score + " Please click button below to continue!"
    div3.appendChild(buttonEl);
    buttonEl.textContent = "HighScores!";

    buttonEl.addEventListener("click", scorePage);
    
    
}

var startGame = function(){
    count++;
    if (count === 1){
      countDown();
    }
}

var saveScore = function(score){
    var scores = localStorage.getItem('scores');
    if(!scores){
        scores = [];
    } else{
        scores = JSON.parse(scores);
    }
    scores.push({score: score});
    localStorage.setItem("scores", JSON.stringify(scores));
    return score;

}


var scorePage = function(){
    clearPage();
    var orderedEl = document.createElement("ol");
    

    div1.appendChild(orderedEl);
    

    var scores = JSON.parse(localStorage.getItem('scores'));
    if(scores){
        scores.sort((a, b) => b.score - a.score);
        for(var i = 0; i < scores.length; i++){
            var listItemEl = document.createElement("li");
            orderedEl.appendChild(listItemEl);
            listItemEl.textContent =  "WPM: " + scores[i].score;
        }
    }


    hEl.textContent = "Thank you for playing! Welcome to the HighScore Page.";
    buttonEl = document.createElement('button');

    div2.appendChild(buttonEl);
    buttonEl.textContent = "Play Again!";
    buttonEl.addEventListener("click", function(){
        location.reload();
    })
}

startUp();






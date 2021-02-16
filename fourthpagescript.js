var myQuestions = [
	{
		question: "What is the scientific name for Covid-19?",
		answers: {
            
			a: 'Covideo Nineteen',
			b: 'Coronation-19',
			c: 'Coronavirus',
      d: 'Coughing Virus Syndrome'
		},
		correctAnswer: 'c'
	},
	{
		question: "Where is the origin location of Covid-19?",
		answers: {
			a: 'Europe, France',
			b: 'China, Wuhan',
			c: 'Russia, Moscow',
      d: 'China, Chengdu'
		},
		correctAnswer: 'b'
	},
  	{
		question: "How does Covid-19 spread?",
		answers: {
			a: 'Coughing',
			b: 'Sneezing',
			c: 'Touching eyes and mouths needlessly',
      d: 'All of the above'
		},
		correctAnswer: 'd'
	},
  	{
		question: "Does taking steroids help patients recover from Covid-19?",
		answers: {
			a: 'Yes',
			b: 'No'
		},
		correctAnswer: 'b'
	}, 
  	{
		question: "What are some ways one can help prevent the spread of Covid-19",
		answers: {
			a: 'Washing hands with soap regularly',
			b: 'Wearing a mask when outside',
			c: 'Staying at home if feeling unwell',
      d: 'All of the above'
		},
		correctAnswer: 'd'
	}
];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
retrieveScoreboard();

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

	function showQuestions(questions, quizContainer){
		// we'll need a place to store the output and the answer choices
		var output = [];
		var answers;

		// for each question...
		for(var i=0; i<questions.length; i++){
			
			// first reset the list of answers
			answers = [];

			// for each available answer...
			for(letter in questions[i].answers){

				// ...add an html radio button
				answers.push(
					'<label>'
						+ '<input type="radio" name="question'+i+'" value="'+letter+'">'
						+ letter + ': '
						+ questions[i].answers[letter]
					
					+'</label><br>'
				);
			}

			// add this question and its answers to the output
			output.push(
				'<div class="question">' + questions[i].question + '</div>'
				+ '<div class="answers">' + answers.join('') + '</div>'
			);
		}

		// finally combine our output list into one string of html and put it on the page
		quizContainer.innerHTML = output.join('');
	}


	function showResults(questions, quizContainer, resultsContainer){
		
		// gather answer containers from our quiz
		var answerContainers = quizContainer.querySelectorAll('.answers');
		
		// keep track of user's answers
		var userAnswer = '';
		var numCorrect = 0;
		
		// for each question...
		for(var i=0; i<questions.length; i++){

			// find selected answer
			userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
			
			// if answer is correct
			if(userAnswer===questions[i].correctAnswer){
				// add to the number of correct answers
				numCorrect++;
        //numCorrect will be used for restDb
				
				// color the answers green
				answerContainers[i].style.color = 'lightgreen';
			}
			// if answer is wrong or blank
			else{
				// color the answers red
				answerContainers[i].style.color = 'red';
			}
		}

		// show number of correct answers out of total
		resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;

		// Get name input from user in html document for calling the function addToScoreboard
		var nameInput = document.getElementById('contact-name').value;
		addToScoreboard(nameInput, numCorrect);
	}
	// show questions right away
	showQuestions(questions, quizContainer);
	
	// on submit, show results
	submitButton.onclick = function(){
		showResults(questions, quizContainer, resultsContainer);
	}
}

// Retrieve scoreboard data from restDB
function retrieveScoreboard(limit = 5, all = true){
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://assignment03database-6e9e.restdb.io/rest/scoreboard",
		"method": "GET",
		"headers": {
		"content-type": "application/json",
		"x-apikey": "602245563f9eb665a1689320",
		"cache-control": "no-cache"
		}
	}
	
	$.ajax(settings).done(function (response) {
		console.log(response);

		let content = "";
		for (var i = 0; i < response.length && i < limit; i++)
		{
			content += "<tr><td>" + response[i].name + "</td>" + "<td>" + response[i].results + "</td>";
		}

		$("#scoreboard-list tbody").html(content);
	});
}

// Adding new scoreboard data to restDB
function addToScoreboard(nameInput, numCorrect){
	var jsondata = {"name": nameInput,"results": numCorrect};
	var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://assignment03database-6e9e.restdb.io/rest/scoreboard",
	"method": "POST",
	"headers": {
		"content-type": "application/json",
		"x-apikey": "602245563f9eb665a1689320",
		"cache-control": "no-cache"
	},
	"processData": false,
	"data": JSON.stringify(jsondata)
	}

	$.ajax(settings).done(function (response) {
	console.log(response);
	});
}
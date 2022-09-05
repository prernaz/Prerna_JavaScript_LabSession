    //javascript code for displaying quiz questions and checking and maintaing score in the quiz

    function Quiz(questions){
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0; 
    }
    
    //prototype is used to keep only one copy of functions for all the objects(instances)

    Quiz.prototype.getQuestionByIndex = function() {
        return this.questions[this.questionIndex];
    }

    Quiz.prototype.checkOptionWithAnswer = function(answer) {
        if(this.getQuestionByIndex().isCorrectAnswer(answer)){
            this.score++;
        }
        this.questionIndex++;
   }

   Quiz.prototype.isEnded  = function(){
        return this.questionIndex === this.questions.length;
    }
     
    function Question(text,choices,answer){
      this.text=text;
      this.choices= choices;
      this.answer= answer;
    }
    
    Question.prototype.isCorrectAnswer = function(choice) { 
        return this.answer === choice;
    }

    //create set of questions in the quiz with answers

    var questions = [
        new Question("JavaScript supports", ["Functions", "XHTML","CSS", "HTML"], "Functions"),
        new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
        new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
        new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
        new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
    ];

         
    let quiz = new Quiz(questions);
    loadQuestions();

    // function to load set of questions one by one in the quiz
    function loadQuestions(){
        if(quiz.isEnded()){
        //show scores
            showScores();
        }
        else{

        //show options
            let question = quiz.getQuestionByIndex();
            var element = document.getElementById("question");
            element.innerHTML = question.text;

            var choices = question.choices;
            for(var i =0; i<choices.length; i++){
                var element = document.getElementById("choice" + i);
                element.innerHTML = choices[i];
                handleOptionButton("btn"+ i, choices[i]);
         }
        showProgressBar();
        }  
    } 

    //function to handle action to be performed on click/selection  of an option
    function handleOptionButton(id,choice){
        let button = document.getElementById(id);
        button.onclick = function(){
            quiz.checkOptionWithAnswer(choice);
            loadQuestions();
        }
    }

    //function to keep track of scores and show scores obtained in quiz
    function showScores(){
        let scoreHtml = "<h1>Result</h1>";
        scoreHtml += "<h2 id='score'>Your scores:"+quiz.score+ " </h2>"
        let quizElement = document.getElementById("quiz");
        quizElement.innerHTML = scoreHtml;
    }
      
      //function to keep track of progress made in terms of questions attempted at any point in quiz
    function showProgressBar(){
        let currentQuestionNumber = quiz.questionIndex + 1;
        let progressElement = document.getElementById("progress");
        progressElement.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
    }


    
    



    

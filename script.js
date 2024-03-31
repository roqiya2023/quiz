const quize=document.getElementById("right");
const htmlEl=document.getElementById("html");

let score=0;

function encodeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

 function upDateQuestion(array,index){
    quize.innerHTML='';
     quize.innerHTML=`<h1>${encodeHTML(array[index].question)}</h1>
    <input type="radio" id="option1" name="option" value="${encodeHTML(array[index].options[0])}">
    <label for="option1">${encodeHTML(array[index].options[0])}</label><br>
    <input type="radio" id="option2" name="option" value="${encodeHTML(array[index].options[1])}">
    <label for="option2">${encodeHTML(array[index].options[1])}</label><br>
    <input type="radio" id="option3" name="option" value="${encodeHTML(array[index].options[2])}">
    <label for="option3">${encodeHTML(array[index].options[2])}</label><br>
    <input type="radio" id="option4" name="option" value="${encodeHTML(array[index].options[3])}">
    <label for="option4">${encodeHTML(array[index].options[3])}</label><br>
    <div class="quiz-bar">
    <div class="quiz-bar-fill" id ="quiz-bar-fill" ></div>
    </div>
    <button id="submit">Submit</button>`;
  const quizBarrFill=document.getElementById('quiz-bar-fill');
    quizBarrFill.style.width=`${percentageBar(index)}%`;
  

 }
 function percentageBar(index){
    return (index)*10
    }

 function scorePage(){
    quize.innerHTML=`<h1>Score: 10/${score}</h1>`;
 }
    
    function showCurrentQuizQuestion(obj){
       
        let currentIndex=0;
        let questionsArray=obj.questions;
        upDateQuestion(questionsArray,currentIndex);

   const clickHandler = (event) => {
        if (event.target && event.target.id === 'submit') {
            const selectedOption = document.querySelector('input[name="option"]:checked');
            if(selectedOption===null){
                alert('Please select an option');
            }else if(selectedOption.value===questionsArray[currentIndex].answer){
                score++;

            }
            currentIndex++;
            if (currentIndex < questionsArray.length) {

                upDateQuestion(questionsArray, currentIndex);
                
            } else {
                console.log(currentIndex)
                scorePage();
               
            }
        }
    };
    quize.removeEventListener("click", clickHandler);
    quize.addEventListener("click", clickHandler);
       
    }

//reading the quizz data from the json file
  async function getQuizData(){
      const response=await fetch('./data.json');
      const data=await response.json();
      return data;
    }

    [...quize.children[0].children].forEach( async (btn)=>{
        const quizData=await getQuizData();
        const quizDataArray=quizData.quizzes;
        btn.addEventListener('click',()=>{
           let quizTitle=btn.getAttribute('id');
           let currentQuizObj=quizDataArray.find((quiz)=>quiz.title===quizTitle);
           showCurrentQuizQuestion(currentQuizObj);
           
        })
    })
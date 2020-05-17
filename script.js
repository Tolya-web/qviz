let searchForm = document.querySelector('#search-form');
let searchFormInput = document.querySelector('input');


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


let newArr = []; //Хранение всех вопросов 
let answerCollect = new Set(); // Хранения всех ответов
let questionArr = ['Эверест самая высокая гора?',
'Нил эта самоя длинная река?',
'1+2=4',
'Лонодон эта столица Франции?',
'Тебе есть 18',
'Припять эта самая длинная река',
'Байкал самое глубоок озеро',
'Москва столица Португалии'];

function createItems(){ // Генерирование по одному вопросу через цикл
    for(let i = 0; i < 8; i++){
        let block = document.createElement('div');
        block.className = `cont${i+1}`;
        block.innerText = `${i+1} `+questionArr[i];
        
        document.getElementById('container').appendChild(block);
        newArr.push(block);
    }
}

function deleteItem(){ //Удаление вопроса после ответа
    newArr.shift();
}

document.getElementById('kviz').addEventListener('click', createItems);
console.log(newArr);

if(SpeechRecognition){
  
    searchForm.insertAdjacentHTML('beforeend', '<button type="button"><i class="fas fa-microphone"></i></button>');

    const microBtn = document.querySelector('button');
    const microIcon = document.querySelector('i');

    console.log('Hi, Chrome');

    let recognition = new SpeechRecognition();

    recognition.continuous = true;

    microBtn.addEventListener('click', () =>{
        if(microIcon.classList.contains('fa-microphone')){
            recognition.start();
            
        } else{
            
            recognition.stop();
        }
    });

    recognition.addEventListener('start', ()=>{
        console.log('Record Start');
        microIcon.classList.remove('fa-microphone');
        microIcon.classList.add('fa-microphone-slash');
    });

    recognition.addEventListener('end', ()=>{
        console.log('Record Finish');
        microIcon.classList.add('fa-microphone');
        microIcon.classList.remove('fa-microphone-slash');
    });

    var yesStr = "да";
    var noStr = "нет";

    var yesCounter = 0;
    var noCounter = 0;
    recognition.addEventListener('result', (event) =>{
        console.log(event);
        /* console.log(event.results)[0][0]; */
        //for( let answer of event.results){
         //   if(answerCollect.length <= 8)
            let i = event.results.length;
            let answer = event.results[i-1];
            let arr = answer[0].transcript.split(' ');
            i = arr.length;
            if(arr[i-1].toLowerCase() === yesStr){
                console.log('Answer --', arr[i-1]);
                answerCollect.add(yesStr); //добавление нового ответа
                yesCounter++;
                if(answerCollect.size <= questionArr.length){ // Удаление вопроса на странице
                    deleteItem();
                    document.getElementById('container').innerHTML = ' ';
                    newArr.map(elem => {
                        document.getElementById('container').appendChild(elem);
                    });
                }
            }
            
            if(arr[i-1].toLowerCase()==='нет'){
                console.log('Answer --', arr[i-1]);
                answerCollect.add('нет'); //добавление нового ответа
                noCounter++;
                if(answerCollect.size <= questionArr.length){ // Удаление вопроса на странице
                    deleteItem();
                    document.getElementById('container').innerHTML = ' ';
                    newArr.map(elem => {
                        document.getElementById('container').appendChild(elem);
                    });
                }
            }
            if(yesCounter+noCounter == 8)
            {
                
                console.log( 'Все ответы -', answerCollect);

                console.log('Количество ответов да = ', yesCounter);
                console.log('Количество ответов нет = ', noCounter);
                microBtn.click();
                

            }
        

        

        /* let resultCurrent = event.results[0][0].transcript;
        searchFormInput.value = resultCurrent;
        setTimeout(()=>{
            searchForm.submit();
        }, 500) */
   

    });



    
} else{
    console.log('no')
}


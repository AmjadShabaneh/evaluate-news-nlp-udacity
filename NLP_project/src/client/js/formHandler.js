import axios from 'axios';
import { checkURL } from './URLChecker';
const serverURL = 'https://localhost:8000/api'
const infoCard = document.querySelector('.card');
const scoreTagEl = infoCard.querySelector('#score-tag');
const agreementEl =  infoCard.querySelector('#agreement');
const ironyEl = infoCard.querySelector('#irony');
const confidenceEl =  infoCard.querySelector('#confidence');
const subjectivityEl = infoCard.querySelector('#subjectivity');
const parentEl = infoCard.parentElement;
const errorElement = document.querySelector(".error");
 


async function handleSubmit(event) {
 
    event.preventDefault();
    
    const input = document.querySelector('#url'); 
    if(!checkURL(input.value)){
        return show_error('Please, enter a Valid url');
    }
    
    try {  
        
        const response = await axios.post('http://localhost:8000/post', {
            input: input.value
        });
        const analysis = response.data.analysis;
        if(analysis.code == 100){
            show_error(analysis.msg);
        }
        if(analysis.code == 0){
            show_info(analysis.sample);
        }
        if(analysis.code == 212){
            show_error(analysis.msg)
        }
        

    } catch (error) {
        console.error('Error:', error);
    }
}
window.addEventListener('DOMContentLoaded',function(){
    const form = document.getElementById('urlForm');

    form.addEventListener('submit', handleSubmit);

})

const show_error=(msg)=>{
     if(parentEl.classList.contains('active')){
        parentEl.classList.remove('active');
        parentEl.classList.add('non-active')
    }
    errorElement.querySelector('.error__title').innerHTML=msg;
    errorElement.classList.remove('non-active')
    errorElement.classList.add("acitive");
   
    
    
}


const show_info = (sample)=>{
    agreementEl.innerHTML="Agreemnt : "+sample.agreement.toLowerCase() ;
    scoreTagEl.innerHTML="Score Tag : "+sample.score_tag.toLowerCase();
    ironyEl.innerHTML="Irony : "+sample.irony.toLowerCase();
    confidenceEl.innerHTML='Confidence : '+ sample.confidence.toLowerCase();
    subjectivityEl.innerHTML = "Subjectivity : "+sample.subjectivity.toLowerCase();
    
    parentEl.classList.remove('non-active')
    parentEl.classList.add('active');
    
    errorElement.classList.remove('active');
    errorElement.classList.add('non-active');
    


}

export { handleSubmit };


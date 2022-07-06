

const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const closeElem = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

const counters = document.querySelectorAll('.skills__ratings-counter');
const lines = document.querySelectorAll('.skills__ratings-line span');

counters.forEach( (item, i) => {
    lines[i].style.width = item.innerHTML;
});


//Smooth scroll
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        const blockID = anchor.getAttribute('href');
        document.querySelector('' + blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}


//Validation and sending emails
// document.addEventListener('DOMContentLoaded', function() {
//     const form = this.getElementById('form');
//     form.addEventListener('submit', formSend);

//     async function formSend(e) {
//         e.preventDefault();

//         let error = formValidate(form);
//     }

//     function formValidate(form) {
//         let error = 0;
//         let formReq = document.querySelectorAll('._req');

//         for (let index = 0; index < formReq.length; index++) {
//             const input = formReq[index];
//             formRemoveError(input);

//             if (input.classList.contains('_email')) {
//                 if (emailTest(input)) {
//                     formAddError(input);
//                     error++;
//                 }
//             } else {
//                 if (input.value === '') {
//                     formAddError(input);
//                     error++; 
//                 }

//             }
//         }
//     }

//     function formAddError(input) {
//         input.parentElement.classList.add('_error');
//         input.classList.add('_error');
//     }
//     function formRemoveError(input) {
//         input.parentElement.classList.Remove('_error');
//         input.classList.Remove('_error');
//     }

//     //function test email
//     function emailTest(input) {
//         return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
//     } 

// });

const forms = () =>{ 
    const form = document.querySelector('form'),
        inputs = document.querySelectorAll('input');
 
 
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы с вами скоро свяжемся',
        failure: 'Что-то пошло не так...'
    };
 
    const postData = async(url, data) =>{
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
 
        return await res.text();
    };
 
    //переменная с функцией по очистке input
    const clearInput = () =>{
        inputs.forEach(item =>{
            item.value = '';
        });
    };
 
 
    
    form.addEventListener('submit', (e) =>{
        e.preventDefault(); 
 
        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        form.appendChild(statusMessage); 
 
 
        const formData = new FormData(form);
 
        postData('mailer/smart.php', formData)
        .then(res =>{
            console.log(res);
            statusMessage.textContent= message.success;
        })
        .catch ( ()=>{
            statusMessage.textContent= message.failure;
        })
        .finally ( ()=>{
            clearInput();
            setTimeout ( ()=>{
                statusMessage.remove();
            },5000);
        });
 
 
    });
    
};
 
forms();        

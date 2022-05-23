const inputs = [...document.querySelectorAll('input')];
console.log(inputs[3].value);


(function getMinDate () {
    let date = document.getElementById('date');
    let today = new Date();
    let day = today.getDate() + 1;
    var month = today.getMonth() + 2;
    var year = today.getFullYear();
    if (day < 10) {
        day ='0'+ day
    } 
    if (month < 10) {
        month ='0' + month
    } 
    if (day === '31' && month === '12') {
        year += 1;
    }

    tomorrow = year + '-' + month +'-' + day;
    date.setAttribute("min", tomorrow);
})();


inputs.forEach(input =>  {
    input.addEventListener('focusout', () => {
        let valid = input.checkValidity();
        if (!valid) {
            input.classList.add('invalid');
            let container = input.parentElement;
            container.classList.add('invalid');
        }
        else {return}
    })
    input.addEventListener('focusin', () => {
            input.classList.remove('invalid');
            let container = input.parentElement;
            container.classList.remove('invalid');
    })
})

const form = document.querySelector('.card');
const confirm = document.querySelector('.confirm');
form.addEventListener('change', () => { 
let valid = inputs.every(input => input.checkValidity());
if (valid) {
    confirm.removeAttribute('disabled');
};
});

const check = [...document.getElementsByName('gift')];
const gifts = document.querySelector('.gifts');

check.forEach((element) => {
    element.addEventListener("change", () => {
    let number = 0;
    const unchecked = [...gifts.querySelectorAll('input[type="checkbox"]:not(:checked)')];
    for (let i = 0; i < check.length; i++) {
        if (check[i].checked == true) { 
        number += 1;
        }
    }
    if (number >= 2) {
        unchecked.map(element => element.setAttribute('disabled', true));
    }
    else {unchecked.map(element => element.removeAttribute('disabled'));}
})
})


confirm.addEventListener('click', () => {
    let sum = document.createElement('div');
    sum.className = 'sumBox';
    sum.innerHTML = "The order created. The delivery address is " + inputs[3].value +  
    " street house " + inputs[4].value + " flat " + inputs[5].value + ". Customer " + inputs[0].value + " " + 
    inputs[1].value + ".";
    document.body.firstElementChild.style.visibility = "hidden";
    document.body.append(sum);
})




const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateElement = document.getElementById('date-picker');

const countdownEL = document.getElementById('countdown');
const countdownTitleEL = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const complete = document.getElementById('complete');
const completeInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 60;

// To set date min val to current date
const today = new Date().toISOString().split('T')[0];
dateElement.setAttribute('min', today);

// Populate countdown
function updateDOM() {
    countdownActive = setInterval(()=>{

    const now = new Date().getTime();
    const distance = countdownValue - now;
    
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Hide input container
    inputContainer.hidden = true; 

    if(distance < 0){
        countdownEL.hidden = true;
        clearInterval(countdownActive);
        completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
        complete.hidden = false;
    } else {
        // Populate time elements
        countdownTitleEL.textcontent = `${countdownTitle}`;
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;
        complete.hidden = true;
        countdownEL.hidden = false;
    }
    }, second);
}

function updateSubmission(event) {
    event.preventDefault();
    countdownTitle = event.srcElement[0].value;
    countdownDate = event.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
   
    // Check if countdate is valid or not
    if(countdownDate === '') {
        alert('Please select a valid date!');
    } else {
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
    }
}

// Reset all values
function reset() {
    // show input container
    countdownEL.hidden = true;
    complete.hidden = true;
    inputContainer.hidden = false;
    // Show countdown timer
    clearInterval(countdownActive);

    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
    // Get countdown from local storage if available
    if(localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event Listeners
countdownForm.addEventListener('submit', updateSubmission);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On load
restorePreviousCountdown();
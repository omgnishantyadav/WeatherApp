// http://api.weatherapi.com/v1/current.json?key=fec54a9ca3c840379d0191742250606&q=Delhi, IN&aqi=no

const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time_location p");
const dateandTimeField = document.querySelector(".time_location span");
const weatherField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector('form');

form.addEventListener('submit', searchForLocation);

let target = 'Lucknow';

const fetchResults = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=fec54a9ca3c840379d0191742250606&q=${targetLocation}&aqi=no`;

    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;

    updateDetails(temp, locationName, time, condition);
}

function updateDetails(temp, locationName, time, condition) {
    // time format: "2022-09-26 12:12"
    let splitDate = time.split(' ')[0];
    let splitTime = time.split(' ')[1];
    let currentDayNumber = new Date(splitDate).getDay();
    let currentDay = getDayName(currentDayNumber);

    temperatureField.innerText = temp;
    locationField.innerText = locationName;
    dateandTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    weatherField.innerText = condition;
}

function searchForLocation(e){
    e.preventDefault();
    target = searchField.value;
    fetchResults(target);
}

fetchResults(target);

function getDayName(number) {
    switch (number) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Invalid day";
    }
}


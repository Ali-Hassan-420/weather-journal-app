/* Global Variables */

const button = document.getElementById('generate');
var date = document.getElementById('date');
var tempreture = document.getElementById('temp');
var content = document.getElementById('content');
var zip = document.getElementById('zip');
var feeling = document.getElementById('feelings');

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+' '+ monthNames[d.getMonth()]+' '+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const API = 'http://api.openweathermap.org/data/2.5/forecast?zip='
const key = '&appid=f6afba687400634f89a301115bcebca5'

// Event listener to add function to existing HTML DOM element
button.addEventListener('click',changeDate);

/* Function called by event listener */
function changeDate() {
    const newZip = zip.value
    getWeather(API,newZip,key)

    .then(function(data){
        console.log(data)
        postData('/add', {date:d, temp:data.list[0].main.temp, content:feeling})
        updateUI()
    })
}

/* Function to GET Web API Data*/
const getWeather = async(API,newZip,key) => {
    const respond = await fetch(API+newZip+key)
    try {
        const data = await respond.json();
        return data
    } catch (error) {
        console.log("error", error)
    }
}

/* Function to POST data */
const postData = async (url='', data = {}) => {
    console.log(data);
    const respond = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content.type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await respond.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error)
    }
}

/* Function to GET Project Data */

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json
        date.innerText = newDate
        content.innerText = `i'm feeling ${feeling.value}`
        tempreture.innerText = `${allData[0].temp} °C`
    } catch (error) {
        console.log("error", error)
    }
}
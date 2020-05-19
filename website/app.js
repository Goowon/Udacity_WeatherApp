/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&APPID=9a12e3c54854671e8f78365cb6941a10&units=imperial';

// Create a new date instance dynamically with JS
function getDate() {
    let d = new Date();
    let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    return newDate;
}

document.getElementById('generate').addEventListener('click', performAction);

function performAction(event) {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL, zipCode, apiKey)
    .then(data => {
        console.log(data);
        postWeather('/addData',
        {
            temp: data.main.temp,
            date: getDate(),
            feelings: feelings,
        });
    })
    .then(updateUI);
}

const getWeather = async (baseURL, zipCode, apiKey) => {
    // console.log(zipCode);
    const res = await fetch(baseURL + zipCode + apiKey);
    try {
      const data = await res.json();
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
}

const postWeather = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log('error', error);
        // appropriately handle the error
    }
}

const updateUI = async () => {
    const request = await fetch('/data');
    try {
        const data = await request.json();
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('temp').innerHTML = data.temp;
        document.getElementById('content').innerHTML = data.feelings;
    } catch(error) {
        console.log('error', error);
    }
}


/* Global Variables */
// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=ad30af5c3f51551fb83130a595b64d8a&units=imperial';

// Create a new date instance dynamically with JS
 let d = new Date();
let newDate = (d.getMonth() + 1)+'.'+ d.getDate()+'.'+ d.getFullYear(); 
console.log('newDate ', newDate);

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', callBack);


/* Function called by event listener */
function callBack() {
    let zip = document.getElementById('zip').value;
    let feel = document.getElementById('feelings').value;
    getApi(baseURL,apiKey,zip)
    
    .then (function(data){
      console.log('data to push to server', data);
      postData('/add', {date: newDate, temp: data.main.temp, content: feel});
      
      updataUI()
    })
    
};

/* Function to GET Web API Data*/
const getApi = async (baseURL, apiKey, zip)=>{
    
  const res = await fetch(baseURL + zip + apiKey);
  try {
      const data = await res.json();
      console.log("Web API Data", data)
      return data;
  }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
  }
}

/* Function to updataUI  */
const updataUI = async () =>{ 
  const request = await fetch('/all');
  try {
  // Transform into JSON
  const allData = await request.json();
  console.log('alldata get from server in function', allData);
  for(const key in allData){
    document.getElementById(`${key}`).innerHTML = `<p>${allData[`${key}`]}</p>`;
  }
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
       // console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }


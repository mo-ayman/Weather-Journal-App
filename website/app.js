/* Global Variables */
// Personal API Key for OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = ',us&appid=ad30af5c3f51551fb83130a595b64d8a';

// Create a new date instance dynamically with JS
 let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear(); 
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
      postData('/add', {date: newDate, temperature: data.main.temp, feelings: feel});
      
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
  document.getElementById('date').innerHTML = `<p>${allData.date}</p>`;
  document.getElementById('temp').innerHTML = `<p>${allData.temperature}</p>`;
  document.getElementById('content').innerHTML = `<p>${allData.feelings}</p>`;
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


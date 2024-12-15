console.log('js client side') //checking if client side JS is working
// DOM Variables
const searchBox = document.getElementById('search-box')
const results = document.getElementById('results-forecast')
const resultsTitle = document.getElementById('results-title')
const weatherForm = document.getElementById('weather-form')
const currentTime = document.getElementById('results-time')
const resultContainer = document.getElementById('results-container')
const timezone = document.getElementById('results-timezone')
const weatherIcon = document.getElementById('results-icon')
const weatherAnimation = document.getElementById('weather-animations')




// Checkbox JS
const checkboxes = document.querySelectorAll('.checkbox')

checkboxes.forEach(checkbox => { //checking each checkbox if they have been clicked, if so then unclick the last checkbox
  checkbox.addEventListener('click', () => {
    checkboxes.forEach(otherCheckbox => {
      if (otherCheckbox !== checkbox) {
        otherCheckbox.checked = false;
      }
    });
  });
});

// function to get checkbox value
function getCheckedValue() {
  const checkedCheckbox = Array.from(checkboxes).find(checkbox => checkbox.checked); //finding active checkbox
  
  if (checkedCheckbox) {
    return checkedCheckbox.value; //return checkbox value
  } else {
    resultsTitle.innerHTML = 'Error:'
    results.innerHTML = 'Please choose a unit'
    return null; // no checkbox is checked
  }
}

// function that capitilize sentences based periods
function capitalizeSentence(sentence) { 
  const sentences = sentence.split('. ');
  const capitalizedSentences = sentences.map(sentence => {
    return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
  });
  return capitalizedSentences.join('. ');
}

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  resultContainer.classList.remove('displayNone')
  
  // Clear previous results
  resultsTitle.innerHTML = 'Loading...';
  results.innerHTML = '';
  currentTime.innerHTML = '';
  timezone.innerHTML = '';
  weatherIcon.innerHTML = '';
  weatherAnimation.innerHTML = '';


  // Get location and unit
  let locationValue = searchBox.value.trim();
  let checkboxValue = getCheckedValue();

  if (!checkboxValue) return;  //if there is no value for unit then code stops

  fetch(`/weather?address=${locationValue}&unit=${checkboxValue}`).then((response) => {
    response.json().then((data) => {
      // Check if there's an error in the response
      if (data.errorMessage) {
        resultsTitle.innerHTML = 'Error:'
        results.innerHTML = `${data.errorMessage}`
        currentTime.innerHTML = '';
        timezone.innerHTML = '';
        weatherIcon.innerHTML = '';
        weatherAnimation.innerHTML = '';
        return
      } else {
        // Display results if no error
        resultsTitle.innerHTML = `${data.location}`
        results.innerHTML = capitalizeSentence(`${data.address} is ${data.forecast.description}`) // displaying the forecast data
        currentTime.innerHTML = `Time: ${data.forecast.currentTime}`
        timezone.innerHTML = `Timezone: ${data.forecast.timezone}`;
        weatherIcon.innerHTML =`<img src="${data.forecast.weatherIcon}" alt="${data.forecast.description}">`;
        weatherAnimation.innerHTML = '';
      }
      //catching parsing JSON errors
    }).catch((err) => {
      resultsTitle.innerHTML = 'Error:'
      results.innerHTML = 'There was an issue with fetching the weather data.'
      currentTime.innerHTML = '';
      timezone.innerHTML = '';
      weatherIcon.innerHTML = '';
      weatherAnimation.innerHTML = '';
    });
    // catch any network errors or failed requests
  }).catch((err) => {
    resultsTitle.innerHTML = 'Error:'
    results.innerHTML = 'Unable to connect to the weather service.'
    currentTime.innerHTML = '';
    timezone.innerHTML = '';
    weatherIcon.innerHTML = '';
    weatherAnimation.innerHTML = '';
  });
});

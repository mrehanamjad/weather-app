// my main function : issue is the preventDefault works the first time but not subsequently,
// function main() {
//   let form = document.querySelector("form");
//   let input = document.querySelector("input");

//   form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     let inputVal = input.value;
//     let url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${inputVal}`;
//     weather(url);
//   });
// }

// isue in above main function :
// Reason for this issue : In above main function, we're querying for the form and input elements, but this might be an issue if these elements are dynamically added or removed from the DOM. To avoid this, consider using event delegation to handle the form submission.
//The issue in above code may arise from the way we're attaching the event listener to the form. When you use document.querySelector("form"), it selects the first form element it finds when the page loads. If the form is dynamically added or removed later, the event listener might not be attached to the new form.
// Potential Issue:
// If the form is dynamically added or removed after the initial page load, the event listener might not be attached to the new form.

// correct of the issue : catgpt main function only
//Advantages of the Updated Code:
// Event delegation allows you to handle events for elements that are dynamically added or removed from the DOM.
// The event listener is attached to the document, making it more flexible and capable of handling forms regardless of when they are added.
// By using event delegation, the code ensures that the form submission event is captured even if forms are dynamically manipulated on the page, making it more robust and adaptable to changes in the DOM structure.

function main() {
  //attaches a submit event listener to the entire document:
  document.addEventListener("submit", (event) => {
    // hecks if the event originated from a form element. This ensures that the event handler is triggered only when a form is submitted:
    if (event.target.tagName.toLowerCase() === "form") {
      // Prevent the default form submission behavior
      event.preventDefault();
      let inputVal = event.target.querySelector("input").value;
      let url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${inputVal}`;
      weather(url);
    }
  });
}

function weather(url) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "3692888d4cmsh315053870445bb4p11ba46jsn9a498b532447",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  async function getWeather() {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      displayData(data);
    } catch (error) {
      console.error(error);
      alert("Please enter correct name of city!");
    }
  }
  getWeather();
}

function displayData(data) {
  let wIcon;
  if (
    data.current.condition.text == "Sunny" ||
    data.current.condition.text == "Clear"
  ) {
    wIcon = "fa-sun";
  } else if (data.current.condition.text == "Overcast") {
    wIcon = "fa-cloud";
  } else if (
    data.current.condition.text == "Mist" ||
    data.current.condition.text == "Fog"
  ) {
    wIcon = "fa-solid fa-smog";
  } else {
    wIcon = "fa-cloud-sun";
  }

  let container = document.querySelector(".container");
  container.innerHTML = `<form action="">
    <input type="text" placeholder="Enter city" />
    <button><i class="fa-solid fa-magnifying-glass"></i></button>
  </form>
  
  <h3><i class="fa-solid fa-location-dot"></i> ${data.location.name}, ${data.location.country}</h3>
  <p>Updated: ${data.location.localtime}</p>
  <div class="current-temp">
    <h1>${data.current.temp_c}<sup>°</sup></h1>
    <h2><i class="fa-solid ${wIcon}"></i> ${data.current.condition.text}</h2>
    </div>
    <h3>Feels Like: ${data.current.feelslike_c}</h3>
  <div class="condition-c">
    <div class="condition condition1"><i class="fa-solid fa-wind"></i><p>&#160 Wind: ${data.current.wind_kph} km/h</p></div>
    <div class="condition condition2"><i class="fa-solid fa-droplet"></i><p> &#160 Humidity: ${data.current.humidity} %</p></div>
    <div class="condition condition3"><i class="fa-solid fa-arrows-down-to-line"></i><p> &#160 Pressure: ${data.current.pressure_mb} mb</p></div>
    <div class="condition condition4"><i class="fa-regular fa-snowflake"></i>&#160 <p>Precipitation: ${data.current.precip_mm} mm</p></div>
  </div>`;
}

main();

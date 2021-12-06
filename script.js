
// Tabell
const stationTableinfo = document.querySelector(".list-body");
// Knapp function toll Konverteringen
const celsiustoferenheitBtn = document.querySelector(".celsiustoferenheit-btn");
// Knapp funktion till Sorteringen
const sortBtn = document.querySelector(".sort-btn");


let viewasFahrenheit = false;
let ctofh = false;
let sorthigh = false;
let localData = [];

// Hämtar data
function getDatasmhi(){
  fetch("https://opendata-download-metobs.smhi.se/api/version/latest/parameter/22/station/98210/period/latest-months/data.json")
    .then((response) => response.json().then((data) => {
        localData = data;
        htmlfront();
    }))
}

// Skickar data ut i en Tabell
function htmlfront() {
    var html = localData.value
        .map(
            (value) =>
                `<tr> 
            <td>${localData.station.name}</td>
            <td>${localData.station.owner}</td>
            <td>${(value.ref)}</td>
            <td>${viewasFahrenheit? ctoF(value.value): value.value}</td>
        </tr>`
        )
        .join("");

    stationTableinfo.innerHTML = html;
}

// Sorterar efter datum 
sortBtn.addEventListener("click", function(){
    console.log(sorthigh);
    if (sorthigh) {
        localData.value.sort(function(a, b){return a.from - b.from});
    }
    else {
        localData.value.sort(function(a, b){return b.from - a.from});
    }
    sorthigh = !sorthigh;
    htmlfront();
})

// Konverterar Celcius till Fahrenheit
celsiustoferenheitBtn.addEventListener("click", function(){
    viewasFahrenheit = !viewasFahrenheit;
    if(viewasFahrenheit){
        ctofh = !ctofh;
        document.getElementById("c").innerText = "Fahrenheit"
    }
    else{
        document.getElementById("c").innerText = "Celcius"
    }
    htmlfront();
})

// En funktion som räknar vad Celcius blir i Fahrenheit
function ctoF(temperature){
    return (temperature * 9/5) + 32;
}

getDatasmhi();
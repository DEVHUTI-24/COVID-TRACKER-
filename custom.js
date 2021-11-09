
// Get the container to hold the IO globe
var container = document.getElementById( "globalArea" );
// Create Gio.controller
var controller = new GIO.Controller( container );
//Style
controller.setSurfaceColor("#ffffff");
controller.setSelectedColor("#FF0000");
controller.lightenMentioned(true);
controller.adjustMentionedBrightness(1);
controller.adjustOceanBrightness(0.8);
controller.setInitCountry("IN");
controller.onCountryPicked( callback );
controller.setTransparentBackground( true );
controller.setHaloColor("white");
controller.addData( data );

//Variables
var countryCode="in";
var countryName="India";
var modal = document.getElementById("moModal");
var span = document.getElementsByClassName("moclose")[0];
var x = window.matchMedia("(max-width: 2510px)")
var y = window.matchMedia("(max-width: 1463px)")
function callback ( selectedCountry, relatedCountries ) {

    countryCode= selectedCountry.ISOCode;
    countryName=selectedCountry.name;
   console.log(countryCode);
    covidData(countryCode);
    if (!x.matches) {
        modal.style.display = "block";
        return
    }
    if (y.matches) {
        modal.style.display = "block";
    }


}

covidData(countryCode);
totalCovidData();

function covidData(countryCode) {

    fetch("https://covid-19-data.p.rapidapi.com/country/code?format=undefined&code="+countryCode, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
            "x-rapidapi-key": "7ebe6d9de4msh5f8f2947e297fafp17f235jsn80f495ed37bc"
        }
    })

        .then(response => {
            response.json().then(function(data) {
                dataExtract(data)
            });
        })
        .catch(err => {
            console.log(err);
        });
}

function totalCovidData() {
    fetch("https://covid-19-data.p.rapidapi.com/totals?format=undefined", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
            "x-rapidapi-key": "7ebe6d9de4msh5f8f2947e297fafp17f235jsn80f495ed37bc"
        }
    })
        .then(response => {
            response.json().then(function(data) {
                totaldataExtract(data)
            });
        })
        .catch(err => {
            console.log(err);
        });
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function dataExtract(coData){
   var confirmed = coData[0].confirmed
   var recovered = coData[0].recovered
   var  deaths = coData[0].deaths
    document.getElementsByClassName("current")[0].innerHTML=countryName;
    document.getElementsByClassName("confirmed")[0].innerHTML=confirmed;
    document.getElementsByClassName("recovered")[0].innerHTML=recovered;
    document.getElementsByClassName("deaths")[0].innerHTML=deaths;
    document.getElementsByClassName("current")[1].innerHTML=countryName;
    document.getElementsByClassName("confirmed")[1].innerHTML=confirmed;
    document.getElementsByClassName("recovered")[1].innerHTML=recovered;
    document.getElementsByClassName("deaths")[1].innerHTML=deaths;
}

function totaldataExtract(totalCodata){
    var total_confirmed=totalCodata[0].confirmed;
    var total_recovered = totalCodata[0].recovered;
    var  total_deaths = totalCodata[0].deaths;
    console.log(total_confirmed,total_recovered,total_deaths);
    document.getElementsByClassName("total_confirmed")[0].innerHTML=total_confirmed;
    document.getElementsByClassName("total_confirmed")[1].innerHTML=total_confirmed;
    document.getElementsByClassName("total_recovered")[0].innerHTML=total_recovered;
    document.getElementsByClassName("total_recovered")[1].innerHTML=total_recovered;
    document.getElementsByClassName("total_deaths")[0].innerHTML=total_deaths;
    document.getElementsByClassName("total_deaths")[1].innerHTML=total_deaths;

}

controller.init();


function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
function data(){

let input = $("#searchtext").val()

suggestion(input);

var xhr = $.get("http://api.giphy.com/v1/gifs/search?q="+input+"+&api_key=d76457AolbbJVuSHxKwsvJCwYuawYgGf&limit=30");

xhr.done(function(res) { 
    
console.log("success got response", res); 
let gifs = res.data
for (gif in gifs){
    $('.gif-section').append("<img class='test' src='"+gifs[gif].images.original.url+"' style='height:350px; width:350px;' />")
}  

});
}

function suggestion(input){
    // url Async requesting function
function httpGetAsync(theUrl, callback)
{
    // create the request object
    var xmlHttp = new XMLHttpRequest();

    // callback  capture the response c
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }

 
    xmlHttp.open("GET", theUrl, true);

    // call send 
    xmlHttp.send(null);

    return;

}

// Tenor API Suggestion

// callback for share event
function tenorCallback_searchSuggestion(responsetext)
{
    var response_objects = JSON.parse(responsetext);

    predicted_words = response_objects["results"];

    document.getElementById("ac_0").innerHTML = "Search Suggestion: ";
    document.getElementById("ac_1").innerHTML = predicted_words[0];
    document.getElementById("ac_2").innerHTML = predicted_words[1];
    document.getElementById("ac_3").innerHTML = predicted_words[2];
    document.getElementById("ac_4").innerHTML = predicted_words[3];
}
//search term
psearch_term = input;

// anon_id = <from cookies>
anon_id = "dc70eb91ee1644c8a44eb150d81b0837"; 

var apikey = "LIVDSRZULELA";
var lmt = 5;

// using default locale of en_US
var autoc_url = "https://api.tenor.com/v1/search_suggestions?key=" + apikey + "&tag=" + psearch_term
    + "&anon_id=" + anon_id + "&limit=" + lmt;

// send search suggestion request
httpGetAsync(autoc_url,tenorCallback_searchSuggestion);
}



function reloadPage() {
    location.reload(false);
}

function getChar(event) {
    if (event.which === null) return String.fromCharCode(event.keyCode); 
    else if (event.which !== 0 && event.charCode !== 0) return String.fromCharCode(event.which);   
    return null; 
  }
  
  document.getElementById('searchtext').onkeyup = function(event) {
    if (this.value.length === 0) {
      reloadPage();
    }
  }

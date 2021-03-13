
var quoteAPI = 'https://quote-garden.herokuapp.com/api/v3/quotes'
var fontAPI = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyApTTfxzWtDTJAFO8DS8W5vBBqqPCCKmUs'
var quoteDisplayEl = document.querySelector('.quote');
var fontNameDisplay = document.querySelector('.font-name');
var familyDisplayEl = document.querySelector('.font-name');
var fontData  
var quoteData


//Fetch information from Google fonts API and stores in variable
fetch(fontAPI)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        fontData = data;
        renderNewFont ();
    });
       

//function to randomly apply new font to card elements
    function renderNewFont () {
        var item = Math.floor(Math.random() * 100); 
        console.log(item);
        
        console.log(fontData);
        // link to download
        console.log(fontData.items[item].files.regular);
        // serif/sans
        console.log(fontData.items[item].category);
        // family
        console.log(fontData.items[item].family);

        var currentFontFamily = fontData.items[item].family;
        console.log(currentFontFamily);

        //append new stylesheet to head
        $("head").append("<link href='https://fonts.googleapis.com/css2?family=" + currentFontFamily + "' rel='stylesheet'>");
        
        //applies font family to card content
        fontNameDisplay.style.fontFamily = currentFontFamily;
        quoteDisplayEl.style.fontFamily = currentFontFamily;

        displayFont(fontData.items[item].family, fontData.items[item].category);


    };

//Fetch information from Quote Garden API and store in variable
fetch(quoteAPI)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        quoteData = data;
        renderNewQuote();
    });

//function to randomly apply new quote to card elements
function renderNewQuote(){
        
        var item = Math.floor(Math.random() * 10); 
        console.log(item);

        console.log(quoteData);
        // quote
        console.log(quoteData.data[item].quoteText);
        //author
        console.log(quoteData.data[item].quoteAuthor);

        displayQuote(quoteData.data[item].quoteText, quoteData.data[item].quoteAuthor)

        quoteAuthor = quoteData.data[item].quoteAuthor;
        quoteText = quoteData.data[item].quoteText;
        quoteInfo = quoteText + " -" + quoteAuthor;

    };

//displays font name and category to card--- need to add randomizer
function displayFont(fontFamily, fontCategory) {

            fontNameDisplay.textContent = fontFamily + ", " + fontCategory;

        }

//displays quote to card--- need to add randomizer
function displayQuote(quoteText, quoteAuthor) {

            quoteDisplayEl.textContent = '"' + quoteText + '"' + " -" + quoteAuthor;

        }


//Function to save information
function saveFont() {
            M.toast({ html: 'Clicked!' })
        };


// Function to go to favorites page
function goToFavoritesPage () {
  window.location.href = "favorite.html"
};

//Favorite button for user to save information
document.getElementById('favorite-btn').addEventListener("click", saveFont);

//Go to favorites page
document.getElementById('favorite-page-btn').addEventListener("click", goToFavoritesPage);


displayFont();
displayQuote();


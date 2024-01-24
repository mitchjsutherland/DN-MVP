
const baseCurrencyButton = document.getElementById("baseCurrencyButton");

const baseCurrencyButtonImg = createFlagImage("GB");

const convertedCurrencyButton = document.getElementById("convertedCurrencyButton");

const convertedCurrencyButtonImg = createFlagImage("US");

const baseCurrencyInputElement = document.getElementById("baseCurrencyInput");

const convertedCurrencyInputElement = document.getElementById("convertedCurrencyInput");

const baseCurrencyDropdown = document.getElementById("baseCurrencyDropdown");

const convertedCurrencyDropdown = document.getElementById("convertedCurrencyDropdown");

const baseCurrencyDropdownSearchBar = createSearchBar();

const convertedCurrencyDropdownSearchBar = createSearchBar();

const toggleButton = document.getElementById("toggleButton");

let conversionRate;

let flag;

const currencyCodeToCountryCode = {

  "AUD": "AU",
  "BGN": "BG",
  "BRL": "BR",
  "CAD": "CA",
  "CHF": "CH",
  "CNY": "CN",
  "CZK": "CZ",
  "DKK": "DK",
  "EUR": "EU",
  "GBP": "GB",
  "HKD": "HK",
  "HUF": "HU",
  "IDR": "ID",
  "ILS": "IL",
  "INR": "IN",
  "ISK": "IS",
  "JPY": "JP",
  "KRW": "KR",
  "MXN": "MX",
  "MYR": "MY",
  "NOK": "NO",
  "NZD": "NZ",
  "PHP": "PH",
  "PLN": "PL",
  "RON": "RO",
  "SEK": "SE",
  "SGD": "SG",
  "THB": "TH",
  "TRY": "TR",
  "USD": "US",
  "ZAR": "ZA"

};


async function getExchangeRates(baseCurrency) {

  try {

    const response = await fetch(`https://api.frankfurter.app/latest?from=${baseCurrency}`);

    const data = await response.json();

    return data.rates;
      
  } 
  
  catch (error) {

    console.error("Error fetching exchange rates:", error);

    throw error;

  }

}

  
async function getAvailableCurrencies(){

  try{

  const resp = await fetch(`https://api.frankfurter.app/currencies`);
  
  const currenciesObject = await resp.json();
 
  return currenciesObject;

  }

  catch (error){

    console.error("Error fetching currencies:", error);

    throw error;

  }

}


async function getCurrentCountryCodes(){

  try{

      const resp = await fetch(`https://api.vatcomply.com/geolocate`)

      const data = await resp.json();
    
      return {

                country_code: data.country_code,

                currency_code: data.currency,

      }

     }

  catch (error) {

  console.error("Error fetching country's codes:", error);

  throw error;

  }

}


function createFlagImage(countryCode){

  const flagImage = document.createElement('img');

  let imageUrl = `https://hatscripts.github.io/circle-flags/flags/${countryCode.toLowerCase()}.svg`;

  flagImage.src = imageUrl;

  flagImage.alt = countryCode;

  return flagImage;

}

function updateFlagImage(flagImage,countryCode){

  let imageUrl = `https://hatscripts.github.io/circle-flags/flags/${countryCode.toLowerCase()}.svg`;

  flagImage.src = imageUrl;

  flagImage.alt = countryCode;

}

function updateButton(button,buttonImage,buttonText){

  button.textContent = buttonText;

  button.appendChild(buttonImage);

}

function createSearchBar(){

  const searchBar = document.createElement("input");

  searchBar.type = "text";

  searchBar.placeholder = "Search currency ...";

  //searchBar.setAttribute("id", "searchBar");

  searchBar.setAttribute("maxlength","19");

  return searchBar;

}


async function getConversionRate(fromCurrency,toCurrency){

   const rates = await getExchangeRates(fromCurrency);
   
   const rate = rates[toCurrency];

   return rate;

}


function formatTotal(total){

  return total.toLocaleString(undefined, {

                                              minimumFractionDigits: 2,

                                              maximumFractionDigits: 2,

  });

}


function deformatTotal(total){

  return total.replace(/,/g,"");

}


function convertTotal(total){
   
        return total * conversionRate;

}


async function buildDropdown(dropdownElement, searchBar , currencies){

  dropdownElement.appendChild(searchBar);

  for(const [currencyCode, currencyName] of Object.entries(currencies)){

    const listItem = document.createElement("li");

    listItem.classList.add("dropdown-item");

    let countryCode = currencyCodeToCountryCode[currencyCode];

    let flagImage = createFlagImage(countryCode);

    listItem.textContent = `${currencyCode} ${currencyName}`;

    listItem.appendChild(flagImage);

    //more flexible way of adding text to a container with img element

    //listItem.appendChild(document.createTextNode(`${currencyCode} ${currencyName}`)); 

    dropdownElement.appendChild(listItem);

  }
 
}

function filterDropdown(dropdownMenu, searchValue){

  const dropdownMenuItems = dropdownMenu.getElementsByClassName("dropdown-item");

  for(const item of dropdownMenuItems){

    const text = item.textContent.toLowerCase();

    const shouldShow = text.includes(searchValue.toLowerCase());

    item.style.display = shouldShow ? "block" : "none";

  }

}


function unFilterDropdown(dropdownMenu){

  const dropdownMenuItems = dropdownMenu.getElementsByClassName("dropdown-item");

  const dropdownMenuItemsArray = Array.from(dropdownMenuItems);

  dropdownMenuItemsArray.forEach(item => item.style.display = "block");

}




async function initiateCurrencyConverter(){  
 
 baseCurrencyInputElement.setAttribute("currency","GBP");

 convertedCurrencyInputElement.setAttribute("currency","USD");

 conversionRate = await getConversionRate("GBP", "USD");

 updateButton(baseCurrencyButton, baseCurrencyButtonImg, "GBP");

 updateButton(convertedCurrencyButton, convertedCurrencyButtonImg, "USD");

 flag = "top";

 const currencies = await getAvailableCurrencies();

 await buildDropdown(baseCurrencyDropdown, baseCurrencyDropdownSearchBar, currencies);

 await buildDropdown(convertedCurrencyDropdown,convertedCurrencyDropdownSearchBar, currencies);

}

function toggleCurrencyConverter(){

    // Swap input values

    const topInputValue = baseCurrencyInputElement.value;

    const bottomInputValue = convertedCurrencyInputElement.value;
  
    baseCurrencyInputElement.value = bottomInputValue;

    convertedCurrencyInputElement.value = topInputValue;
  
    // Swap currency attributes

    const topCurrency = baseCurrencyInputElement.getAttribute("currency");

    const bottomCurrency = convertedCurrencyInputElement.getAttribute("currency");
  
    baseCurrencyInputElement.setAttribute("currency", bottomCurrency);

    convertedCurrencyInputElement.setAttribute("currency", topCurrency);

    //Swap currency codes on buttons

    Array.from(baseCurrencyButton.childNodes).forEach(node => {

      if (node.nodeType === Node.TEXT_NODE) {

          baseCurrencyButton.removeChild(node);

      }

      });
    
    Array.from(convertedCurrencyButton.childNodes).forEach(node => {

      if (node.nodeType === Node.TEXT_NODE) {

          convertedCurrencyButton.removeChild(node);

      }

      });
    
    baseCurrencyButton.appendChild(document.createTextNode(bottomCurrency));

    convertedCurrencyButton.appendChild(document.createTextNode(topCurrency));
   
    // Swap flag images

    const topFlag = currencyCodeToCountryCode[bottomCurrency];

    const bottomFlag = currencyCodeToCountryCode[topCurrency];
  
    updateFlagImage(baseCurrencyButtonImg, topFlag);

    updateFlagImage(convertedCurrencyButtonImg, bottomFlag);

    // Swap dropdown search bar values (if any)

    const topSearchValue = baseCurrencyDropdownSearchBar.value;

    const bottomSearchValue = convertedCurrencyDropdownSearchBar.value;
  
    baseCurrencyDropdownSearchBar.value = bottomSearchValue;

    convertedCurrencyDropdownSearchBar.value = topSearchValue;
  
    // Reset dropdown filtering

    unFilterDropdown(baseCurrencyDropdown);

    unFilterDropdown(convertedCurrencyDropdown);

    //change flag -> currency conversion direction

    flag = (flag === "top") ? "bottom" : "top";

}


function getConversionCurrencies(e,currencyInputElement){

  const optionValue = e.target.textContent;

  const fromCurrency = optionValue.split(" ")[0];

  const toCurrency = currencyInputElement.getAttribute("currency");

  return [fromCurrency, toCurrency];

}


initiateCurrencyConverter();


function isNumeric(value) {

  // Regular expression to allow only digits, dots, and commas

  const regex = /^[0-9.,]*$/;

  return regex.test(value);

}


async function performConversion(sourceCurrencyInput, destinationCurrencyInput) {

  let fromCurrency = sourceCurrencyInput.getAttribute("currency");

  let toCurrency = destinationCurrencyInput.getAttribute("currency");

  sourceCurrencyInput.value = deformatTotal(sourceCurrencyInput.value);

  const sourceTotal = sourceCurrencyInput.value;

  if(fromCurrency === toCurrency){

    destinationCurrencyInput.value = formatTotal(sourceTotal);

  }

  else{

    if(isNaN(sourceTotal)){

      destinationCurrencyInput.value = "";

    }

    else{

      destinationCurrencyInput.value = formatTotal(convertTotal(sourceTotal));

    }

  }

}


baseCurrencyInputElement.addEventListener('input',async function(){
  
  const sourceCurrencyInput = baseCurrencyInputElement;

  const destinationCurrencyInput = convertedCurrencyInputElement;

  if(flag === "bottom"){

    flag = "top";

    conversionRate = 1 / conversionRate;

  }
  
  await performConversion(sourceCurrencyInput,destinationCurrencyInput)});


convertedCurrencyInputElement.addEventListener('input',async function(){

  const sourceCurrencyInput = convertedCurrencyInputElement;

  const destinationCurrencyInput = baseCurrencyInputElement;

  if(flag === "top"){

    flag = "bottom";

    conversionRate = 1 / conversionRate;

  }
  
  await performConversion(sourceCurrencyInput,destinationCurrencyInput)});


baseCurrencyInputElement.addEventListener('keypress', function (event) {

  let topInputValue = baseCurrencyInputElement.value;

  let decimalPointCount = (topInputValue.match(/[.]/g) || []).length;

  if (!isNumeric(event.key) || ( event.key === "." && decimalPointCount > 0)) {

    event.preventDefault();

  }

});


convertedCurrencyInputElement.addEventListener('keypress', function (event) {

  let bottomInputValue = baseCurrencyInputElement.value;

  let decimalPointCount = (bottomInputValue.match(/[.]/g) || []).length;

  if (!isNumeric(event.key) ||( event.key === "." && decimalPointCount > 0)) {

    event.preventDefault();

  }

});


baseCurrencyDropdown.addEventListener("click", async function(e){

  if (e.target.tagName.toLowerCase() === "input" || e.target.tagName.toLowerCase() !== "li") {

    return;

  }

  const [fromCurrency, toCurrency] = getConversionCurrencies(e, convertedCurrencyInputElement);

  const countryCode = currencyCodeToCountryCode[fromCurrency];

  updateFlagImage(baseCurrencyButtonImg, countryCode);

  updateButton(baseCurrencyButton, baseCurrencyButtonImg, fromCurrency);

  baseCurrencyInputElement.setAttribute("currency", fromCurrency);

  conversionRate = await getConversionRate(fromCurrency, toCurrency);

  flag = "top";

  await performConversion(baseCurrencyInputElement,convertedCurrencyInputElement);

});


convertedCurrencyDropdown.addEventListener("click", async function(e){

  if (e.target.tagName.toLowerCase() === "input" || e.target.tagName.toLowerCase() !== "li") {

    return;

  }

  const [fromCurrency, toCurrency] = getConversionCurrencies(e, baseCurrencyInputElement);

  const countryCode = currencyCodeToCountryCode[fromCurrency];

  updateFlagImage(convertedCurrencyButtonImg, countryCode);

  updateButton(convertedCurrencyButton, convertedCurrencyButtonImg, fromCurrency);

  convertedCurrencyInputElement.setAttribute("currency", fromCurrency);

  conversionRate = await getConversionRate(fromCurrency, toCurrency);

  flag = "bottom";

  await performConversion(convertedCurrencyInputElement, baseCurrencyInputElement);

});


baseCurrencyDropdownSearchBar.addEventListener("input", function(){

  filterDropdown(baseCurrencyDropdown, this.value);

});

convertedCurrencyDropdownSearchBar.addEventListener("input", function(){

  filterDropdown(convertedCurrencyDropdown, this.value);

});

baseCurrencyButton.addEventListener("click", function(){

  baseCurrencyDropdownSearchBar.value = "";

  unFilterDropdown(baseCurrencyDropdown);

});

convertedCurrencyButton.addEventListener("click", function(){

  convertedCurrencyDropdownSearchBar.value = "";

  unFilterDropdown(convertedCurrencyDropdown);

});

toggleButton.addEventListener("click", toggleCurrencyConverter);

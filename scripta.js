var https://maps.googleapis.com/maps/api/js?key=AIzaSyBPFbMNs-ahpUSJUJ5o-lgDTkMb-lNVGxA&callback=initMap
    // Event listener for the form submission
    document.getElementById('searchButton').addEventListener('click', function () {
      // Get the value from the input field
      var countryName = document.getElementById('countryInput').value;

      // Fetch country information and map
      fetchCountryInfo(countryName);
      fetchMapForCountry(countryName);
      fetchAndDisplayFlag(countryName);
      fetchNewsForCurrentCountry(countryName);
    });

    // Function to fetch news data for the current country
    function fetchNewsForCurrentCountry(countryName) {
      // Define the URL for the news API request
      var apiKey = 'a9637160edcae1b6761c10ac809f256a';
      var newsApiUrl = `https://gnews.io/api/v4/search?q=${countryName}&lang=en&country=us&max=10&apikey=${apiKey}`;
      var map ApiUrl = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBPFbMNs-ahpUSJUJ5o-lgDTkMb-lNVGxA&callback=initMap`;
      // Create a new XMLHttpRequest object
      var xhrNews = new XMLHttpRequest();

      // Open the connection to the server with the specified method (GET), URL, and asynchronous flag (true)
      xhrNews.open('GET', newsApiUrl, true);

      // Define the onload callback function to handle the response
      xhrNews.onload = function () {
        if (xhrNews.status === 200) {
          // Parse the response into JSON
          var responseData = JSON.parse(xhrNews.responseText);

          // Display news data for the current country
          displayNewsData(responseData);
        } else {
          console.error('Error fetching news data for the current country');
        }
      };

      // Send the request to the server asynchronously
      xhrNews.send();
    }

    // Function to display news data in the HTML
    function displayNewsData(newsData) {
      var newsContainer = document.getElementById('newsContainer');

      // Clear previous content
      newsContainer.innerHTML = "";

      // Check if data is available
      if (newsData.articles && newsData.articles.length > 0) {
        // Create HTML content for displaying news articles
        var htmlNewsContent = "<h3>Latest News</h3>";
        htmlNewsContent += "<ul>";

        // Loop through articles and add them to the HTML content
        newsData.articles.forEach(function (article) {
          htmlNewsContent += `<li><a href="${article.url}" target="_blank">${article.title}</a></li>`;
        });

        htmlNewsContent += "</ul>";

        // Set the HTML content in the news container
        newsContainer.innerHTML = htmlNewsContent;
      } else {
        // Display a message if no news data is found
        newsContainer.innerHTML = "<p>No news articles found for the entered country.</p>";
      }
    }

    // Function to fetch and display the flag of the country
    function fetchAndDisplayFlag(countryName) {
      // Create a new XMLHttpRequest object for flag
      var xhrFlag = new XMLHttpRequest();

      // Define the URL for the Restcountries API request for flag
      var urlFlag = "https://restcountries.com/v2/name/" + countryName;

      // Open the connection to the server with the specified method (GET), URL, and asynchronous flag (true)
      xhrFlag.open('GET', urlFlag, true);

      // Define the onload callback function to handle the response
      xhrFlag.onload = function () {
        // Parse the request into JSON
        var dataFlag = JSON.parse(this.response);

        // Display the flag in the flag container
        displayFlag(dataFlag);
      }

      // Send the request to the server asynchronously
      xhrFlag.send();
    }

    // Function to display the flag in the flag container
    function displayFlag(dataFlag) {
      var flagContainer = document.getElementById('flagContainer');

      // Clear previous content
      flagContainer.innerHTML = "";

      // Check if data is available
      if (dataFlag.length > 0 && dataFlag[0].flags) {
        var flagUrl = dataFlag[0].flags.svg;

        // Create HTML content for displaying the flag
        var htmlFlagContent = `<img src="${flagUrl}" alt="Flag of the country" style="width: 100px;">`;

        // Set the HTML content in the flag container
        flagContainer.innerHTML = htmlFlagContent;
      } else {
        // Display a message if no flag data is found
        flagContainer.innerHTML = "<p>No flag information found for the entered country.</p>";
      }
    }

    // Function to display country information in the div
    function displayCountryInfo(countryData) {
      var countryInfoDiv = document.getElementById('countryInfo');

      // Clear previous content
      countryInfoDiv.innerHTML = "";

      // Check if data is available
      if (countryData.length > 0) {
        var country = countryData[0];

        // Create HTML content for displaying country information
        var htmlContent = `
            <h3>${country.name}</h3>
            <p>Capital: ${country.capital}</p>
            <p>Population: ${country.population}</p>
            <p>Region: ${country.region}</p>
            <p>Subregion: ${country.subregion}</p>
            <p>Language: ${country.languages.map(lang => lang.name).join(', ')}</p>
            <p>Currencies: ${country.currencies.map(curr => curr.name).join(', ')}</p>
            <p>Timezones: ${country.timezones.join(', ')}</p>
            <p>Calling Code: ${country.callingCodes.join(', ')}</p>
            <p>Top Level Domain: ${country.topLevelDomain.join(', ')}</p>
            <p>Latitude: ${country.latlng.join(', ')}</p>
        `;

        // Set the HTML content in the div
        countryInfoDiv.innerHTML = htmlContent;
      } else {
        // Display a message if no data is found
        countryInfoDiv.innerHTML = "<p>No information found for the entered country.</p>";
      }
    }

    // Function to fetch country information
    function fetchCountryInfo(countryName) {
      // Create a new XMLHttpRequest object
      var xhr = new XMLHttpRequest();

      // Define the URL for the Restcountries API request
      var url = "https://restcountries.com/v2/name/" + countryName;

      // Open the connection to the server with the specified method (GET), URL, and asynchronous flag (true)
      xhr.open('GET', url, true);

      // Define the onload callback function to handle the response
      xhr.onload = function () {
        // Parse the request into JSON
        var data = JSON.parse(this.response);

        // Display country information in the div
        displayCountryInfo(data);
      }

      // Send the request to the server asynchronously
      xhr.send();
    }

    // Function to fetch map for the country using Google Maps API
    function fetchMapForCountry(countryName) {
      // Use the Google Maps Geocoding API to fetch the coordinates for the country
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        address: countryName
      }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();

          // Display the map using the coordinates
          initMap(latitude, longitude);
        } else {
          console.error('Error fetching coordinates for the country');
        }
      });
    }

    // Function to initialize Google Map
    function initMap(latitude, longitude) {
      var mapOptions = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 6
      };

      var map = new google.maps.Map(document.getElementById('map'), mapOptions);

      // Add a marker for the country's location
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
        title: 'Country Location'
      });
    }
  
document.addEventListener("DOMContentLoaded", function () {
    // Function to fade out the overview container and fade in the search container
    function showPageLoad() {
        document.getElementById("overview-container").classList.add("fade-out");
        setTimeout(function () {
            let pageLoad = document.getElementById("overview-container");
            // document.getElementById("overview-container").style.display = "none";
            pageLoad.remove();
            setTimeout(function () {
                document.getElementById("main-page").style.display = "block";
                document.getElementById("main-page").classList.add("fade-in");
            }, 1500); // Wait for the fade-out animation
        }, 1500); // Wait for the fade-out animation
    }

    // Call the function to start the animation sequence
    setTimeout(showPageLoad, 1500); // Wait for 3 seconds for the overview container to blend out
});

// $(document).ready(function () {
//     // Add click event listener to the button
//     $("#search-button").click(function (e) {
//         // Prevent the default form submission
//         e.preventDefault();

//         // Scroll to the results container
//         $("html, body").animate({
//             scrollTop: $("#results-container").offset().top
//         }, 1000); // Adjust the duration as needed
//     });
// });


// let searchButton = document.getElementById('search-button')

// addEventListener('click', function() {
//     function scrollToResults() {

//     }
// })

document.addEventListener('DOMContentLoaded', function () {
    // Get the button element
    var searchButton = document.getElementById('search-button');

    // Add click event listener to the button
    searchButton.addEventListener('click', function (e) {
        // Prevent the default form submission
        e.preventDefault();

        // Get the offset top of the results container
        var resultsContainerOffset = document.getElementById('results-container').offsetTop;

        // Scroll to the results container
        window.scrollTo({
            top: resultsContainerOffset,
            behavior: 'smooth'
        });
    });
});
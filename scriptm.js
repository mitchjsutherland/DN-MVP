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
    setTimeout(showPageLoad, 2500); // Wait for 3 seconds for the overview container to blend out
});
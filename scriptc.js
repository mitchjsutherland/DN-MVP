let country = document.getElementById("search-input").value;
let jobIndustry = document.getElementById("job-description-input").value;
let annualSalaryMin = document.getElementById("job-salary-input").value;
    
// Define the locations array
  const locations = [
        { geoID: 446, geoName: "APAC", geoSlug: "apac" },
        { geoID: 449, geoName: "EMEA", geoSlug: "emea" },
        { geoID: 572, geoName: "LATAM", geoSlug: "latam" },
        { geoID: 3804, geoName: "Argentina", geoSlug: "argentina" },
        { geoID: 447, geoName: "Australia", geoSlug: "australia" },
        { geoID: 3827, geoName: "Austria", geoSlug: "austria" },
        { geoID: 3819, geoName: "Belgium", geoSlug: "belgium" },
        { geoID: 1664, geoName: "Brazil", geoSlug: "brazil" },
        { geoID: 3815, geoName: "Bulgaria", geoSlug: "bulgaria" },
        { geoID: 448, geoName: "Canada", geoSlug: "canada" },
        { geoID: 3826, geoName: "China", geoSlug: "china" },
        { geoID: 3820, geoName: "Costa Rica", geoSlug: "costa-rica" },
        { geoID: 3823, geoName: "Croatia", geoSlug: "croatia" },
        { geoID: 3821, geoName: "Cyprus", geoSlug: "cyprus" },
        { geoID: 3824, geoName: "Czechia", geoSlug: "czechia" },
        { geoID: 3833, geoName: "Denmark", geoSlug: "denmark" },
        { geoID: 3831, geoName: "Estonia", geoSlug: "estonia" },
        { geoID: 450, geoName: "Europe", geoSlug: "europe" },
        { geoID: 3810, geoName: "Finland", geoSlug: "finland" },
        { geoID: 1663, geoName: "France", geoSlug: "france" },
        { geoID: 1378, geoName: "Germany", geoSlug: "germany" },
        { geoID: 3808, geoName: "Greece", geoSlug: "greece" },
        { geoID: 3809, geoName: "Hungary", geoSlug: "hungary" },
        { geoID: 3811, geoName: "Ireland", geoSlug: "ireland" },
        { geoID: 3822, geoName: "Israel", geoSlug: "israel" },
        { geoID: 3719, geoName: "Italy", geoSlug: "italy" },
        { geoID: 3828, geoName: "Japan", geoSlug: "japan" },
        { geoID: 3829, geoName: "Latvia", geoSlug: "latvia" },
        { geoID: 3813, geoName: "Lithuania", geoSlug: "lithuania" },
        { geoID: 3718, geoName: "Mexico", geoSlug: "mexico" },
        { geoID: 3690, geoName: "Netherlands", geoSlug: "netherlands" },
        { geoID: 3817, geoName: "New Zealand", geoSlug: "new-zealand" },
        { geoID: 3818, geoName: "Norway", geoSlug: "norway" },
        { geoID: 3835, geoName: "Philippines", geoSlug: "philippines" },
        { geoID: 3803, geoName: "Poland", geoSlug: "poland" },
        { geoID: 3802, geoName: "Portugal", geoSlug: "portugal" },
        { geoID: 3801, geoName: "Romania", geoSlug: "romania" },
        { geoID: 3806, geoName: "Singapore", geoSlug: "singapore" },
        { geoID: 3812, geoName: "Slovakia", geoSlug: "slovakia" },
        { geoID: 3830, geoName: "Slovenia", geoSlug: "slovenia" },
        { geoID: 3825, geoName: "South Korea", geoSlug: "south-korea" },
        { geoID: 671, geoName: "Spain", geoSlug: "spain" },
        { geoID: 3805, geoName: "Sweden", geoSlug: "sweden" },
        { geoID: 3816, geoName: "Switzerland", geoSlug: "switzerland" },
        { geoID: 3807, geoName: "Thailand", geoSlug: "thailand" },
        { geoID: 3799, geoName: "Türkiye", geoSlug: "turkiye" },
        { geoID: 444, geoName: "UK", geoSlug: "uk" },
        { geoID: 3800, geoName: "United Arab Emirates", geoSlug: "united-arab-emirates" },
        { geoID: 445, geoName: "USA", geoSlug: "usa" },
        { geoID: 3814, geoName: "Vietnam", geoSlug: "vietnam" },
      ];



      
      function displayMatchingLocations(matchingLocations) {
        const locationsContainer = document.getElementById('matching-locations');
        locationsContainer.innerHTML = '';
    
        matchingLocations.forEach(location => {
          const locationButton = document.createElement('button');
          locationButton.innerText = location.geoName;
          locationButton.classList.add('matching-location');
          locationButton.addEventListener('click', () => {
            // When a matching location button is clicked, fill the search bar with the location name
            document.getElementById('search-input').value = location.geoName;
            // Clear the matching locations container
            locationsContainer.innerHTML = '';
          });
          locationsContainer.appendChild(locationButton);
        });
      }
    
      function getSelectedCountry() {
        const countrySelect = document.getElementById('search-input');
        return countrySelect.value;
      }

      function getSelectedSalary() {
        const countrySelect = document.getElementById('search-input');
        return countrySelect.value;
      }
    
      function populateCountryDropdown() {
        const countrySelect = document.getElementById('search-input');
    
        locations.forEach(location => {
          const option = document.createElement('option');
          option.value = location.geoSlug;
          option.text = location.geoName;
          countrySelect.appendChild(option);
        });
      }
    
      populateCountryDropdown();
    
      document.getElementById('search-input').addEventListener('input', async function (event) {
        event.preventDefault();
        const selectedCountry = getSelectedCountry();
        const matchingLocations = locations.filter(location =>
          location.geoName.toLowerCase().includes(selectedCountry.toLowerCase())
        );
        displayMatchingLocations(matchingLocations);
      });
    
      // Define the job industries array
      const jobIndustries = [
            {industryID: 194, industryName: "Business Development", industrySlug: "business"},
            {industryID: 422, industryName: "Copywriting & Content", industrySlug: "copywriting"},
            {industryID: 192, industryName: "Customer Success", industrySlug: "supporting"},
            {industryID: 3037, industryName: "Data Science", industrySlug:"data-science"},
            {industryID: 276, industryName: "Design & Creative", industrySlug: "design-multimedia"},
            {industryID: 178, industryName: "DevOps & SysAdmin", industrySlug: "admin"},
            {industryID: 265, industryName: "Finance & Legal", industrySlug: "accounting-finance"},
            {industryID: 421, industryName: "HR & Recruiting", industrySlug: "hr"},
            {industryID: 185, industryName: "Marketing & Sales", industrySlug: "marketing"},
            {industryID: 225, industryName: "Product & Operations", industrySlug: "management"},
            {industryID: 148, industryName: "Programming", industrySlug: "dev"},
            {industryID: 1738, industryName: "Sales", industrySlug: "seller"},
            {industryID: 1737, industryName: "SEO", industrySlug: "seo"},
            {industryID: 1739, industryName: "Social Media Marketing", industrySlug: "smm"},
            {industryID: 810, industryName: "Software Engineering", industrySlug: "engineering"},
            {industryID: 1597, industryName: "Technical Support", industrySlug: "technical-support"},
            {industryID: 1583, industryName: "Web & App Design", industrySlug: "web-app-design"}
    
        ];
    
        function getSelectedIndustry() {
          const industrySelect = document.getElementById('job-description-input');
          return industrySelect.value;
        }
      
        function displayMatchingIndustries(matchingIndustries) {
          const industriesContainer = document.getElementById('matching-industries');
          industriesContainer.innerHTML = '';
      
          matchingIndustries.forEach(industry => {
            const industryButton = document.createElement('button');
            industryButton.innerText = industry.industryName;
            industryButton.classList.add('matching-industry');
            industryButton.addEventListener('click', () => {
              // When a matching industry button is clicked, fill the industry input with the industry name
              const industryInput = document.getElementById('job-description-input');
              industryInput.value = industry.industryName;
              // Clear the matching industries container
              industriesContainer.innerHTML = '';
      
              // Call submitSearch after updating the industry
              submitSearch();
            });
            industriesContainer.appendChild(industryButton);
          });
        }
      
        document.getElementById('job-description-input').addEventListener('input', async function (event) {
          event.preventDefault();
      
          const selectedIndustry = getSelectedIndustry();
          const matchingIndustries = jobIndustries.filter(industry =>
            industry.industryName.toLowerCase().includes(selectedIndustry.toLowerCase())
          );
          displayMatchingIndustries(matchingIndustries);
      
          await submitSearch();
        });
      
        async function combinedJobSearch(countryName, industryName, annualSalaryMin) {
          try {
            const matchingLocations = locations.filter(location =>
              location.geoName.toLowerCase().includes(countryName.toLowerCase())
            );
      
            const selectedCountry = matchingLocations.length > 0 ? matchingLocations[0].geoSlug : '';
      
            if (!selectedCountry) {
              console.error('No country selected.');
              return [];
            }
      
            // Find the industry object that matches the selected industry name
            const selectedIndustry = jobIndustries.find(industry =>
              industry.industryName.toLowerCase() === industryName.toLowerCase()
            );
      
            if (!selectedIndustry) {
              console.error('Invalid industry value. No matching industry slug found.');
              return [];
            }
      
            const jobSearchQuery = `https://jobicy.com/api/v2/remote-jobs?count=50&geo=${selectedCountry}&industry=${selectedIndustry.industrySlug}`;
            const response = await fetch(jobSearchQuery);
            const data = await response.json();
      
            console.log('Raw API response:', data);
      
            if (!data.jobs || data.jobs.length === 0) {
              console.error('No jobs found or an issue with job data.');
              return [];
            }
      
            const validJobs = data.jobs.filter(job => parseInt(annualSalaryMin) < parseInt(job.annualSalaryMin));
      
            console.log(validJobs);
            return validJobs;
          } catch (error) {
            console.error('Error in combinedJobSearch:', error);
            return [];
          }
        }
    
    
      
        // // Replacement code for 263 - 350 to implement cards grid 3*3
        // function createCurrentDataElement(country, jobs) {
        //   const jobContainer = document.getElementById('job-results');
        //   jobContainer.innerHTML = '';
        
        //   console.log('Received jobs:', jobs);
        
        //   if (Array.isArray(jobs) && jobs.length > 0) {
        //     // Create a grid container for the job cards
        //     const gridContainer = document.createElement('div');
        //     gridContainer.classList.add('job-results-grid');
        
        //     jobs.forEach((job, index) => {
        //       // Create a job card
        //       const jobCard = document.createElement('div');
        //       jobCard.classList.add('job-result', 'job-card');
        
        //       const titleElement = document.createElement('h3');
        //       titleElement.innerText = job.jobTitle || 'Title not available';
        //       jobCard.appendChild(titleElement);
        
        //       const countryNameElement = document.createElement('h4');
        //       countryNameElement.innerText = `Country: ${country}`;
        //       jobCard.appendChild(countryNameElement);
        
        //       const jobDescriptionElement = document.createElement('p');
        //       const cleanedDescription = stripHtml(job.jobDescription || 'Description not available');
        //       const truncatedDescription = limitWords(cleanedDescription, 100);
        //       jobDescriptionElement.innerText = `Description: ${truncatedDescription}`;
        //       jobCard.appendChild(jobDescriptionElement);
        
        //       const salaryElement = document.createElement('p');
        //       salaryElement.innerText = `Salary: ${job.annualSalaryMin || 'Salary not available'}`;
        //       jobCard.appendChild(salaryElement);
        
        //       // Append the job card to the grid container
        //       gridContainer.appendChild(jobCard);
        
        //       // If the index is a multiple of 3, start a new row
        //       if ((index + 1) % 3 === 0) {
        //         const rowBreak = document.createElement('div');
        //         rowBreak.classList.add('row-break');
        //         gridContainer.appendChild(rowBreak);
        //       }
        //     });
        
        //     // Append the grid container to the job container
        //     jobContainer.appendChild(gridContainer);
        //   } else {
        //     console.error('Error: Jobs are not an array or are empty.');
        //   }
        // }


        // THIS FUNCTION CREATES THE JOB RESULTS LIST -------------------------------------------------------------------
    
        function createCurrentDataElement(country, jobs) {
          const jobContainer = document.getElementById('job-results');
          jobContainer.innerHTML = '';
      
          console.log('Received jobs:', jobs);
      
          if (Array.isArray(jobs) && jobs.length > 0) {
            jobs.forEach(job => {
              const jobElement = document.createElement('div');
              // jobElement.classList.add('job-result');
              jobElement.classList.add('job-result', 'card', 'm-2', 'col-3', 'text-center', 'align-items-center');
      
              const titleElement = document.createElement('h5');
              titleElement.innerText = job.jobTitle || 'Title not available';
              jobElement.appendChild(titleElement);
      
              // const countryNameElement = document.createElement('h4');
              // countryNameElement.innerText = `Country: ${country}`;
              // jobElement.appendChild(countryNameElement);
      
              // const jobDescriptionElement = document.createElement('p');
              // const cleanedDescription = stripHtml(job.jobDescription || 'Description not available');
              // const truncatedDescription = limitWords(cleanedDescription, 100);
              // jobDescriptionElement.innerText = `Description: ${truncatedDescription}`;
              // jobElement.appendChild(jobDescriptionElement);
      
              const salaryElement = document.createElement('p');
              salaryElement.innerText = `$${job.annualSalaryMin || 'Salary not available'}`;
              jobElement.appendChild(salaryElement);
      
              jobContainer.appendChild(jobElement);
            });
          } else {
            console.error('Error: Jobs are not an array or are empty.');
          }
        }





      
        function stripHtml(html) {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          return doc.body.textContent || '';
        }
      
        function limitWords(str, maxWords) {
          const words = str.split(/\s+/);
          return words.slice(0, maxWords).join(' ');
        }
      
        async function submitSearch() {
          let annualSalaryMin = document.getElementById('job-salary-input').value;
      
          const countryInput = getSelectedCountry();
          const jobIndustry = getSelectedIndustry(); // Get the selected industry
      
        //   localStorage.setItem('Country', countryInput);


        // THIS WILL SAVE THE USERS MOST RECENT SEARCH TO LOCAL STORAGE -------------------------------------------------------------------

          var country = document.getElementById('search-input').value;
          var salary = document.getElementById('job-salary-input').value;

          // Create an object with country and salary properties
          var userPreferences = {
            country: country,
            salary: salary
          };

          // Convert the object to a JSON string and save it to local storage
          localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
      
          try {
            const jobs = await combinedJobSearch(countryInput, jobIndustry, annualSalaryMin);
            createCurrentDataElement(countryInput, jobs);
          } catch (error) {
            console.error('Error:', error);
          }
        }
      
        document.getElementById('search-button').addEventListener('click', async function (event) {
          event.preventDefault();
          await submitSearch();
        });
      
        document.getElementById('search-input').addEventListener('input', async function (event) {
          event.preventDefault();
          const selectedCountry = getSelectedCountry();
          const matchingLocations = locations.filter(location =>
            location.geoName.toLowerCase().includes(selectedCountry.toLowerCase())
          );
          displayMatchingLocations(matchingLocations);
        });
      
        document.getElementById('job-description-input').addEventListener('input', async function (event) {
          event.preventDefault();
      
          const selectedIndustry = getSelectedIndustry();
          const matchingIndustries = jobIndustries.filter(industry =>
            industry.industryName.toLowerCase().includes(selectedIndustry.toLowerCase())
          );
          displayMatchingIndustries(matchingIndustries);
      
          await submitSearch();
        });
    //   });
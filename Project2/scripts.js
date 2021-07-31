// Get DOM Elements

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
const selectMovie = document.getElementById('movie');

// Get the ticket price from the selectMovie Dropdown

let ticketPrice = +selectMovie.value;  // + is added with selectMovie to convert the string type of value to number

// populate updated UI
populateUI();

// Event Listeners
// 1. Listen for click on container
container.addEventListener('click', e => {
    // check first if the user has selected any movie
    if(selectMovie.value!=='') {
        //check if target of click is a seat that's not occupied
        if(e.target.classList.contains('seat')&& !e.target.classList.contains('occupied')) {
            //Add or remove class selected from seat
            e.target.classList.toggle('selected');
            //Refreshing counts
            updateSelectedCount();
        }

    }
})

// 2. Listener for movie selection
selectMovie.addEventListener('change', e => {
    ticketPrice = +selectMovie.value;
    //calling function to set data in local storage
    setMovieData(e.target.selectedIndex, ticketPrice);
    console.log(e.target.selectedIndex, ticketPrice);
    // Updating Counts
    updateSelectedCount();
})

// Functions
// 1. Save movie data to local storage
function setMovieData(movieIndex, moviePrice){
    //Saving selected movie index to local storage
    localStorage.setItem('selectedMovieIndex', movieIndex);
    //Saving selected movie price to local storage
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// 2. Update the selected count of seats
function updateSelectedCount(){
    if(selectMovie.value !== ''){
        //Get all seats that are selected
        const selectedSeats = document.querySelectorAll('.row .seat.selected');
        //Creating array to store the indexes of selected seats
        const seatIndex = [...selectedSeats].map( seat => [...seats].indexOf(seat));
        //Getting the count of total selected seats
        const selectedSeatsCount = selectedSeats.length;
        //updating the UI to show numbers of selected seats
        count.innerHTML = selectedSeatsCount;
        //updating the UI to show total price of tickets
        total.innerHTML = '$' + selectedSeatsCount * ticketPrice;
        //Storng the data to local storage
        localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));

    }
} 

// populate the saved data to the application 
function populateUI() {
    // Get selected seats from local storage and convert from string to array
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    // check if selected seats is not null and not empty, and if true, then loop through all seats and mark matching seats with class selected
    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    };
    // Get the selected movie index from local storage
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    // Using the value from local storage, select the movie on page load
    if(selectedMovieIndex !== null) {
        selectMovie.selectedIndex = selectedMovieIndex;
    }
}

// Initial count and total price
updateSelectedCount();


const movielist = document.querySelector('#movies ul');

fetch('http://localhost:3000/movies')
  .then(response => response.json())
  .then(data => {
    
    data.forEach(movie => {
      const li = document.createElement('li');
      li.textContent = movie.title;
      movieList.appendChild(li);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


let selectedMovie = '';
let selectedSeats = [];
let price = 0;


const movieList = document.querySelector('#movies ul');
const seatsContainer = document.querySelector('.seats');
const noteSelected = document.querySelector('.note .selected');
const notePrice = document.querySelector('.note .price');
const orderMovie = document.querySelector('.order .movie');
const orderSeats = document.querySelector('.order .seats');
const orderTotal = document.querySelector('.order .total');


function displayMovies(movies) {
  movieList.innerHTML = '';
  movies.forEach(movie => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${movie.title}</span>
      <span>${movie.time}</span>
    `;
    li.addEventListener('click', () => selectMovie(movie));
    movieList.appendChild(li);
  });
}


function selectMovie(movie) {
  selectedMovie = movie;
  const seats = selectedMovie.seats;
  displaySeats(seats);
}


function displaySeats(seats) {
  seatsContainer.innerHTML = '';
  seats.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    row.forEach(seat => {
      const seatDiv = document.createElement('div');
      seatDiv.classList.add('seat');
      if (seat === true) {
        seatDiv.classList.add('available');
        seatDiv.addEventListener('click', () => selectSeat(seatDiv));
      } else {
        seatDiv.classList.add('unavailable');
      }
      rowDiv.appendChild(seatDiv);
    });
    seatsContainer.appendChild(rowDiv);
  });
}


function selectSeat(seatDiv) {
  const seatIndex = Array.from(seatsContainer.querySelectorAll('.seat')).indexOf(seatDiv);
  if (selectedSeats.includes(seatIndex)) {
    
    seatDiv.classList.remove('selected');
    selectedSeats.splice(selectedSeats.indexOf(seatIndex), 1);
  } else {
   
    seatDiv.classList.add('selected');
    selectedSeats.push(seatIndex);
  }
  updateNote();
}


function updateNote() {
  noteSelected.textContent = `${selectedSeats.length} seats selected: ${selectedSeats.map(seatIndex => `${Math.floor(seatIndex/10)+1}${seatIndex%10+1}`).join(', ')}`;
  price = selectedSeats.length * selectedMovie.price;
  notePrice.textContent = `Total price: $${price.toFixed(2)}`;
  updateOrder();
}

function updateOrder() {
  if (selectedMovie && selectedSeats.length > 0) {
    orderMovie.textContent = `${selectedMovie.title} (${selectedMovie.time})`;
    orderSeats.textContent = selectedSeats.map(seatIndex => `${Math.floor(seatIndex/10)+1}${seatIndex%10+1}`).join(', ');
    orderTotal.textContent = `$${price.toFixed(2)}`;
  } else {
    orderMovie.textContent = '-';
    orderSeats.textContent = '-';
    orderTotal.textContent = '-';
  }
}


displayMovies(movies);


// 🎟️ Movie Ticket Booking System
// 🍿 Create a system where users can book tickets and check seat availability.
//
// 1. Create an enum called MovieGenre with at least 5 movie genres.
// 2. Create a tuple type called Seat which holds (rowLetter: string, seatNumber: number).
// 3. Create a type alias called Movie which contains: movieId (number), title (string), genre (MovieGenre), availableSeats (Seat[]).
// 4. Create a function called addMovie which adds a movie to the movies array. The function needs to return a Movie object.
// 5. Create a function called bookSeat which removes a seat from availableSeats if available. The return needs to be a string.
// 6. Create a function called checkSeatAvailability which returns true if a seat is available and false otherwise.

// 1. Enum de géneros de película
enum MovieGenre {
  Action,
  Comedy,
  Drama,
  SciFi,
  Horror
}

// 2. Tuple tipo Seat
type Seat = [string, number];

// 3. Tipo Movie
type Movie = {
  movieId: number;
  title: string;
  genre: MovieGenre;
  availableSeats: Seat[];
};

const movies: Movie[] = [];

// 4. Función para agregar película
function addMovie(
  movieId: number,
  title: string,
  genre: MovieGenre,
  availableSeats: Seat[]
): Movie {
  const newMovie: Movie = {
    movieId,
    title,
    genre,
    availableSeats
  };
  movies.push(newMovie);
  return newMovie;
}

// 5. Función para reservar asiento
function bookSeat(
  movieId: number,
  rowLetter: string,
  seatNumber: number
): string {
  const movie = movies.find(m => m.movieId === movieId);
  if (!movie) return "Movie not found";

  const seatIndex = movie.availableSeats.findIndex(
    ([row, num]) => row === rowLetter && num === seatNumber
  );

  if (seatIndex === -1) {
    return `Seat ${rowLetter}${seatNumber} is not available`;
  }

  // Remove the seat from availableSeats
  movie.availableSeats.splice(seatIndex, 1);
  return `Seat ${rowLetter}${seatNumber} booked successfully`;
}

// 6. Función para verificar disponibilidad de asiento
function checkSeatAvailability(
  movieId: number,
  rowLetter: string,
  seatNumber: number
): boolean {
  const movie = movies.find(m => m.movieId === movieId);
  if (!movie) return false;

  return movie.availableSeats.some(
    ([row, num]) => row === rowLetter && num === seatNumber
  );
}

console.log(addMovie(1, "Avengers", MovieGenre.Action, [["A", 1], ["A", 2]]));
// { movieId: 1, title: "Avengers", genre: 0, availableSeats: [["A", 1], ["A", 2]] }

console.log(bookSeat(1, "A", 1)); // "Seat A1 booked successfully"
console.log(checkSeatAvailability(1, "A", 1)); // false
console.log(checkSeatAvailability(1, "A", 2)); // true
console.log(bookSeat(1, "A", 3)); // "Seat A3 is not available"

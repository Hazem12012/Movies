import { useEffect, useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [query, setQuery] = useState("hazem12012");
  const [selectedID, setSelectedID] = useState(null);
  function selectElement(id) {
    setSelectedID(selectedID === id ? null : id);
  }
  function handleCloseMovie() {
    setSelectedID(null);
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  //  // // // // API  Github Account  \\ \\ \\ \\ \\
  const url = "https://freetestapi.com/api/v1/movies?limit=15";
  useEffect(function () {
    async function fetchMovies() {
      try {
        setIsLoding(true);
        setError("");
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Something went  wrong with fetch movies");
        }
        const result = await response.json();
        setMovies(result);
        console.log(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoding(false);
      }
    }
    if (!query.length) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();
  }, []);

  // ***************************************************
  // github API

  // useEffect(
  //   function () {
  //     async function fetchMovies() {
  //       try {
  //         setIsLoding(true);
  //         setError("");
  //         let result = await fetch(
  //           `https://api.github.com/users/${query}/repos`
  //         );
  //         if (!result.ok) {
  //           throw new Error("Something went  wrong with fetch movies");
  //         }
  //         const data = await result.json();
  //         // if (data.Response === "false") {
  //         //   throw new Error("Movies Not Found");
  //         // }
  //         setMovies(data);
  //       } catch (error) {
  //         setError(error.message);
  //       } finally {
  //         setIsLoding(false);
  //       }
  //     }
  //     if (!query.length) {
  //       setMovies([]);
  //       setError("");
  //       return;
  //     }
  //     fetchMovies();
  //   },
  //   [query]
  // );

  return (
    <div
      className="container"
      style={
        darkMode
          ? { backgroundColor: "rgb(63 81 181 / 28%)" }
          : { color: "var(--color-text)" }
      }
    >
      <NavBar movies={movies} darkMode={darkMode}>
        <Search darkMode={darkMode} query={query} setQuery={setQuery} />
        <NumResults movies={movies} darkMode={darkMode} />
        <DarkMode darkMode={darkMode} setDarkMode={setDarkMode} />
      </NavBar>
      <Main>
        <ListBox
          error={error}
          movies={movies}
          isLoding={isLoding}
          darkMode={darkMode}
          selectElement={selectElement}
        />
        <WatchedBox
          watched={watched}
          darkMode={darkMode}
          selectedID={selectedID}
          handleCloseMovie={handleCloseMovie}
          handleAddWatched={handleAddWatched}
        />
      </Main>
    </div>
  );
}

function DarkMode({ darkMode, setDarkMode }) {
  return (
    <div>
      <label className="labelDarkMode" id="/lestbox">
        <input
          type="checkbox"
          className="inputCheck"
          onClick={() => setDarkMode(!darkMode)}
        />
        <span className="sun">🌞</span>
        <span className="moon">🌙</span>
        <span className="toggle"></span>
      </label>
    </div>
  );
}

function NumResults({ movies, darkMode }) {
  return (
    <p
      className="num-results"
      style={darkMode ? { color: "var(--color-text)" } : {}}
    >
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function ListBox({ error, movies, isLoding, darkMode, selectElement }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div
      className="box"
      style={
        darkMode
          ? { backgroundColor: "#e3e3e3", animationName: "boxAnimition" }
          : {}
      }
    >
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
        style={darkMode ? { background: "#607d8b" } : {}}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isLoding && <Loader />}
      {!isLoding && !error && isOpen1 && (
        <MovieList
          movies={movies}
          darkMode={darkMode}
          selectElement={selectElement}
        />
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

function Loader() {
  return (
    <div>
      <div className="n1">
        <div className="c1"></div>
        <div className="c2"></div>
        <div className="c3"></div>
      </div>
    </div>
  );
}
function ErrorMessage({ message }) {
  return (
    <p className="error">
      {message}
      <span>⛔</span>
    </p>
  );
}
function WatchedBox({
  watched,
  darkMode,
  selectedID,
  handleCloseMovie,
  handleAddWatched,
}) {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div
      className="box"
      style={
        darkMode
          ? { backgroundColor: "#e3e3e3", animationName: "boxAnimition" }
          : {}
      }
    >
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
        style={darkMode ? { background: "#607d8b" } : {}}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 &&
        (selectedID ? (
          <MovieDetalis
            selectedID={selectedID}
            onCloseMovie={handleCloseMovie}
            onAddWatched={handleAddWatched}
          />
        ) : (
          <>
            <WatchedSummary watched={watched} darkMode={darkMode} />
            <WatchMovisList watched={watched} />
          </>
        ))}
    </div>
  );

  function WatchMovisList({ watched }) {
    return (
      <ul className="list">
        {watched.map((movie) => (
          <li key={movie.imdbID}>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            <div>
              <p>
                <span>⭐️</span>
                <span>{movie.imdbRating}</span>
              </p>
              <p>
                <span>🌟</span>
                <span>{movie.userRating}</span>
              </p>
              <p>
                <span>⏳</span>
                <span>{movie.runtime} min</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

function WatchedSummary({ watched, darkMode }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div
      className="summary"
      style={darkMode ? { backgroundColor: "#e3e3e3" } : {}}
    >
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function MovieList({ movies, darkMode, selectElement }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID || movie.id}
          darkMode={darkMode}
          selectElement={selectElement}
        />
      ))}
    </ul>
  );
}
function Movie({ movie, darkMode, selectElement }) {
  return (
    <li onClick={() => selectElement(movie.id)}>
      <img src={movie.poster} alt={`${movie.title}poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.year}</span>
        </p>
      </div>
    </li>
  );
}

function NavBar({ movies, children, query, setQuery, darkMode }) {
  return (
    <nav
      className="nav-bar"
      style={darkMode ? { backgroundColor: "#03a9f4" } : {}}
    >
      <Logo />
      {children}
    </nav>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Search({ darkMode, query, setQuery }) {
  return (
    <input
      style={darkMode ? { background: "#6445c182" } : {}}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
function MovieDetalis({ onCloseMovie, selectedID, onAddWatched }) {
  const [movie, setMovie] = useState({});
  const [isLoding, setIsLoding] = useState(false);
  const [userRating, setUeserRating] = useState("");
  const {
    title: title,
    year: year,
    poster: poster,
    plot: plot,
    country: country,
    rating: rating,
    awards: awards,
    actors: actors,
    director: director,
    imdbRating,
    runtime,
  } = movie;
  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedID,
      title,
      year,
      poster,
      imdbRating: Number(rating),
      runtime: Number(runtime),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }
  useEffect(
    function () {
      async function getMovieDetailes() {
        setIsLoding(true);
        const url = `https://freetestapi.com/api/v1/movies/${selectedID}`;
        const request = await fetch(url);
        const result = await request.json();
        setMovie(result);
        setIsLoding(false);
      }
      getMovieDetailes();
    },
    [selectedID]
  );

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <img src={poster} alt={`poster of ${title} movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {country} &bull; {year}
          </p>
          <p>{awards}</p>
          <p>
            <span>⭐</span>
            {rating} IMDB Rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          <StarRating
            maxRating={10}
            className={""}
            size={28}
            onSetRating={setUeserRating}
          />
          {userRating > 0 && (
            <button className="btn-add" onClick={handleAdd}>
              + Add to list
            </button>
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Strarring : {actors}</p>
        <p>Directed by : {director}</p>
      </section>
    </div>
  );
}
// *  ************************ StarRating ************************ * //
const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
};
const starContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className,
  initialRating = 0,
  message = [],
  onMovieRating,
  onSetRating,
}) {
  const [rating, setRating] = useState(initialRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    onMovieRating
      ? setRating(rating) || onMovieRating(rating)
      : setRating(rating);
      if (onSetRating) {
        onSetRating(rating); // Call the function to set userRating in the parent component
      }
  }

  const textStyle = {
    lineHeight: "1",
    fontSize: `${size / 1.5}px`,
    fontFamily: "fantasy",
    color,
  };
  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Stare
            key={i}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {message.length === maxRating
          ? message[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}

function Stare({ onRate, full, onHoverIn, onHoverOut, size, color }) {
  const stareStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
    color,
  };
  return (
    <span
      role="button"
      style={stareStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

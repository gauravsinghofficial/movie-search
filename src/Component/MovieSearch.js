import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/moviesSlice";
import "./MovieSearch.css";

const MovieSearch = () => {
  const dispatch = useDispatch();
  const { movies, totalPages, loading, error } = useSelector(
    (state) => state.movies
  );

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (query) {
      dispatch(fetchMovies({ query, page }));
    }
  }, [query, page, dispatch]);

  return (
    <div className="movie-search-container">
      <h2>Movie Search</h2>
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
      />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className="movies-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>{movie.overview.substring(0, 100)}...</p>
          </div>
        ))}
      </div>

      {movies.length > 0 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;

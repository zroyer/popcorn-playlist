import React from "react";
import Movie from "../Movie";

const Playlist = ({ playlist, handleRemoveMovie }) => (
  <div className="playlist-container">
    {playlist.map((movie) => (
      <Movie
        movie={movie}
        playlist={playlist}
        key={movie.imdbID}
        handleRemoveMovie={handleRemoveMovie}
        isConfirmation
      />
    ))}
  </div>
);

export default Playlist;

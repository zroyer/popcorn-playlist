import React from "react";
import classnames from "classnames";
import "./styles.css";

export const CtaButton = ({
  isConfirmation,
  playlist,
  movie,
  handleAddMovie,
  handleRemoveMovie,
}) => (
  <button
    className={classnames("btn-cta", {
      remove: isConfirmation,
      add: !isConfirmation,
    })}
    disabled={!isConfirmation && playlist.includes(movie)}
    onClick={() =>
      isConfirmation ? handleRemoveMovie(movie) : handleAddMovie(movie)
    }
  >
    {isConfirmation ? "Remove" : !playlist?.includes(movie) ? "Add" : "Added"}
  </button>
);

export default CtaButton;

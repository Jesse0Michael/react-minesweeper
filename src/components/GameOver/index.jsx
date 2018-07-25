import React from "react";
import PropTypes from "prop-types";
import "./GameOver.css";

const GameOver = ({ win }) => (
  <div className="gameover">
    {win && <span>you win!!!</span>}
    {!win && <span>you lose!!!</span>}
  </div>
);

GameOver.propTypes = {
  win: PropTypes.bool.isRequired
};

export default GameOver;

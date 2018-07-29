import React from "react";
import PropTypes from "prop-types";
import "./GameOver.css";

const GameOver = ({ win, newGameFunc }) => (
  <div className="wrapper">
  <div className="demo-card-wide mdl-card mdl-shadow--2dp gameover">
    {win && (
      <div>
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">YOU WIN!</h2>
        </div>
        <div className="mdl-card__supporting-text">
          Congradulations! You did it! 
        </div>
      </div>
    )}
    {!win && (
      <div>
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">YOU LOSE!</h2>
        </div>
        <div className="mdl-card__supporting-text">
          Nice attempt! Try harder next time!
        </div>
      </div>
    )}
    <div className="mdl-card__actions mdl-card--border">
      <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect right" onClick={() => newGameFunc()}>
        New Game
      </a>
    </div>
  </div>
  </div>
);

GameOver.propTypes = {
  win: PropTypes.bool.isRequired,
  newGameFunc: PropTypes.func.isRequired
};

export default GameOver;

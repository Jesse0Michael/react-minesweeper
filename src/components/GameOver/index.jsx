import React, { Component } from "react";
import "./GameOver.css";

class GameOver extends Component {
  constructor(p) {
    super(p);
    this.state = {
      animation: "fadeInUp"
    };
  }

  fadeOut() {
    this.setState({ animation: "fadeOutDown" });
  }

  render() {
    return (
      <div className="wrapper">
        <div
          ref={over => (this.over = over)}
          className={"demo-card-wide mdl-card mdl-shadow--2dp gameover animated " + this.state.animation}
        >
          {this.propswin && (
            <div>
              <div className="mdl-card__title">
                <h2 className="mdl-card__title-text">YOU WIN!</h2>
              </div>
              <div className="mdl-card__supporting-text">Congratulations! You did it!</div>
            </div>
          )}
          {!this.props.win && (
            <div>
              <div className="mdl-card__title">
                <h2 className="mdl-card__title-text">YOU LOSE!</h2>
              </div>
              <div className="mdl-card__supporting-text">Nice attempt! Try harder next time!</div>
            </div>
          )}
          <div className="mdl-card__actions mdl-card--border">
            <a
              className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
              onClick={() => this.fadeOut()}
            >
              Close
            </a>
            <a
              className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect right"
              onClick={() => this.props.newGameFunc()}
            >
              New Game
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default GameOver;

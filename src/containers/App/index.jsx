import React, { Component } from "react";
import Board from "../../containers/Board";
import "./App.css";


class App extends Component {
  constructor(p) {
    super(p);
    this.state = {
      flagAction: false
    };
  }

  actionToggle = () => {
    this.setState({ flagAction: !this.state.flagAction });
  };

  newGame = () => {
    this.board.setBoard();
  };

  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">Minesweeper</span>
            <div className="mdl-layout-spacer" />
            <button
              className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored action"
              onClick={this.actionToggle}
            >
              {!this.state.flagAction && <i className="material-icons">search</i>}
              {this.state.flagAction && <i className="material-icons">flag</i>}
            </button>
            <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored action" onClick={this.newGame}>
              <i className="material-icons">autorenew</i>
            </button>
          </div>
        </header>
        <div className="mdl-layout__drawer drawer">
          Navigate the minefield, avoiding the bombs.
          <br />
          <br />
          Click a uncovered space to reveal if there is a hidden bomb.
          <br />
          <br />
          If there is a bomb, It explodes and you lose!
          <br />
          <br />
          If there isn't a bomb it will reveal a number, or area of numbers for the number of bombs that are adjacent to
          that spot.
          <br />
          <br />
          <span>If you've narrowed down the location of a bomb, right click, or toggle the click action, to place a flag on
          that location. <div className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored action-info" >
              <i className="material-icons action-info">search</i>
            </div>
            </span>
          <br />
          You win when there are no uncovered safe spaces left!
        </div>
        <main className="mdl-layout__content main">
          <Board flagAction={this.state.flagAction} ref={board => (this.board = board)} />
        </main>
      </div>
    );
  }
}

export default App;

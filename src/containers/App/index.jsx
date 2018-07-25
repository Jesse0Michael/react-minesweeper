import React, { Component } from "react";
import Board from "../../containers/Board";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">Minesweeper</span>
            <div className="mdl-layout-spacer"></div>
          </div>
        </header>
        <main className="mdl-layout__content main">
          <Board />
        </main>
      </div>
    );
  }
}

export default App;

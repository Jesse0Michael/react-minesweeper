import React, { Component } from "react";
import "./App.css";
import Coordinate from "../../components/Coordinate";

class App extends Component {
  constructor(p) {
    super(p);
    this.state = {
      board: []
    };
  }

  setBoard(columns, rows, mines) {
    var board = [];
    for (var i = 0; i < rows; i++) {
      var row = [];
      for (var j = 0; j < columns; j++) {
        row.push({ bomb: false, state: "covered" });
      }
      board.push(row);
    }

    var mineCount = 0;
    while (mineCount < mines) {
      var x = Math.floor(Math.random() * rows);
      var y = Math.floor(Math.random() * columns);
      if (board[x][y].bomb) {
        continue;
      } else {
        board[x][y].bomb = true;
        mineCount++;
      }
    }

    this.setState({ board: board });
  }

  componentDidMount() {
    this.setBoard(10, 10, 30);
  }

  renderRow(row) {
    return <div className="row">
            {row.map(col => {return<Coordinate element={col} />})}
            </div>;

  }

  render() {
    return (
      <div className="board">
        {this.state.board &&
          this.state.board.map(row => this.renderRow(row))}
      </div>
    );
  }
}

export default App;

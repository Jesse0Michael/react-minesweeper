import React, { Component } from "react";
import "./Board.css";
import Coordinate from "../../components/Coordinate";

class Board extends Component {
  constructor(p) {
    super(p);
    this.state = {
      board: [],
      gameOver: false
    };
  }

  setBoard(columns, rows, mines) {
    // create the game board
    var board = [];
    for (var i = 0; i < rows; i++) {
      var row = [];
      for (var j = 0; j < columns; j++) {
        row.push({ x: j, y: i, bomb: false, value: "" });
      }
      board.push(row);
    }

    // randomly assign bombs
    var mineCount = 0;
    while (mineCount < mines) {
      var x = Math.floor(Math.random() * columns);
      var y = Math.floor(Math.random() * rows);
      if (board[y][x].bomb) {
        continue;
      } else {
        board[y][x].bomb = true;
        mineCount++;
      }
    }
    // set the board to be rendered
    this.setState({ board: board });
  }

  // react to a location being clicked by looking at this coordinate and the coordinates around it
  cordClicked = cord => {
    if (!this.state.gameOver) {
      if (cord.bomb) {
        this.setState({ gameOver: true });
        for (var i = 0; i < this.state.board.length; i++) {
          for (var j = 0; j < this.state.board[i].length; j++) {
            var evaluate = this.state.board[i][j];
            if (evaluate.bomb) {
              if (evaluate.value === "🚩") {
                evaluate.value = "🏳";
              } else {
                evaluate.value = "💣";
              }
            }
          }
        }
        cord.value = "💥";
      } else {
        this.evaluateCord(cord);
      }
    }
    this.setState({ board: this.state.board });
  };

  // react to a location being right clicked
  cordFlaged = cord => {
    if (cord.value === "🚩") {
      cord.value = "";
    } else if (cord.value === "") {
      cord.value = "🚩";
    }
    this.setState({ board: this.state.board });
  };

  // evaluate a coordinate that has been clicked or is adjacend to a clicked coordinate that had no adjacent bombs
  evaluateCord(cord) {
    if (cord.value === "🚩") {
      return;
    }

    var adjacentBombs = 0;
    for (var i = Math.max(cord.y - 1, 0); i <= Math.min(cord.y + 1, this.state.board.length - 1); i++) {
      for (var j = Math.max(cord.x - 1, 0); j <= Math.min(cord.x + 1, this.state.board[cord.y].length - 1); j++) {
        if (this.state.board[i][j].bomb) {
          adjacentBombs++;
        }
      }
    }

    if (adjacentBombs > 0) {
      // coordinate has adjacent bombs, set value to how many
      cord.value = adjacentBombs.toString();
    } else {
      // coordinate has no adjacent bombs, evaluate surrounding coordinates
      cord.value = " ";
      for (var o = Math.max(cord.y - 1, 0); o <= Math.min(cord.y + 1, this.state.board.length - 1); o++) {
        for (var k = Math.max(cord.x - 1, 0); k <= Math.min(cord.x + 1, this.state.board[cord.y].length - 1); k++) {
          if (!(cord.x === k && cord.y === o) && this.state.board[o][k].value === "") {
            this.evaluateCord(this.state.board[o][k]);
          }
        }
      }
    }
  }

  componentDidMount() {
    this.setBoard(23, 16, 50);
  }

  renderRow(row) {
    return (
      <div className="row">
        {row.map(cord => {
          return (
            <Coordinate
              element={cord}
              onClick={() => this.cordClicked(cord)}
              onContextMenu={() => this.cordFlaged(cord)}
            />
          );
        })}
      </div>
    );
  }

  render() {
    return <div className="board">{this.state.board && this.state.board.map(row => this.renderRow(row))}</div>;
  }
}

export default Board;

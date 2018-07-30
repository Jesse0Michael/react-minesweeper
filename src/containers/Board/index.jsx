import React, { Component } from "react";
import "./Board.css";
import Coordinate from "../../components/Coordinate";
import GameOver from "../../components/GameOver";
import ReactGA from "react-ga";

class Board extends Component {
  constructor(p) {
    super(p);
    this.state = {
      board: [],
      gameOver: false,
      win: false
    };
  }

  setBoard = () => {
    var height = this.board.clientHeight;
    var width = this.board.clientWidth;
    var columns = Math.floor((width - 16) / 38);
    var rows = Math.floor((height - 16) / 38);
    var mines = columns * rows * 0.2;

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
    this.setState({ board: board, gameOver: false, win: false });
    ReactGA.event({ category: "game", action: "new" });
  };

  // react to a location being clicked by looking at this coordinate and the coordinates around it
  cordClicked = cord => {
    if (!this.state.gameOver) {
      if (cord.bomb) {
        this.setState({ gameOver: true, win: false });
        ReactGA.event({ category: "game", action: "lose" });
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

        // check if you won
        var win = true;
        for (var o = 0; o < this.state.board.length; o++) {
          for (var k = 0; k < this.state.board[o].length; k++) {
            var check = this.state.board[o][k];
            if (!check.bomb && (check.value === "" || check.value === "🚩")) {
              win = false;
              break;
            }
          }
          if (!win) {
            break;
          }
        }
        if (win) {
          this.setState({ gameOver: true, win: true });
          ReactGA.event({ category: "game", action: "win" });
        }
      }
      this.setState({ board: this.state.board });
    }
  };

  // react to a location being flagged
  cordFlaged = cord => {
    if (!this.state.gameOver) {
      if (cord.value === "🚩") {
        cord.value = "";
      } else if (cord.value === "") {
        cord.value = "🚩";
      }
      this.setState({ board: this.state.board });
    }
  };

  // evaluate a coordinate that has been clicked or is adjacend to a clicked coordinate that had no adjacent bombs
  evaluateCord(cord) {
    // don't evaluate flagged coordinates
    if (cord.value === "🚩") {
      return;
    }

    // count the number of adjacent bombs
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
    setTimeout(() => {
      this.setBoard();
    }, 200);
  }

  renderRow(row) {
    return (
      <div className="row">
        {row.map(cord => {
          return (
            <Coordinate
              element={cord}
              onClick={() => {
                if (this.props.flagAction) {
                  this.cordFlaged(cord);
                } else {
                  this.cordClicked(cord);
                }
              }}
              onContextMenu={e => {
                e.preventDefault();
                this.cordFlaged(cord);
              }}
            />
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div id="board" ref={board => (this.board = board)} className="board">
        <div>{this.state.board && this.state.board.map(row => this.renderRow(row))}</div>
        {this.state.gameOver && <GameOver win={this.state.win} newGameFunc={this.setBoard} />}
      </div>
    );
  }
}

export default Board;

//check win condition text, have box fly in, give close option, have setBoard wait or retry until theres more than 0 boxes, time play

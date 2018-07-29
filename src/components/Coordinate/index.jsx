import React, { Component } from "react";
import "./Coordinate.css";

class Coordinate extends Component {

  setStyle() {
    if (this.props.gameOver && !this.props.win) {
      var r = Math.round(Math.random() * 255) + 50;
      var g = Math.round(Math.random() * 255) + 50;
      var b = Math.round(Math.random() * 255) + 50;
      var duration = Math.round(Math.random() * 1000) + 500;

      this.setState({
        conditionalStyle: {
          background: "rgba(" + r + ", " + g + ", " + b + ", 0.3)",
          transitionDuration: duration + "ms"
        }
      });
      setTimeout(() => {
        this.setStyle();
      }, duration);
    } else if (!this.props.gameOver) {
      this.setState({
        conditionalStyle: {
          transitionDuration: "0ms"
        }
      });
    }
  }

  render() {
    return (
      <button
        className="coordinate mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
        onClick={this.props.onClick}
        onContextMenu={this.props.onContextMenu}
        disabled={this.props.element.value !== "" && this.props.element.value !== "🚩"}
        // style={this.state.conditionalStyle}
      >
        {this.props.element.value}
      </button>
    );
  }
}

export default Coordinate;

import React, { Component } from "react";
import "./Coordinate.css";

class Coordinate extends Component {
  render() {
    return (
      <button
        className="coordinate mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
        onClick={this.props.onClick}
        disabled={this.props.element.value !== ""}
      >
      {this.props.element.value}
      </button>
    );
  }
}

export default Coordinate;

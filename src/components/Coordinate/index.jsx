import React from "react";
import "./Coordinate.css";

const Coordinate = ({ element }) => (
  <div className="coordinate">
   {element.bomb.toString()} <br />
   {element.state}
  </div>
);

export default Coordinate;

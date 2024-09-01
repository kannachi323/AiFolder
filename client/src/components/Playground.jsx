import React, { useState } from "react";


export function PlaygroundButton() {
    const filters = Object.freeze({
      NAME: 0,
      DATE_MODIFIED: 1,
      TYPE: 2,
    });
  
    const [filterStates, setFilterStates] = useState([0, 0, 0]);
  
    return (
      <button onClick={""} >Playground</button>
    );
}
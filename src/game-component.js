import React, { useReducer } from "react";
import classNames from "classnames";
import {
  reducer,
  killCell,
  reviveCell,
  generate,
  clearBoard
} from "./game";

const Board = () => {
  const [state, dispatch] = useReducer(reducer, reducer());

  const toggleCellStatus = (address, isAlive) =>
    isAlive ? dispatch(killCell(address)) : dispatch(reviveCell(address));
console.log(state);
  return (
    <>
    <header>
    <div>
      <h1>Conway's Game of Life</h1>
      <p>Read more on <a href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life">Wikipedia</a></p>
    </div>
    </header>
      <div className="board">
        {state.map((row, y) => (
          <div className="row" key={`y${y}`}>
            {row.map((isAlive, x) => (
              <div
                key={`x${x}`}
                onClick={() => toggleCellStatus([x, y], isAlive)}
                className={classNames("cell", { alive: isAlive })}
              />
            ))}
          </div>
        ))}
        <div className="button-bar">
        <button onClick={() => dispatch(generate())}>Generate</button>
        <button onClick={() => dispatch(clearBoard(20))}>Clear</button>
        </div>
      </div>
    </>
  );
};

export default Board;

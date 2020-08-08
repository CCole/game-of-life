import produce from "immer";

const updateCell = ([x, y], status) => ({
  type: updateCell.type,
  payload: {
    x,
    y,
    status
  }
});

updateCell.type = "life / updateCell";

const killCell = ([x, y]) => updateCell([x, y], 0);

const reviveCell = ([x, y]) => updateCell([x, y], 1);

const generate = () => ({
  type: generate.type
});

generate.type = "life / generate";

const clearBoard = size => ({
  type: clearBoard.type,
  payload: initialState(size)
});

clearBoard.type = "life / clearBoard";

const get = state => ([x, y]) => state[y] && state[y][x];

const selectNeighbor = ([x, y], state) => {
  const g = get(state);
  return [
    g([x - 1, y - 1]),
    g([x, y - 1]),
    g([x + 1, y - 1]),
    g([x + 1, y]),
    g([x + 1, y + 1]),
    g([x, y + 1]),
    g([x - 1, y + 1]),
    g([x - 1, y])
  ].filter(x => x != null);
};

const initialState = size =>
  Array.from({ length: size }, () => Array.from({ length: size }, () => 0));

const reducer = (state = initialState(20), { type, payload } = {}) => {
  switch (type) {
    case updateCell.type:
      return produce(state, draftState => {
        const { x, y, status } = payload;
        draftState[y][x] = status;
        return draftState;
      });

    case generate.type: {
      const newBoard = Array.from({ length: state.length }, () => []);

      for (let y = 0; y < state.length; y++) {
        for (let x = 0; x < state[0].length; x++) {
          const neighbors = selectNeighbor([x, y], state);
          const liveNeighbors = neighbors.filter(x => x).length;
          const cellStatus = state[y][x];

          if (
            cellStatus === 1 &&
            (liveNeighbors === 2 || liveNeighbors === 3)
          ) {
            newBoard[y][x] = 1;
          } else if (cellStatus === 0 && liveNeighbors === 3) {
            newBoard[y][x] = 1;
          } else {
            newBoard[y][x] = 0;
          }
        }
      }
      return newBoard;
    }

    case clearBoard.type: {
      const newBoard = payload;
      return newBoard;
    }

    default:
      return state;
  }
};

export { reducer, killCell, reviveCell, generate, clearBoard };

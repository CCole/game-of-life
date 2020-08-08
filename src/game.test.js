import { describe } from 'riteway';
import { reducer, updateCell, generate, killCell, reviveCell } from './game.js';

/* gameboard[y][x] 
[
	[0, 1, 0],
	[1, 0, 1]
	[0, 1, 0]
]
*/
const createState = (board = [[]]) => board;


describe('life / killCell', async assert => {
	const getCellAt = ([x, y], state) => state[y][x];
	const board = createState([[1]]);
	const address = [0, 0];

	const state = reducer(board, killCell(address));

	assert({
		given: 'a cell to kill',
		should: 'kill cell',
		actual: getCellAt(address, state),
		expected: 0,
	});
});

describe('life / reviveCell', async assert => {
	const getCellAt = ([x, y], state) => state[y][x];
	const board = createState([[0]]);
	const address = [0, 0];

	const state = reducer(board, reviveCell(address));

	assert({
		given: 'a cell to revive',
		should: 'revive cell',
		actual: getCellAt(address, state),
		expected: 1,
	});
});

describe('life / generate', async assert => {
	// prettier-ignore
	const initialBoard = createState([
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0]
	]);

	// prettier-ignore
	const expected = createState([
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	]);

	const actual = reducer(initialBoard, generate());

	assert({
		given: 'an initial state',
		should: 'generate next board',
		actual,
		expected,
	});
});

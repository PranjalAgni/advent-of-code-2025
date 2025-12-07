import path from 'path';
import { convertInputToList, readInput } from '../utils/data';

function countPaperRolls(rolls: string[]) {
  const matrix = rolls.map((roll) => roll.split(''));

  const rows = matrix.length;
  const cols = matrix[0].length;
  const positions = [];
  let answer = 0;

  function isOutsideBoundary(x: number, y: number) {
    return x < 0 || x >= rows || y < 0 || y >= cols;
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (matrix[row][col] === '@') {
        positions.push([row, col]);
      }
    }
  }

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  while (positions.length > 0) {
    const [row, col] = positions.shift()!;
    let rollCount = 0;
    for (const dir of directions) {
      const newRow = row + dir[0];
      const newCol = col + dir[1];
      if (!isOutsideBoundary(newRow, newCol)) {
        rollCount += 1;
      }
    }

    if (rollCount < 4) {
      answer += 1;
    }
  }

  return answer;
}

const INPUT_PATH = path.join(__dirname, 'input.txt');
const inputData = convertInputToList(await readInput(INPUT_PATH));
const answer = countPaperRolls(inputData);
console.log('Answer is here', answer);

import path from 'path';
import { convertInputToList, readInput } from '../utils/data';

function countPaperRolls(rolls: string[]) {
  const matrix = rolls.map((roll) => roll.split(''));

  const rows = matrix.length;
  const cols = matrix[0].length;
  const positions = [];
  let answer = 0;
  let isCleared = true;

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

  function isOutsideBoundary(x: number, y: number) {
    return x < 0 || x >= rows || y < 0 || y >= cols;
  }

  while (isCleared) {
    isCleared = false;
    let cleared = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (matrix[row][col] === '@') {
          let neighbours = 0;
          let toBeCleared = [];
          for (const dir of directions) {
            const newRow = row + dir[0];
            const newCol = col + dir[1];
            if (
              !isOutsideBoundary(newRow, newCol) &&
              matrix[newRow][newCol] === '@'
            ) {
              neighbours += 1;
              toBeCleared.push([newRow, newCol]);
            }
          }

          if (neighbours < 4) {
            answer += 1;
            cleared += 1;
            isCleared = true;
            matrix[row][col] = 'x';
            // for (const pos of toBeCleared) {
            //   matrix[pos[0]][pos[1]] = 'x';
            // }
          }
        }
      }
    }
  }

  return answer;
}

const INPUT_PATH = path.join(__dirname, 'input.txt');
const inputData = convertInputToList(await readInput(INPUT_PATH));
const answer = countPaperRolls(inputData);
console.log('Answer is here', answer);

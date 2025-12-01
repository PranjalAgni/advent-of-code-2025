import path from 'path';
import { convertInputToList, readInput } from '../utils/data';

function calculateRotation(rotations: string[]) {
  let start = 50;
  let answer = 0;
  for (const rotation of rotations) {
    const direction = rotation[0];
    const number = Number(rotation.slice(1)) % 100;

    if (direction === 'L') {
      start -= number;
      if (start === 0) {
        answer += 1;
      }
      if (start < 0) {
        start = 100 + start;
      }
    } else if (direction === 'R') {
      start += number;
      if (start === 100) {
        answer += 1;
      }
      if (start >= 100) {
        start = start - 100;
      }
    }
  }
  return answer;
}

const INPUT_PATH = path.join(__dirname, 'input.txt');
const inputData = convertInputToList(await readInput(INPUT_PATH));
const answer = calculateRotation(inputData);
console.log('Answer is here', answer);

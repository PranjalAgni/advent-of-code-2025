import path from 'path';
import { convertInputToList, readInput } from '../utils/data';

function computeInvalidIdSum(ids: string[]) {
  let answer = 0;
  for (const id of ids) {
    let [left, right] = id.split('-').map(Number);
    while (left <= right) {
      const leftStr = String(left);
      const isEvenLength = leftStr.length % 2 === 0;
      if (isEvenLength) {
        const half = leftStr.slice(0, leftStr.length / 2);
        if (leftStr === String(half) + String(half)) {
          answer += left;
        }
      }

      left += 1;
    }
  }
  return answer;
}
const INPUT_PATH = path.join(__dirname, 'input.txt');
const inputData = convertInputToList(await readInput(INPUT_PATH), ',');
const answer = computeInvalidIdSum(inputData);
console.log('Answer is here', answer);

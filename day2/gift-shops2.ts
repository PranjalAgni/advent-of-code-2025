import path from 'path';
import { convertInputToList, readInput } from '../utils/data';

function computeInvalidIdSum(ids: string[]) {
  let answer = 0;
  for (const id of ids) {
    let [left, right] = id.split('-').map(Number);
    while (left <= right) {
      const leftStr = String(left);
      const N = leftStr.length;
      for (
        let segmentLength = 1;
        segmentLength <= Math.floor(N / 2);
        segmentLength++
      ) {
        if (N % segmentLength === 0) {
          const segment = leftStr.slice(0, segmentLength);
          const times = N / segmentLength;
          const constructedWord = segment.repeat(times);
          if (leftStr === constructedWord) {
            answer += left;
            break;
          }
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

123456789;

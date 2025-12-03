import path from 'path';
import { convertInputToList, readInput } from '../utils/data';

function largestPossibleJoltage(joltage: string[]) {
  let answer = 0;
  for (const jolt of joltage) {
    const N = jolt.length;
    let currentMax = 0;
    let currentMaxIndex = 0;
    for (let idx = 0; idx < N - 1; idx++) {
      if (Number(jolt[idx]) > currentMax) {
        currentMax = Number(jolt[idx]);
        currentMaxIndex = idx;
      }
    }

    let secondMax = 0;
    for (let idx = currentMaxIndex + 1; idx < N; idx++) {
      secondMax = Math.max(secondMax, Number(jolt[idx]));
    }

    answer += currentMax * 10 + secondMax;
  }

  return answer;
}

const INPUT_PATH = path.join(__dirname, 'input.txt');
const inputData = convertInputToList(await readInput(INPUT_PATH));
const answer = largestPossibleJoltage(inputData);
console.log('Answer is here', answer);

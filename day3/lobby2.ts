import path from 'path';
import { convertInputToList, readInput } from '../utils/data';

function largest12DigitNumber(s: string): string {
  const k = 12;
  const n = s.length;

  if (n === k) return s; // already 12 digits, nothing to do

  let toRemove = n - k; // how many digits we are allowed to drop
  const stack: string[] = [];

  for (const ch of s) {
    // While the last digit is smaller than the current digit
    // and we can still remove digits, pop it to make number bigger.
    while (toRemove > 0 && stack.length > 0 && stack[stack.length - 1] < ch) {
      stack.pop();
      toRemove--;
    }
    stack.push(ch);
  }

  // If we still have digits to remove, remove from the end
  // (these are the least significant ones).
  while (toRemove > 0) {
    stack.pop();
    toRemove--;
  }

  // Ensure only 12 digits (in case stack is longer due to logic)
  return stack.slice(0, k).join('');
}

function largestPossibleJoltage(joltage: string[]) {
  let answer = 0;
  for (const jolt of joltage) {
    const N = jolt.length;
    answer += Number(largest12DigitNumber(jolt));
  }

  return answer;
}

const INPUT_PATH = path.join(__dirname, 'input.txt');
const inputData = convertInputToList(await readInput(INPUT_PATH));
const answer = largestPossibleJoltage(inputData);
console.log('Answer is here', answer);

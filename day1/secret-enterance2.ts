// import path from 'path';
// import { convertInputToList, readInput } from '../utils/data';

// function countZerosRight(start: number, steps: number): number {
//   const first = (100 - start) % 100;

//   if (first === 0) {
//     // Already at 0: next 0 after 100 steps
//     if (steps < 100) return 0;
//     return 1 + Math.floor((steps - 100) / 100);
//   } else {
//     if (steps < first) return 0;
//     return 1 + Math.floor((steps - first) / 100);
//   }
// }

// function countZerosLeft(start: number, steps: number): number {
//   if (start === 0) {
//     // First time back to 0 is after 100 steps
//     if (steps < 100) return 0;
//     return 1 + Math.floor((steps - 100) / 100);
//   } else {
//     // First time we reach 0 is after `start` steps
//     if (steps < start) return 0;
//     return 1 + Math.floor((steps - start) / 100);
//   }
// }

// function calculateRotation(rotations: string[]) {
//   let pos = 50; // starting at 50 as per problem
//   let answer = 0;

//   for (const rotation of rotations) {
//     const direction = rotation[0];
//     const steps = Number(rotation.slice(1));

//     if (direction === 'R') {
//       answer += countZerosRight(pos, steps);
//       pos = (pos + steps) % 100;
//     } else if (direction === 'L') {
//       answer += countZerosLeft(pos, steps);
//       // normalize using modulo
//       const s = steps % 100;
//       pos = (pos - s + 100) % 100;
//     } else {
//       throw new Error(`Unknown direction: ${direction}`);
//     }
//   }

//   return answer;
// }

// async function main() {
//   const INPUT_PATH = path.join(__dirname, 'input.txt');
//   const inputData = convertInputToList(await readInput(INPUT_PATH));
//   const answer = calculateRotation(inputData);
//   console.log('Answer is here', answer);
// }

// main().catch(console.error);

import path from 'path';
import { convertInputToList, readInput } from '../utils/data';

function calculateRotation(rotations: string[]) {
  let start = 50;
  let answer = 0;
  for (const rotation of rotations) {
    const direction = rotation[0];
    const number = Number(rotation.slice(1));

    if (direction === 'L') {
      start -= number;
      while (start < 0) {
        answer += 1;
        start = 100 + start;
      }
    } else if (direction === 'R') {
      start += number;
      while (start >= 100) {
        answer += 1;
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

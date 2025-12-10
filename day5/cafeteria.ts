import path from 'path';
import { convertInputToList, readInput } from '../utils/data';

function findRottenIngredients(input: string[]) {
  const rangesData = input[0].split('\n');
  const queries = input[1].split('\n').map(Number);

  let answer = 0;
  for (const query of queries) {
    let isFresh = false;
    for (const range of rangesData) {
      const [from, to] = range.split('-').map(Number);
      if (query >= from && query <= to) {
        isFresh = true;
        break;
      }
    }

    if (isFresh) {
      answer += 1;
    }
  }

  return answer;
}

const INPUT_PATH = path.join(__dirname, 'input.txt');
const inputData = convertInputToList(await readInput(INPUT_PATH), '\n\n');
const answer = findRottenIngredients(inputData);
console.log('Answer is here', answer);

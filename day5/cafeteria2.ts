import path from 'path';
import { convertInputToList, readInput } from '../utils/data';

function processRanges(input: string[]) {
  const intervals = [];
  const rangesData = input[0].split('\n');
  for (const range of rangesData) {
    const [from, to] = range.split('-').map(Number);
    intervals.push([from, to]);
  }

  return intervals;
}

function mergeIntervals(intervals: number[][]) {
  const sortedIntevals = intervals.sort((interval1, interval2) => {
    return interval1[1] - interval2[1];
  });

  const mergedIntervals = [];
  mergedIntervals.push(sortedIntevals[0]);

  const N = sortedIntevals.length;
  for (let idx = 1; idx < N; idx++) {
    const pos: number = mergedIntervals.length - 1;
    const [fc, tc] = mergedIntervals.at(pos)! as [number, number];
    const [f, t] = sortedIntevals[idx];
    if (tc >= f && tc <= t) {
      // replace
      mergedIntervals[pos] = [Math.min(fc, f), t];
    } else if (tc >= f && tc > t) {
      // replace
      mergedIntervals[pos] = [Math.min(fc, f), tc];
    } else {
      // add
      mergedIntervals.push([f, t]);
    }
  }

  return mergedIntervals;
}

function countFreshIngredients(input: string[]) {
  const intervals = processRanges(input);
  const mergedIntervals = mergeIntervals(intervals);
  let answer = 0;

  for (const [from, to] of mergedIntervals) {
    answer += to - from + 1;
  }
  return answer;
}

const INPUT_PATH = path.join(__dirname, 'input.txt');
const inputData = convertInputToList(await readInput(INPUT_PATH), '\n\n');
const answer = countFreshIngredients(inputData);
console.log('Answer is here', answer);

/**
3-5
10-14
16-20
12-18


3-10
10-14
12-18
16-20

[[3,5]]

fp = 3
tp = 5

f = 10
t = 14

tp > f && tp < t


1-7
8-12
6-9
13-15
11-17
15-23


1-7
6-9
8-12
13-15
11-17
15-23

[[1,7]]
fc = 1 tc = 7
f = 6 t = 9
replace with fc, t [[1,9]]

fc = 1 tc = 9
f = 8 t = 12
replace with fc, t [[1,12]]

[[1,12]]
fc = 1 tc = 12
f = 13 t = 15
add f, t [[1,12], [13,15]]

fc = 13 tc = 15
f = 11 t = 17

tc >= f && tc < t: 
new-f = min(fc, f)
new-t = t

replace
[[1,12], [11,17]]

fc = 11 tc = 17
f = 15 t= 23
replace
[[1,12], [11,23]]
 */

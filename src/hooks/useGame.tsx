import { useState } from 'react';
import { useBoard } from './useBoard';
let serchcount = 0;

export const useGame = () => {
  const { maze, setMaze, directions, newMaze } = useBoard();

  const iterateBoard = (callback: (y: number, x: number) => void) => {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        callback(y, x);
      }
    }
  };

  const Itteme = (y: number, x: number) => {
    if (y % 2 === 1 && x % 2 === 1) {
      const falldirection = directions[Math.floor(Math.random() * directions.length)];
      if (maze[y + falldirection[0]] !== undefined && maze[x + falldirection[1]] !== undefined) {
        newMaze[y + falldirection[0]][x + falldirection[1]] = 2;
        newMaze[y][x] = 1;
      }
    }
  };

  const allOne = (y: number, x: number) => {
    if (newMaze[y][x] === 2) {
      newMaze[y][x] = 1;
      setMaze(newMaze);
    }
  };

  const allZero = (y: number, x: number) => {
    newMaze[y][x] = 0;
    setMaze(newMaze);
  };

  const onClick = () => {
    iterateBoard(allZero);
    iterateBoard(Itteme);
    newMaze[0][0] = 3;
    iterateBoard(allOne);
  };

  const [human, setHuman] = useState(0);
  const direction = directions[human % 4];
  const nextdirection = directions[(human + 1) % 4];
  const backdirection = directions[(human + 2) % 4];
  console.log('direction', direction);
  console.log('nextdirection', nextdirection);

  const undefinedCheck = (y: number, x: number) => {
    return maze[y + direction[0]] !== undefined && maze[x + direction[1]] !== undefined;
  };

  const searchCheck = (y: number, x: number) => {
    return undefinedCheck(y, x) && maze[y + direction[0]][x + direction[1]] === 0;
  };

  const changeBoard = (y: number, x: number) => {
    newMaze[y][x] = 4;
    newMaze[y + direction[0]][x + direction[1]] = 3;
    setMaze(newMaze);
    serchcount++;
  };

  const rotateHuman = () => {
    if (human === 3) {
      console.log('回転した');
      setHuman(0);
    } else {
      console.log('回転した');
      setHuman(human + 1);
    }
  };

  console.log('serchcount', serchcount);

  const moveForward = (y: number, x: number) => {
    if (searchCheck(y, x) && maze[y + nextdirection[0]][x + nextdirection[1]] === undefined) {
      changeBoard(y, x);
      console.log('進んだundefined');
    } else if (searchCheck(y, x) && maze[y + nextdirection[0]][x + nextdirection[1]] === 1) {
      changeBoard(y, x);
      console.log('進んだ1');
    } else if (searchCheck(y, x) && maze[y + nextdirection[0]][x + nextdirection[1]] === 4) {
      changeBoard(y, x);
      console.log('進んだ4');
    } else {
      rotateHuman();
    }
  };

  const searchCell = (y: number, x: number) => {
    if (serchcount === 0 && maze[y][x] === 3) {
      if (
        undefinedCheck(y, x) &&
        maze[y + direction[0]][x + direction[1]] === 4 &&
        maze[y + nextdirection[0]][x + nextdirection[1]] === 1
      ) {
        changeBoard(y, x);
      } else {
        moveForward(y, x);
      }
    }
  };

  const onSearchClick = () => {
    iterateBoard(searchCell);
    serchcount = 0;
  };

  return { maze, setMaze, onClick, iterateBoard, onSearchClick, human };
};

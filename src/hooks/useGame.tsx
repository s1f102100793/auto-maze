import { useState } from 'react';
import { useBoard } from './useBoard';

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

  let pillar = 0;
  const pillarcount = (y: number, x: number) => {
    if (maze[y][x] === 1) {
      pillar++;
    }
  };

  const onClick = () => {
    iterateBoard(pillarcount);
    if (pillar === 0) {
      iterateBoard(Itteme);
      newMaze[0][0] = 3;
      iterateBoard(allOne);
    }
  };

  const [human, setHuman] = useState(0);
  const direction = directions[human % 4];
  const nextdirection = directions[(human + 1) % 4];

  const searchCell = (y: number, x: number) => {
    console.log('searchしたとき');
    console.table(maze);
    if (
      maze[y][x] === 3 &&
      maze[y + direction[0]] !== undefined &&
      maze[x + direction[1]] !== undefined &&
      maze[y + direction[0]][x + direction[1]] === 0 &&
      maze[y + nextdirection[0]][x + nextdirection[1]] === 1
    ) {
      newMaze[y][x] = 0;
      newMaze[y + direction[0]][x + direction[1]] = 4;
      setMaze(newMaze);
    } else {
      if (human === 3) {
        setHuman(0);
      } else {
        console.log('回転した');
        setHuman(human + 1);
      }
    }
  };

  const changeThreeToFour = (y: number, x: number) => {
    if (newMaze[y][x] === 4) {
      newMaze[y][x] = 3;
      setMaze(newMaze);
    }
  };

  const onSearchClick = () => {
    iterateBoard(searchCell);
    iterateBoard(changeThreeToFour);
  };

  return { maze, setMaze, onClick, iterateBoard, onSearchClick };
};

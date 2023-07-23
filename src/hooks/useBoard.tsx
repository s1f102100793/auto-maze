import { useState } from 'react';

export const useBoard = () => {
  const [maze, setMaze] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const directions: number[][] = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  const newMaze: number[][] = JSON.parse(JSON.stringify(maze));

  const iterateBoard = (callback: (y: number, x: number) => void) => {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        callback(y, x);
      }
    }
  };

  return { maze, setMaze, directions, newMaze, iterateBoard };
};

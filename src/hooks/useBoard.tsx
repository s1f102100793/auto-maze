import { useState } from 'react';

export const useBoard = () => {
  const [maze, setMaze] = useState([
    [3, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const directions: number[][] = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  const newMaze: number[][] = JSON.parse(JSON.stringify(maze));

  return { maze, setMaze, directions, newMaze };
};

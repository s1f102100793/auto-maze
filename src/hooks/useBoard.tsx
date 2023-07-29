import { useState } from 'react';

export const useBoard = () => {
  const [mazeSize, setMazeSize] = useState(9); // デフォルトのサイズは9（9x9の迷路）

  const generateMaze = (size: number) => {
    const maze = [];
    for (let i = 0; i < size; i++) {
      maze.push(Array(size).fill(0));
    }
    return maze;
  };

  const [maze, setMaze] = useState(generateMaze(mazeSize));

  const handleMazeSizeChange = (newSize: number) => {
    if (newSize % 2 === 0) {
      // サイズが常に奇数になるようにします
      newSize++;
    }
    setMazeSize(newSize);
    setMaze(generateMaze(newSize));
  };

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

  return { maze, setMaze, directions, newMaze, iterateBoard, handleMazeSizeChange, mazeSize };
};

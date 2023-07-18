import { useState } from 'react';
import { useBoard } from './useBoard';
import { useGame } from './useGame';

export const useHuman = () => {
  const { iterateBoard, maze } = useGame();
  const { directions, newMaze, setMaze } = useBoard();
  const [human, setHuman] = useState(0);
  const direction = directions[human];

  const searchCell = (y: number, x: number) => {
    if (
      maze[y + direction[0]] !== undefined &&
      maze[x + direction[1]] !== undefined &&
      maze[y + direction[0]][x + direction[1]] === 0
    ) {
      newMaze[y][x] = 0;
      newMaze[y + direction[0]][x + direction[1]] = 3;
      setMaze(newMaze);
    } else {
      if (human === 3) {
        setHuman(0);
      } else {
        setHuman(human + 1);
      }
    }
  };

  const onSearchClick = () => {
    iterateBoard(searchCell);
  };
  return { onSearchClick, maze};
};

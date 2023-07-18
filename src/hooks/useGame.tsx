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
      iterateBoard(allOne);
    }
  };

  return { maze, setMaze, onClick };
};

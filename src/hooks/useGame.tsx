import { useCallback, useState } from 'react';
import { useBoard } from './useBoard';
let goal = 0;
let start = 0;
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
    setHuman(0);
    goal = 0;
    start = 0;
  };

  const [human, setHuman] = useState(0);
  const [autoClick, setAutoClick] = useState(false);
  const [searchcount, setSearchCount] = useState(0);
  const direction = directions[human % 4];
  const rightdirection = directions[(human + 1) % 4];

  const undefinedCheck = useCallback(
    (y: number, x: number) => {
      return maze[y + direction[0]] !== undefined && maze[x + direction[1]] !== undefined;
    },
    [maze, direction]
  );
  const searchCheck = useCallback(
    (y: number, x: number) => {
      return undefinedCheck(y, x) && maze[y + direction[0]][x + direction[1]] === 0;
    },
    [undefinedCheck, maze, direction]
  );
  const changeBoard = useCallback(
    (y: number, x: number) => {
      newMaze[y][x] = 4;
      newMaze[y + direction[0]][x + direction[1]] = 3;
      setMaze(newMaze);
      setSearchCount(1);
    },
    [newMaze, direction, setMaze]
  );
  const changeBoard2 = useCallback(
    (y: number, x: number) => {
      newMaze[y][x] = 5;
      newMaze[y + direction[0]][x + direction[1]] = 3;
      setMaze(newMaze);
      setSearchCount(1);
    },
    [newMaze, direction, setMaze]
  );
  const rotateHuman = useCallback(() => {
    if (human === 3) {
      console.log('回転した');
      setHuman(0);
    } else {
      console.log('回転した');
      setHuman(human + 1);
    }
  }, [human]);
  const rightDirectionrules = useCallback(
    (y: number, x: number) => {
      return (
        maze[y + rightdirection[0]][x + rightdirection[1]] === undefined ||
        maze[y + rightdirection[0]][x + rightdirection[1]] === 1 ||
        maze[y + rightdirection[0]][x + rightdirection[1]] === 4 ||
        maze[y + rightdirection[0]][x + rightdirection[1]] === 5
      );
    },
    [maze, rightdirection]
  );
  let fourmovecount = 0;
  const moveZero = useCallback(
    (y: number, x: number) => {
      if (fourmovecount === 0) {
        if (searchCheck(y, x) && rightDirectionrules(y, x)) {
          changeBoard(y, x);
          console.log('進んだ');
        } else {
          rotateHuman();
        }
      }
    },
    [fourmovecount, searchCheck, rightDirectionrules, changeBoard, rotateHuman]
  );
  const fourRightrules = useCallback(
    (y: number, x: number) => {
      return (
        maze[y + rightdirection[0]][x + rightdirection[1]] === undefined ||
        maze[y + rightdirection[0]][x + rightdirection[1]] === 4 ||
        maze[y + rightdirection[0]][x + rightdirection[1]] === 5 ||
        maze[y + rightdirection[0]][x + rightdirection[1]] === 1
      );
    },
    [maze, rightdirection]
  );
  const moveFour = useCallback(
    (y: number, x: number) => {
      if (
        undefinedCheck(y, x) &&
        maze[y + direction[0]][x + direction[1]] === 4 &&
        fourRightrules(y, x)
      ) {
        changeBoard2(y, x);
        fourmovecount++;
      }
    },
    [fourmovecount, undefinedCheck, maze, direction, changeBoard2, fourRightrules]
  );
  const bottomRightmove = useCallback(
    (y: number, x: number) => {
      if (searchCheck(y, x)) {
        changeBoard(y, x);
      } else if (
        maze[y + direction[0]][x + direction[1]] === 1 ||
        maze[y + direction[0]][x + direction[1]] === undefined
      ) {
        rotateHuman();
      } else {
        changeBoard2(y, x);
      }
    },
    [searchCheck, maze, direction, changeBoard, changeBoard2, rotateHuman]
  );
  const bottomMove = useCallback(
    (y: number, x: number) => {
      if (human % 4 === 1) {
        bottomRightmove(y, x);
      } else {
        moveFour(y, x);
        moveZero(y, x);
      }
    },
    [human, moveFour, moveZero, bottomRightmove]
  );
  const humanMove = useCallback(
    (y: number, x: number) => {
      if (searchcount === 0 && maze[y][x] === 3) {
        if (y !== 8) {
          moveFour(y, x);
          moveZero(y, x);
        } else if (y === 8) {
          bottomMove(y, x);
        }
      }
    },
    [maze, moveFour, moveZero, bottomMove, searchcount]
  );
  const Goal = useCallback(() => {
    if (goal === 0 && maze[8][8] === 3) {
      alert('goal');
      goal++;
    }
  }, [maze]);
  const onSearchClickkey = () => {
    setAutoClick(!autoClick);
    start = 1;
  };
  return {
    maze,
    onClick,
    iterateBoard,
    onSearchClickkey,
    autoClick,
    goal,
    humanMove,
    Goal,
    setSearchCount,
    start,
  };
};

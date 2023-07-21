import { useEffect, useState } from 'react';
import { useBoard } from './useBoard';
let serchcount = 0;
let goal = 0;
const key = 0;

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
  const [autoClick, setAutoClick] = useState(false);
  const leftdirection = directions[(human + 3) % 4];
  const direction = directions[human % 4];
  const rightdirection = directions[(human + 1) % 4];
  console.log('human', human);
  console.log('direction', direction);
  console.log('rightdirection', rightdirection);
  console.log('leftdirection', leftdirection);

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
  const changeBoard2 = (y: number, x: number) => {
    newMaze[y][x] = 5;
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

  const rightDirectionrules = (y: number, x: number) => {
    return (
      maze[y + rightdirection[0]][x + rightdirection[1]] === undefined ||
      maze[y + rightdirection[0]][x + rightdirection[1]] === 1 ||
      maze[y + rightdirection[0]][x + rightdirection[1]] === 4 ||
      maze[y + rightdirection[0]][x + rightdirection[1]] === 5
    );
  };

  const moveZero = (y: number, x: number) => {
    if (fourmovecount === 0) {
      if (searchCheck(y, x) && rightDirectionrules(y, x)) {
        changeBoard(y, x);
        console.log('進んだ');
      } else {
        rotateHuman();
      }
    }
  };

  const fourRightrules = (y: number, x: number) => {
    return (
      maze[y + rightdirection[0]][x + rightdirection[1]] === undefined ||
      maze[y + rightdirection[0]][x + rightdirection[1]] === 4 ||
      maze[y + rightdirection[0]][x + rightdirection[1]] === 5 ||
      maze[y + rightdirection[0]][x + rightdirection[1]] === 1
    );
  };

  let fourmovecount = 0;
  const moveFour = (y: number, x: number) => {
    if (
      undefinedCheck(y, x) &&
      maze[y + direction[0]][x + direction[1]] === 4 &&
      fourRightrules(y, x)
    ) {
      changeBoard2(y, x);
      fourmovecount++;
    }
  };

  const bottomRightmove = (y: number, x: number) => {
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
  };

  const bottomMove = (y: number, x: number) => {
    if (human % 4 === 1) {
      bottomRightmove(y, x);
    } else {
      moveFour(y, x);
      moveZero(y, x);
    }
  };

  const humanMove = (y: number, x: number) => {
    if (serchcount === 0 && maze[y][x] === 3) {
      if (y !== 8) {
        moveFour(y, x);
        moveZero(y, x);
      } else if (y === 8) {
        bottomMove(y, x);
      }
    }
  };

  const Goal = () => {
    if (goal === 0 && maze[8][8] === 3) {
      alert('goal');
      goal++;
    }
  };

  const onSearchClickkey = () => {
    setAutoClick(!autoClick);
  };

  useEffect(() => {
    if (autoClick) {
      const onSearchClick = () => {
        if (goal === 0) {
          iterateBoard(humanMove);
          serchcount = 0;
          iterateBoard(Goal);
        }
      };

      const interval = setInterval(() => {
        onSearchClick();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [autoClick, Goal, humanMove]);

  // const autoOnserchClick = () => {
  //   setInterval(onSearchClick, 1000);
  // };

  return { maze, setMaze, onClick, iterateBoard, human, onSearchClickkey };
};

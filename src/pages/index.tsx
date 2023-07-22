import { useEffect } from 'react';
import { useGame } from '../hooks/useGame';
import styles from './index.module.css';
const Home = () => {
  const {
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
    newMaze,
    setMaze,
  } = useGame();
  useEffect(() => {
    if (autoClick) {
      const onSearchClick = () => {
        if (goal === 0 && start === 1) {
          iterateBoard(humanMove);
          setSearchCount(0);
          iterateBoard(Goal);
        }
      };
      const interval = setInterval(() => {
        onSearchClick();
      }, 600);
      return () => clearInterval(interval);
    }
  }, [autoClick, humanMove, Goal, goal, iterateBoard, setSearchCount, start]);

  if (maze[8][8] === 3) {
    newMaze[8][8] = 7;
    setMaze(newMaze);
  }

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {maze.map((row, yIndex) => {
          return row.map((col, xIndex) => {
            const cellStyle =
              col === 1
                ? styles['cell-black']
                : col === 6
                ? styles['goal']
                : col === 3
                ? styles.human
                : col === 7
                ? styles.satoshipikachu
                : styles['cell-white'];
            return <div key={`cell-${yIndex}-${xIndex}`} className={cellStyle} />;
          });
        })}
      </div>
      <button className={styles.generation} onClick={onClick}>
        生成
      </button>
      <button className={styles.search} onClick={onSearchClickkey}>
        探索
      </button>
    </div>
  );
};

export default Home;

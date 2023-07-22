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
  } = useGame();
  console.log('start', start);
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
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoClick, humanMove, Goal, goal, iterateBoard, setSearchCount, start]);

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {maze.map((row, yIndex) => {
          return row.map((col, xIndex) => {
            const cellStyle =
              col === 0
                ? styles['cell-white']
                : col === 1
                ? styles['cell-black']
                : col === 4
                ? styles['cell-white']
                : col === 5
                ? styles['cell-white']
                : styles.human;
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

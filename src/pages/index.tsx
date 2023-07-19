import { useGame } from '../hooks/useGame';
import styles from './index.module.css';

const Home = () => {
  const { maze, onClick, onSearchClick, human } = useGame();
  // const { onSearchClick } = useHuman();
  // console.log('human', human);
  console.table(maze);
  const rotatedDegrees = (human - 1) * 90;
  const rotatedStyle = {
    transform: `rotate(${rotatedDegrees}deg)`,
  };
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
                : styles.human;
            return <div key={`cell-${yIndex}-${xIndex}`} className={cellStyle} />;
          });
        })}
      </div>
      <button className={styles.generation} onClick={onClick}>
        生成
      </button>
      <button className={styles.search} onClick={onSearchClick}>
        探索
      </button>
    </div>
  );
};

export default Home;

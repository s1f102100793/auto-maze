import { useGame } from '../hooks/useGame';
import { useHuman } from '../hooks/useHuman';
import styles from './index.module.css';

const Home = () => {
  const { maze, onClick, onSearchClick } = useGame();
  // const { onSearchClick } = useHuman();
  console.table(maze);
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {maze.map((row, yIndex) => {
          return row.map((col, xIndex) => {
            const cellStyle =
              col === 0 ? styles['cell-white'] : col === 1 ? styles['cell-black'] : styles.human;
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

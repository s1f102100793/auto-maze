import { useGame } from '../hooks/useGame';
import styles from './index.module.css';

const Home = () => {
  const { maze, onClick } = useGame();
  console.table(maze);
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {maze.map((row, yIndex) => {
          return row.map((col, xIndex) => {
            const cellStyle = col === 0 ? styles['cell-white'] : styles['cell-black'];
            return <div key={`cell-${yIndex}-${xIndex}`} className={cellStyle} />;
          });
        })}
      </div>
      <button className={styles.generation} onClick={onClick}>
        生成
      </button>
    </div>
  );
};

export default Home;

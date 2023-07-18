import { useGame } from '../hooks/useGame';
import styles from './index.module.css';

const Home = () => {
  const { maze, onClick } = useGame();
  console.table(maze);
  return (
    <div className={styles.container}>
      <div className={styles.board} onClick={onClick} />
    </div>
  );
};

export default Home;

import { useEffect } from 'react';
import { useBoard } from '../hooks/useBoard';
import { useGame } from '../hooks/useGame';
import styles from './index.module.css';

const Home = () => {
  const {
    blockPettern,
    maze,
    onClick,
    onSearchClickkey,
    // autoClick,
    goal,
    humanMove,
    Goal,
    setSearchCount,
    start,
    newMaze,
    setMaze,
    human,
    boardPettern,
  } = useGame();
  const {
    iterateBoard,
    //  handleMazeSizeChange,
    // mazeSize,
  } = useBoard();

  // onSearchClick関数をuseEffectの外で定義する
  useEffect(() => {
    const onSearchClick = () => {
      if (goal === 0 && start === 1) {
        iterateBoard(humanMove);
        setSearchCount(0);
        iterateBoard(Goal);
      }
    };
    const interval = setInterval(() => {
      onSearchClick();
    }, 180);
    return () => clearInterval(interval);
  }, [humanMove, Goal, goal, iterateBoard, setSearchCount, start]);

  if (maze[8][8] === 3) {
    newMaze[8][8] = 7;
    setMaze(newMaze);
  }

  const getRotationClass = (angle: number) => {
    return `rotate${(angle - 1) * 90}`;
  };

  const pikachuGetAction = (yIndex: number, xIndex: number, cellStyle: string, col: number) => {
    return (
      <div key={`cell-${yIndex}-${xIndex}`} className={cellStyle}>
        {col === 7 && (
          <div className={styles['text-box']}>
            <h1 className={styles.pikachuget}>ピカチュウ キミにきめた！</h1>
          </div>
        )}
      </div>
    );
  };

  console.log('human', human);

  const CrossButton = () => {
    return (
      <div className={styles.rectcontainer}>
        <div className={`${styles.rect1} ${human === 1 ? styles.active : ''}`} />
        <div className={`${styles.rect2} ${human === 2 ? styles.active : ''}`} />
        <div className={`${styles.rect3} ${human === 3 ? styles.active : ''}`} />
        <div className={`${styles.rect0} ${human === 0 ? styles.active : ''}`} />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.gameboy}>
        <div className={styles.header}>
          <h1 className={styles['animated-heading']}>サトシにたどりつけ！</h1>
        </div>
        <div className={styles[`board${boardPettern}` as keyof typeof styles]}>
          {maze.map((row, yIndex) => {
            return row.map((col, xIndex) => {
              const cellStyle =
                col === 1
                  ? styles[`cell-black${blockPettern}` as keyof typeof styles]
                  : col === 6
                  ? styles['goal']
                  : col === 3
                  ? `${styles.pikachu} ${(styles as any)[getRotationClass(human)]}`
                  : col === 7
                  ? styles.satoshipikachu
                  : styles['cell-white'];
              return pikachuGetAction(yIndex, xIndex, cellStyle, col);
            });
          })}
        </div>
        <div className={styles.lower}>
          <CrossButton />
          <div className={styles.rightbutton}>
            <button className={styles.generation} onClick={onClick}>
              <h1 className={styles.word}>はじめから</h1>
            </button>
            <button className={styles.search} onClick={onSearchClickkey}>
              <h1 className={styles.word}>さがす</h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

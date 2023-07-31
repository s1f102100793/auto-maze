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
    autoClick,
    goal,
    humanMove,
    Goal,
    setSearchCount,
    start,
    newMaze,
    setMaze,
    human,
  } = useGame();

  const { iterateBoard, handleMazeSizeChange, mazeSize } = useBoard();
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

  // const [inputNumber, setInputNumber] = useState(0);

  console.log('goal', goal);
  console.log('start', start);
  const onSearchClick = () => {
    if (goal === 0) {
      iterateBoard(humanMove);
      setSearchCount(0);
      iterateBoard(Goal);
    }
  };
  if (maze[8][8] === 3) {
    newMaze[8][8] = 7;
    setMaze(newMaze);
  }

  const getRotationClass = (angle: number) => {
    return `rotate${(angle - 1) * 90}`;
  };

  // console.log(inputNumber);
  // const selectNumberMaze = () => {
  //   for (let z = 0; z < inputNumber; z++) {
  //     onSearchClick();
  //   }
  // };

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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles['animated-heading']}>サトシにたどりつけ！</h1>
      </div>
      <div className={styles.board}>
        {maze.map((row, yIndex) => {
          return row.map((col, xIndex) => {
            const cellStyle =
              col === 1
                ? styles[`cell-black${blockPettern}`]
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
      {/* <label>
        迷路のサイズ（奇数）:
        <input
          type="number"
          value={mazeSize}
          onChange={(e) => handleMazeSizeChange(parseInt(e.target.value, 10))}
        />
      </label> */}
      <button className={styles.generation} onClick={onClick}>
        <h1 className={styles.word}>はじめから</h1>
      </button>
      <button className={styles.search} onClick={onSearchClickkey}>
        <h1 className={styles.word}>さがす</h1>
      </button>
      {/* <button className={styles.select} onClick={selectNumberMaze}>
        入力した〇手目を表示
      </button>
      <input
        type="number"
        value={inputNumber}
        onChange={(e) => setInputNumber(Number(e.target.value))}
      /> */}
    </div>
  );
};

export default Home;

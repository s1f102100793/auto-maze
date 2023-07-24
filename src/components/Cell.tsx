import styles from './cell.module.css';

export const Cell = (props: {
  col: number;
  yIndex: number;
  xIndex: number;
  human: number;
  getRotationClass: (angle: number) => string;
}) => {
  const cellStyle =
    props.col === 1
      ? styles['cell-black']
      : props.col === 6
      ? styles['goal']
      : props.col === 3
      ? `${styles.pikachu} ${(styles as any)[props.getRotationClass(props.human)]}`
      : props.col === 7
      ? styles.satoshipikachu
      : styles['cell-white'];
  return <div key={`cell-${props.yIndex}-${props.xIndex}`} className={cellStyle} />;
};

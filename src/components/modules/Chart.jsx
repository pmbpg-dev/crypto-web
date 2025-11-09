import styles from "./Chart.module.css";

function Chart({ setChart }) {
  return (
    <div className={styles.container}>
      <div className={styles.chart}>chart</div>
      <button onClick={() => setChart(false)}>x</button>
    </div>
  );
}

export default Chart;

import TabeleRow from "./TabeleRow";
import styles from "./TabeleCoin.module.css";

function TabeleCoin({ coins, currency, setChart }) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Name</th>
            <th>Price</th>
            <th>24h</th>
            <th>Total Volume</th>
            <th>Chart</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <TabeleRow
              coin={coin}
              key={coin.id}
              currency={currency}
              setChart={setChart}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabeleCoin;

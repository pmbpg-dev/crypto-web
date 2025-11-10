import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import styles from "./TabeleRow.module.css";
import { marketChart } from "../../services/cryptoApi";

function TabeleRow({ coin, currency, setChart }) {
  const {
    id,
    name,
    image,
    symbol,
    total_volume,
    current_price,
    price_change_percentage_24h: price_change,
  } = coin;

  const showChartHandler = async () => {
    const data = await marketChart(id);
    setChart({ ...data, coin });
  };

  return (
    <tr className={styles.row}>
      <td>
        <div className={styles.symbol} onClick={showChartHandler}>
          <img src={image} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {currency === "usd" ? "$" : currency === "eur" ? "£" : "¥"}
        {current_price.toLocaleString()}
      </td>
      <td className={price_change > 0 ? styles.success : styles.error}>
        {price_change.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img
          src={price_change > 0 ? chartUp : chartDown}
          alt={name}
          className={styles.chart}
        />
      </td>
    </tr>
  );
}

export default TabeleRow;

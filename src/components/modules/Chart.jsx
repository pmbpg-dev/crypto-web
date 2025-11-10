import { useEffect, useState } from "react";
import { convertData } from "../../helper/converData";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styles from "./Chart.module.css";

function Chart({ setChart, chart }) {
  const [type, setType] = useState("prices");
  const [data, setData] = useState([]);

  useEffect(() => {
    const getConvertData = async () => {
      const res = await convertData(chart, type);
      setData(res);
    };
    getConvertData();
  }, [type]);

  const typeHandler = (e) => {
    if (e.target.tagName !== "BUTTON") return;
    const type = e.target.innerText.toLowerCase().replace(" ", "_");
    setType(type);
  };
  return (
    <div className={styles.container}>
      <button onClick={() => setChart(false)} className={styles.close}>
        x
      </button>
      <div className={styles.chart}>
        <div className={styles.name}>
          <img src={chart.coin.image} />
          <p>{chart.coin.name}</p>
        </div>
        <div className={styles.graph}>
          <ChartComponents data={data} type={type} />
        </div>
        <div className={styles.types} onClick={typeHandler}>
          <button className={type === "prices" ? styles.selected : null}>
            Prices
          </button>
          <button className={type === "total_volumes" ? styles.selected : null}>
            {" "}
            Total Volumes
          </button>
          <button className={type === "market_caps" ? styles.selected : null}>
            Market Caps
          </button>
        </div>
        <div className={styles.details}>
          <div>
            <p>Prices:</p>
            <span>${chart.coin.current_price.toLocaleString()}</span>
          </div>
          <div>
            <p>ATH:</p>
            <span>${chart.coin.ath.toLocaleString()}</span>
          </div>
          <div>
            <p>Market Cap:</p>
            <span>{chart.coin.market_cap}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;

// ===================chart components==================
const ChartComponents = ({ data, type }) => {
  return (
    <AreaChart
      style={{
        maxWidth: "80%",
        height: "300px",
      }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid stroke="#3c3c3cff" />
      <XAxis dataKey="date" hide />
      <YAxis dataKey={type} domain={["auto", "auto"]} />
      <Tooltip />
      <Area type="monotone" dataKey={type} stroke="#0066ff" fill="#3c50fe8a" />
      <Legend />
    </AreaChart>
  );
};

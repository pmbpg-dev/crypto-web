import { useEffect, useState } from "react";
import { getCoinList } from "../../services/cryptoApi";
import { MutatingDots } from "react-loader-spinner";
import TabeleCoin from "../modules/Tabelecoin";
import styles from "./HomePage.module.css";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";
import Chart from "../modules/Chart";

function HomePage() {
  // ===================states======================
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);

  //==============get coins list from api==================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getCoinList(page, currency);
        setCoins(data);
      } catch (err) {
        setCoins([]);
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page, currency]);
  //=================jsx==========================
  return (
    <div className={styles.container}>
      <Search setCurrency={setCurrency} currency={currency} />
      {isLoading ? (
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#2e78f9"
          secondaryColor="#2e78f9"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{ marginTop: "150px" }}
          wrapperClass=""
        />
      ) : coins.length === 0 ? (
        <p>Error To Get Data</p>
      ) : (
        <TabeleCoin coins={coins} currency={currency} setChart={setChart} />
      )}
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Chart setChart={setChart} chart={chart} />}
    </div>
  );
}

export default HomePage;

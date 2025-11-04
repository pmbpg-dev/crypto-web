import { useEffect, useState } from "react";
import { getCoinList } from "../../services/cryptoApi";
import { PuffLoader } from "react-spinners";
import TabeleCoin from "../modules/Tabelecoin";
import styles from "./HomePage.module.css";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");

  //==============get coins list from api==================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getCoinList(page, currency);
        setCoins(data);
      } catch (err) {
        console.log(coins);
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
        <PuffLoader color="#2e78f9" size={100} speedMultiplier={2} />
      ) : coins.length === 0 ? (
        <p>Error To Get Data</p>
      ) : (
        <TabeleCoin coins={coins} currency={currency} />
      )}
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}

export default HomePage;

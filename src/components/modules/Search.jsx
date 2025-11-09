import { useEffect, useState } from "react";
import { searchCoin } from "../../services/cryptoApi";
import { MagnifyingGlass } from "react-loader-spinner";
import styles from "./Search.module.css";

function Search({ setCurrency, currency }) {
  // ==================states==================
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // ==================get search data===============
  useEffect(() => {
    const controller = new AbortController();
    setCoins([]);
    if (!text) {
      setIsLoading(false);
      return;
    }
    const getCoins = async () => {
      try {
        const data = await searchCoin(text, { signal: controller.signal });
        if (data.coins) {
          setCoins(data.coins);
          setIsLoading(false);
        } else {
          alert("error");
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    setIsLoading(true);
    getCoins();

    return () => controller.abort();
  }, [text]);

  // ====================jsx===================
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value={"usd"}>USD</option>
        <option value={"eur"}>EUR</option>
        <option value={"jpy"}>JPY</option>
      </select>
      {(coins.length || isLoading) && (
        <div className={styles.list}>
          {isLoading && (
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="magnifying-glass-loading"
              wrapperStyle={{}}
              wrapperClass="magnifying-glass-wrapper"
              glassColor="#c0efff"
              color="#2e78f9"
            />
          )}
          <ul>
            {coins.map((coin) => (
              <li key={coin.id}>
                <img src={coin.thumb} />
                <p>{coin.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;

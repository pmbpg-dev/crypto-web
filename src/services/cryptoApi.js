const BASE_URL = "https://api.coingecko.com/api/v3";
const OPTIONS = {
  method: "GET",
  headers: { "x-cg-demo-api-key": "CG-44F5Ne5ANTcZS8LUvPcvs7j2" },
  body: undefined,
};

const getCoinList = async (page, currency) => {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=${currency}&category=layer-1&price_change_percentage=1h&per_page=20&page=${page}&locale=en`,
      OPTIONS
    );
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error(data.error || "Invalid response");
    return data;
  } catch (err) {
    console.log(err.message);
    return [];
  }
};

export { getCoinList };

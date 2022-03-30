function getRandomAPIKey() {
  const keys = [
    process.env.REACT_APP_AV_API_KEY_ONE,
    process.env.REACT_APP_AV_API_KEY_TWO,
    process.env.REACT_APP_AV_API_KEY_THREE,
    process.env.REACT_APP_AV_API_KEY_FOUR,
    process.env.REACT_APP_AV_API_KEY_FIVE,
  ];

  return (
    keys[Math.floor(Math.random() * keys.length)] ||
    process.env.REACT_APP_AV_API_KEY_ONE
  );
}

const CONSTANTS = Object.freeze({
  API_ENDPOINT: "",
  GLOBAL_QUOTE(symbol) {
    return `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${getRandomAPIKey()}`;
  },
  SYMBOL_SEARCH(symbol) {
    return `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${getRandomAPIKey()}`;
  },
  CRYPTO_CURRENCY_DAILY(symbol, market) {
    return `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=${market}&apikey=${getRandomAPIKey()}`;
  },
  LOCAL_BACKEND_URL: `http://localhost:5000/api`,
  COUNTRY_CODE_URL: "https://openexchangerates.org/api/currencies.json",
  PRODUCTION_URL: "https://stockverse-back-end.herokuapp.com/api/",
});

export default CONSTANTS;

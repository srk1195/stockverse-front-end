import CONSTANTS from './constants';

const validateInstrumentSymbol = async (symbol) => {
  try {
    // handle USA
    let redefinedSymbol = symbol;
    const country = symbol.split('.')[1];
    if (country === 'USA') redefinedSymbol = symbol.replace('.USA', '');
    console.log('Firing for the symbol: ', redefinedSymbol);

    const url = CONSTANTS.SYMBOL_SEARCH(redefinedSymbol);
    // const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=SAIC&apikey=demo`;

    const response = await fetch(url);
    const data = await response.json();

    const matchedItem = await data['bestMatches'].find(
      (stock) =>
        stock['1. symbol'] === redefinedSymbol &&
        stock['9. matchScore'].startsWith('1')
    );

    if (matchedItem) {
      matchedItem.instrumentRegion = matchedItem['4. region'];
      matchedItem.currency = matchedItem['8. currency'];
      return { status: true, matchedItem };
    } else {
      throw new Error('No Match Found');
    }
  } catch (e) {
    return { status: false, message: e.message };
  }
};

const validateInstrumentCrypto = async (symbol) => {
  try {
    console.log('Firing the Crypto API');
    const [cryptoCoin, country] = symbol.split('.');

    console.log('Firing for the symbol: ', cryptoCoin, country);
    const url = CONSTANTS.CRYPTO_CURRENCY_DAILY(cryptoCoin, country);
    console.log(url);

    const response = await fetch(url);
    const data = await response.json();
    const matchedItem = await data['Meta Data'];

    if (matchedItem) {
      matchedItem.instrumentRegion = matchedItem['5. Market Name'];
      matchedItem.currency = matchedItem['4. Market Code'];
      return { status: true, matchedItem };
    } else {
      throw new Error('No Match Found for the given crypto');
    }
  } catch (e) {
    return { status: false, message: e.message };
  }
};

const addPortfolioRecord = async (portfolioData, userId) => {
  try {
    const url = `${CONSTANTS.LOCAL_BACKEND_URL}/portfolio/add/${userId}`;

    const newPortfolioData = { ...portfolioData };

    console.log('Firing the addPortfolioRecord');
    delete newPortfolioData.error;
    delete newPortfolioData.remarks;
    console.log(newPortfolioData);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPortfolioData),
    });

    const data = await response.json();
    return { status: true, data };
  } catch (e) {
    console.log(e);
    return { status: false, message: e.message };
  }
};

const getPortfolioData = async (userId) => {
  try {
    const url = `${CONSTANTS.LOCAL_BACKEND_URL}/portfolios/${userId}`;

    const response = await fetch(url);
    const data = await response.json();
    return { status: true, data };
  } catch (e) {
    console.log(e);
    return { status: false, message: e.message };
  }
};

export {
  validateInstrumentSymbol,
  validateInstrumentCrypto,
  addPortfolioRecord,
  getPortfolioData,
};

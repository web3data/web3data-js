const {is, get, throwIf, onFulfilled, onError} = require('./utils')
const {
  MARKET_ENDPOINT: ENDPOINT,
  ERROR_MESSAGE_MARKET_NO_PAIR: NO_MARKET_PAIR
} = require('./constants')

class Market {
  constructor(web3data) {
    this.web3data = web3data
  }

  async getEtherPrice() {
    const response = await get(this.web3data, {
      endpoint: ENDPOINT + '/prices/eth/latest'
    })
    throwIf(
      !response || response.status !== 200 || !response.payload,
      'Failed to retrieve Ether price.'
    )
    return response.payload
  }

  // TODO: Needs tests
  // Returns supported details for each of our market endpoint data features
  // TODO: finish
  getRankings(filterOptions) {
    return get(this.web3data, {
      endpoint: ENDPOINT,
      subendpoint: 'rankings',
      filterOptions
    }).then(onFulfilled, onError)
  }

  // TODO: Needs tests
  // Returns supported details for each of our market endpoint data features
  // TODO: finish
  // getFeatures(filterOptions) {
  //   // throwIf(is.notHash(id), NO_MARKET_PAIR)
  //   return get(this.web3data, {
  //     endpoint: ENDPOINT,
  //     subendpoint: 'functions',
  //     filterOptions
  //   }).then(onFulfilled, onError)
  // }

  // TODO: Needs tests
  // Returns supported details for each of our market endpoint data features
  getOhlcv(pair, filterOptions = {}) {
    throwIf(is.undefined(pair), NO_MARKET_PAIR)
    const subendpoint =
      filterOptions.startDate || filterOptions.endDate ? 'historical' : 'latest'
    return get(this.web3data, {
      pathParam: pair,
      endpoint: `${ENDPOINT}/ohlcv`,
      subendpoint,
      filterOptions
    }).then(onFulfilled, onError)
  }

  // TODO: Needs tests
  // Returns supported details for each of our market endpoint data features
  getOrders(pair, filterOptions) {
    throwIf(is.undefined(pair), NO_MARKET_PAIR)
    return get(this.web3data, {
      pathParam: pair,
      endpoint: `${ENDPOINT}/orders`,
      filterOptions
    }).then(onFulfilled, onError)
  }

  // TODO: Needs tests
  // Returns supported details for each of our market endpoint data features
  getBbos(pair, filterOptions) {
    throwIf(is.undefined(pair), NO_MARKET_PAIR)
    return get(this.web3data, {
      pathParam: pair,
      endpoint: `${ENDPOINT}/orders`,
      subendpoint: 'bbo',
      filterOptions
    }).then(onFulfilled, onError)
  }

  // TODO: Needs tests
  // Returns supported details for each of our market endpoint data features
  getPrices(base, filterOptions) {
    throwIf(is.undefined(base), NO_MARKET_PAIR)
    const subendpoint =
      filterOptions.startDate || filterOptions.endDate ? 'historical' : 'latest'
    return get(this.web3data, {
      pathParam: base,
      endpoint: `${ENDPOINT}/prices`,
      subendpoint,
      filterOptions
    }).then(onFulfilled, onError)
  }

  // TODO: Needs tests
  // Returns supported details for each of our market endpoint data features
  getTokenPrices(hash, filterOptions) {
    throwIf(is.notHash(hash), NO_MARKET_PAIR)
    const subendpoint =
      filterOptions.startDate || filterOptions.endDate ? 'historical' : 'latest'
    return get(this.web3data, {
      hash,
      endpoint: `${ENDPOINT}/tokens/prices`,
      subendpoint,
      filterOptions
    }).then(onFulfilled, onError)
  }

  // TODO: Needs tests
  // Returns supported details for each of our market endpoint data features
  getVwap(base, filterOptions) {
    throwIf(is.undefined(base), NO_MARKET_PAIR)
    return get(this.web3data, {
      pathParam: base,
      endpoint: `${ENDPOINT}/prices`,
      subendpoint: 'wap/latest',
      filterOptions
    }).then(onFulfilled, onError)
  }

  // TODO: Needs tests
  // Returns supported details for each of our market endpoint data features
  getTickers(pair, filterOptions) {
    throwIf(is.undefined(pair), NO_MARKET_PAIR)
    const subendpoint =
      filterOptions.startDate || filterOptions.endDate ? 'historical' : 'latest'
    return get(this.web3data, {
      pathParam: pair,
      endpoint: `${ENDPOINT}/tickers`,
      subendpoint,
      filterOptions
    }).then(onFulfilled, onError)
  }

  // TODO: Needs tests
  // Returns supported details for each of our market endpoint data features
  getTrades(pair, filterOptions) {
    throwIf(is.undefined(pair), NO_MARKET_PAIR)
    return get(this.web3data, {
      pathParam: pair,
      endpoint: `${ENDPOINT}/trades`,
      subendpoint: 'historical',
      filterOptions
    }).then(onFulfilled, onError)
  }

  // TODO: Needs tests
  // Retrieves information about supported exchange-pairs (indexed by exchange)
  getExchanges(filterOptions) {
    return get(this.web3data, {
      endpoint: `${ENDPOINT}/exchanges`,
      filterOptions
    }).then(onFulfilled, onError)
  }

  // TODO: Needs tests
  // Retrieves information about supported exchange-pairs (indexed by pair)
  getPairs(filterOptions) {
    return get(this.web3data, {
      endpoint: `${ENDPOINT}/pairs`,
      filterOptions
    }).then(onFulfilled, onError)
  }
}

module.exports = Market

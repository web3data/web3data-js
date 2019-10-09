const {is, get, throwIf, onFulfilled, onError} = require('./utils')
const {
  MARKET_FEATURES: FEATURES,
  MARKET_ENDPOINT: ENDPOINT,
  ERROR_MESSAGE_MARKET_NO_PAIR: NO_MARKET_PAIR,
  ERROR_MESSAGE_MARKET_NO_FEATURE: NO_FEATURE
} = require('./constants')

class Market {
  constructor(web3data) {
    this.web3data = web3data
  }

  /**
   * Gets the current price of ether in USD.
   * @return {Promise<String>} Returns the price of ether price in USD.
   * @public
   * @example
   * const etherPrice = web3data.market.getEtherPrice()
   */
  async getEtherPrice() {
    return await get(this.web3data, {
      endpoint: ENDPOINT + '/prices/eth/latest'
    }).then( response => response.payload['eth_usd'].price , onError)
  }

  /**
   * Retrieves the top ranked assets by a specific metric.
   * @param filterOptions See [docs](https://docs.amberdata.io/reference#market-rankings) for complete list of filters.
   * @return {Promise<Object>} The market rankings data and total number of records
   * @public
   * @example
   * const etherPrice = web3data.market.getRankings({
   *   type: "erc721",
   *   sortType: "uniqueAddresses"
   * })
   */
  getRankings(filterOptions) {
    return get(this.web3data, {
      endpoint: ENDPOINT,
      subendpoint: 'rankings',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   *
   * @param {(string|array)}features - The features for which to get supported details. Features: `pairs`, `exchanges`, `ohlcv`, `prices`, `tickers`.
   * @param {Object} [filterOptions] - The filter options
   * @param {string} [filterOptions.exchange] filter by exchange
   * @param {string} [filterOptions.pair filter] by specific pairs
   * @return {Promise<Object>}
   * @example
   */
  getFeatures(features = FEATURES, filterOptions = {}) {
    // Force feature to be array but allows non-array input
    features = Array.isArray(features) ? features : [features]

    // Iterate through each feature and if all is valid return array of promises
    features = features.map(feature => {
      // Check each feature that it is valid
      throwIf(
        is.undefined(feature) || FEATURES.indexOf(feature) < 0,
        NO_FEATURE
      )

      // Append necessary url paths
      switch (feature) {
        case 'prices':
          feature += '/pairs'
          break
        case 'ohlcv':
        case 'tickers':
          feature += '/information'
          break
        default:
      }

      // Return a promise that retrieves the data from the server
      return (
        get(this.web3data, {
          endpoint: ENDPOINT,
          subendpoint: feature,
          filterOptions
        })
          .then(onFulfilled, onError)
          // Return an object with 'feature' as the key and response the value
          // .split('/')[0] removes the extra endpoint added above in switch
          .then(response => ({[feature.split('/')[0]]: response}))
      )
    })

    // Returns array of promises that once resolved are merged into a single object
    return Promise.all([...features]).then(data =>
      data.reduce((accumObj, curObj) => ({...accumObj, ...curObj}))
    )
  }

  /**
   * Retrieves the latest open-high-low-close for the specified pair.
   * @param {string} pair -
   * @param {object} filterOptions -
   * @return {Promise<object>}
   */
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
}

module.exports = Market

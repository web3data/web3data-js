const {is, get, throwIf, onFulfilled, onError} = require('./utils')
const {
  MARKET_FEATURES: FEATURES,
  MARKET_ENDPOINT: ENDPOINT,
  ERROR_MESSAGE_MARKET_NO_PAIR: NO_MARKET_PAIR,
  ERROR_MESSAGE_MARKET_NO_FEATURE: NO_FEATURE
} = require('./constants')

/**
 * Contains methods pertaining to the `/market` endpoint of Amberdata's API.
 */
class Market {

  /**
   * Creates an instance of the Market class.
   * @param {Web3Data} web3data - The web3data instance
   */
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
   * @param filterOptions - See [docs](https://docs.amberdata.io/reference#market-rankings) for complete list of filters.
   * @return {Promise<Object>} The market rankings data and total number of records.
   * @public
   * @example
   * const rankings = web3data.market.getRankings({
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
   * Retrieves the list of supported details by feature.
   * @param {(string|array)} features - The features for which to get supported details. Features: `pairs`, `exchanges`, `ohlcv`, `prices`, `tickers`.
   * @param {Object} [filterOptions] - The filter options
   * @param {string} [filterOptions.exchange] - filter by exchange
   * @param {string} [filterOptions.pair filter] by specific pairs
   * @return {Promise<Object>} The list of supported details by feature
   * @example
   * // Single feature, filter by exchange
   * await web3data.market.getFeatures('pairs', {exchange: 'gdax'})
   *
   * // Multiple features, filter by pair
   * await web3data.market.getFeatures(['exchanges', 'tickers'], {pair: 'btc_usd'})
   *
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
   * @param {string} pair - The market pair for which to retrieve open-high-low-close.
   * @param {object} [filterOptions] - See [docs](https://docs.amberdata.io/reference#get-historical-ohlc) for complete list of filters.
   * @return {Promise<object>} The ohlcv data.
   * @public
   * @example
   * const latestOhlcv = await web3data.market.getOhlcv('eth_btc', {exchange: 'bitfinex'})
   * const histOhlcv = await web3data.market.getOhlcv('btc_usd', {startDate: Date.now() - 604800000})
   */
  getOhlcv(pair, filterOptions = {}) {
    throwIf(is.undefined(pair), NO_MARKET_PAIR)
    const subendpoint =
      filterOptions.startDate || filterOptions.endDate ? 'historical' : 'latest'
    console.log(filterOptions)
    return get(this.web3data, {
      pathParam: pair,
      endpoint: `${ENDPOINT}/ohlcv`,
      subendpoint,
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the order book data for the specified pair.
   * @param {string} pair - The market pair for which to retrieve order book data.
   * @param {object} [filterOptions] - See [docs](https://docs.amberdata.io/reference#get-market-orders) for complete list of filters.
   * @return {Promise<object>}
   * @public
   * @example
   * const orders = await web3data.market.getOrders('eth_usd', ['bitfinex', 'bitstamp'], {timeFormat: 'iso'})
   */
  getOrders(pair, filterOptions = {}) {
    throwIf(is.undefined(pair), NO_MARKET_PAIR)
    return get(this.web3data, {
      pathParam: pair,
      endpoint: `${ENDPOINT}/orders`,
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the latest best bid and offer information for the specified pair and exchange (if specified).
   * @param {string} pair - The market pair for which to retrieve the latest best bid and offer data.
   * @param {Object} [filterOptions] - The filter options
   * @param {(string|array)} [filterOptions.exchange] - Only return data for the given exchanges (comma separated)
   * @param {(string|array)} [filterOptions.pair] - Only return data for the given pairs (comma separated)
   * @return {Promise<object>}
   * @public
   * @example
   */
  getBbos(pair, filterOptions = {}) {
    throwIf(is.undefined(pair), NO_MARKET_PAIR)
    return get(this.web3data, {
      pathParam: pair,
      endpoint: `${ENDPOINT}/orders`,
      subendpoint: 'bbo',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   *
   * @param {string} base -
   * @param {object} [filterOptions] -
   * @return {Promise<object>}
   */
  getPrices(base, filterOptions = {}) {
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
  getTokenPrices(hash, filterOptions = {}) {
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

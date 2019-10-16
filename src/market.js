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
   *
   * @param web3data - The web3data instance.
   * @example
   */
  constructor(web3data) {
    this.web3data = web3data
  }

  /**
   * Gets the current price of ether in USD.
   *
   * @returns Returns the price of ether price in USD.
   * @public
   * @example const etherPrice = web3data.market.getEtherPrice()
   */
  async getEtherPrice() {
    return get(this.web3data, {
      endpoint: ENDPOINT + '/prices/eth/latest'
    }).then(response => response.payload.eth_usd.price, onError)
  }

  /**
   * Retrieves the top ranked assets by a specific metric.
   *
   * @param filterOptions - See [docs](https://docs.amberdata.io/reference#market-rankings) for complete list of filters.
   * @returns The market rankings data and total number of records.
   * @public
   * @example const rankings = web3data.market.getRankings({
   * type: "erc721",
   * sortType: "uniqueAddresses"
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
   *
   * @param features - The features for which to get supported details. Features: `pairs`, `exchanges`, `ohlcv`, `prices`, `tickers`.
   * @param [filterOptions] - The filter options.
   * @param [filterOptions.exchange] - Filter by exchange.
   * @param [filterOptions.pair filter] - By specific pairs.
   * @returns The list of supported details by feature.
   * @example // Single feature, filter by exchange
   * await web3data.market.getFeatures('pairs', {exchange: 'gdax'})
   *
   * // Multiple features, filter by pair
   * await web3data.market.getFeatures(['exchanges', 'tickers'], {pair: 'btc_usd'})
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
   *
   * @param pair - The market pair for which to retrieve open-high-low-close.
   * @param [filterOptions] - See [docs](https://docs.amberdata.io/reference#get-historical-ohlc) for complete list of filters.
   * @returns The ohlcv data.
   * @public
   * @example // Latest
   * const latestOhlcv = await web3data.market.getOhlcv('eth_btc', {exchange: 'bitfinex'})
   *
   * // Historical (1 day ago)
   * const histOhlcv = await web3data.market.getOhlcv('btc_usd', {startDate: Math.round((Date.now() - 86400000) /1000)})
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

  /**
   * Retrieves the order book data for the specified pair.
   *
   * @param pair - The market pair for which to retrieve order book data.
   * @param [filterOptions] - See [docs](https://docs.amberdata.io/reference#get-market-orders) for complete list of filters.
   * @returns
   * @public
   * @example const orders = await web3data.market.getOrders('eth_usd', ['bitfinex', 'bitstamp'], {timeFormat: 'iso'})
   * TODO: Add required param exchange
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
   * Retrieves order book update events.
   *
   * @param pair - The market pair for which to retrieve the historical best bid and offer data.
   * @param [filterOptions] - See [docs](https://docs.amberdata.io/reference#order-book-updates) for complete list of filters.
   * @returns The order book update data.
   * @example const orderBooks = await web3data.market.getOrderBooks('btc_usd')
   */
  getOrderBooks(pair, filterOptions = {}) {
    throwIf(is.undefined(pair), NO_MARKET_PAIR)
    return get(this.web3data, {
      pathParam: pair,
      endpoint: `${ENDPOINT}/orders`,
      subendpoint: 'update',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the latest or historical best bid and offer data for the specified pair and exchange (if specified).
   *
   * @param pair - The market pair for which to retrieve the latest best bid and offer data.
   * @param [filterOptions] - The filter options See [docs](https://docs.amberdata.io/reference#get-market-orders-best-bid-offer) for more details.
   * @param [filterOptions.exchange] - Only return data for the given exchanges (comma separated).
   * @param [filterOptions.pair] - Only return data for the given pairs (comma separated).
   * @param [filterOptions.startDate] - Filter by pairs after this date.
   * @param [filterOptions.endDate] - Filter by pairs before this date.
   * @returns The latest or historical best bid and offer data indexed by exchange.
   * @public
   * @example // Latest
   * const latestBbos = await web3data.market.getBbos('eth_btc')
   *
   * // Historical (1 day ago)
   * const histBbos = await web3data.market.getBbos('eth_btc', {startDate: Math.round((Date.now() - 86400000) /1000)})
   */
  getBbos(pair, filterOptions = {}) {
    throwIf(is.undefined(pair), NO_MARKET_PAIR)
    const subendpoint =
      filterOptions.startDate || filterOptions.endDate
        ? 'bbo/historical'
        : 'bbo'
    return get(this.web3data, {
      pathParam: pair,
      endpoint: `${ENDPOINT}/orders`,
      subendpoint,
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the historical prices for the specified asset.
   *
   * @param base - The base of a pair to retrieve the price. Example: If pair is "eth_usd", then base is "eth".
   * @param [filterOptions] - The filter options. See [docs](https://docs.amberdata.io/reference#market-prices-latest) for more details.
   * @returns The latest or historical market prices indexed by pair.
   * @example // Latest
   * const latestPrices = await web3data.market.getPrices('eth')
   *
   * // Historical (1 day ago)
   * const histPrices = await web3data.market.getPrices('eth', {startDate:  Math.round((Date.now() - 86400000) /1000)})
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

  /**
   * Retrieves the latest VWAP & TWAP price for the specified base.
   *
   * @param base - The base of a pair to retrieve the price. Example: If pair is "eth_usd", then base is "eth".
   * @param [filterOptions] - The filter options. See [docs](https://docs.amberdata.io/reference#get-current-vwaptwap-price) for more details.
   * @returns The latest VWAP & TWAP pricing data.
   * @example const wapData = await web3data.market.getVwap('eth', {quote: 'usd'})
   */
  getVwap(base, filterOptions = {}) {
    throwIf(is.undefined(base), NO_MARKET_PAIR)
    return get(this.web3data, {
      pathParam: base,
      endpoint: `${ENDPOINT}/prices`,
      subendpoint: 'wap/latest',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the latest or historical market tickers.
   *
   * @param pair - The market pair for which to retrieve market tickers.
   * @param [filterOptions] - The filter options. See [docs](https://docs.amberdata.io/reference#get-current-vwaptwap-price) for more details.
   * @param [filterOptions.exchange] - Only return data for the given exchanges (comma separated).
   * @param [filterOptions.startDate] - Filter by ticker pairs after this date.
   * @param [filterOptions.endDate] - Filter by ticker pairs before this date.
   * @returns The latest or historical market ticker data.
   * @example //Latest
   * const latestTickers = await web3data.market.getTickers('eth_btc')
   *
   * //Historical
   * const histTickers = await web3data.market.getTickers('eth_btc', {startDate:  Date.now() - 86400000})
   */
  getTickers(pair, filterOptions = {}) {
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

  /**
   * Retrieves the historical (time series) trade data for the specified pair.
   *
   * @param pair - The market pair for which to retrieve market trades.
   * @param [filterOptions] - The filter options. See [docs](https://docs.amberdata.io/reference#market-trades) for more details.
   * @returns The historical (time series) trade data.
   * @example const trades = web3data.market.getTrades('eth_usd', {exchange: 'bitstamp'})
   */
  getTrades(pair, filterOptions = {}) {
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

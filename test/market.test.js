import test from 'ava'

import {
  ADDRESS,
  getNewWeb3DataInstance, TOKEN_ADDRESS
} from "./constants";

import { setUpPolly, isISOFormat } from "./utils";
import { ERROR_MESSAGE_MARKET_NO_PAIR as NO_PAIR,  MARKET_FEATURES} from "../src/constants";

/***********************************
 * -------- Tests Setup ---------- *
 **********************************/
test.before(t => {
  t.context.polly = setUpPolly('market')
})

test.after(async t => {
  await t.context.polly.stop()
})

test.beforeEach(t => {
  t.context.web3data = getNewWeb3DataInstance()
});
const PAIR = 'eth_btc'
/*********************************
 * ----------- Tests ----------- *
 *********************************/

/*********** Test getEtherPrice() ***********/
test('Successfully gets ether price', async t => {
  const etherPrice = await t.context.web3data.market.getEtherPrice()
  t.regex(etherPrice, /\d+\.?\d*/)
})

/*********** Test getRankings() ***********/
test('Successfully gets market rankings', async t => {
  const rankings = await t.context.web3data.market.getRankings()
  t.true(rankings.hasProp('data'))
  t.true(Array.isArray(rankings.data))
  t.true(rankings.data[0].hasProp('changeInPriceDaily'))
  t.regex(rankings.data[0].changeInPriceDaily, /\d+\.?\d*/)
})

test('Successfully gets market rankings - with filters', async t => {
  const rankings = await t.context.web3data.market.getRankings({sortType: 'uniqueAddresses'})
  t.true(rankings.hasProp('data'))
  t.true(Array.isArray(rankings.data))
  t.regex(rankings.data[0].changeInPriceDaily, /\d+\.?\d*/)
})

/*********** Test getFeatures() ***********/
test('Successfully gets market features - all', async t => {
  const features = await t.context.web3data.market.getFeatures()
  // Check each features name spacing
  MARKET_FEATURES.forEach( feature => t.true(features.hasProp(feature)))
})

test('Successfully gets market features - single string param', async t => {
  const features = await t.context.web3data.market.getFeatures('pairs')

  // Test namespace
  t.true(features.hasProp('pairs'))

  // Test that it's correct data
  t.true(features.pairs.hasProp('btc_eur'))
})

test('Successfully gets market features - array param', async t => {
  const features = await t.context.web3data.market.getFeatures(['pairs', 'tickers'])

  // Check that it only returned 2 features
  t.is(Object.values(features).length, 2)

  // Check namespace exist
  t.true(features.hasProp('pairs'))
  t.true(features.hasProp('tickers'))

  // Test that it's correct data
  t.true(features.pairs.hasProp('btc_eur'))
  t.true(features.tickers.hasProp('gdax'))
  t.true(features.tickers.gdax.hasProp('btc_usd'))
})

test('Successfully gets market features - with filters', async t => {
  const features = await t.context.web3data.market.getFeatures('ohlcv', {exchange: 'gdax'})
  t.true(features.hasProp('ohlcv'))

  // Check that filtered exchange exists
  t.true(features.ohlcv.hasProp('gdax'))

  // Check that it only returned a singe exchange
  t.is(features.ohlcv.values().length, 1)
})

/*********** Test getOhlcv() ***********/
test('Successfully gets latest ohlcv', async t => {
  const ohlcv = await t.context.web3data.market.getOhlcv(PAIR)
  t.true(ohlcv.values()[0].hasProp('open'))
  t.regex(ohlcv.values()[0].open.toString(), /\d+\.?\d*/)
})

test('Successfully gets latest ohlcv - with filters', async t => {
  const ohlcv = await t.context.web3data.market.getOhlcv(PAIR, {exchange: 'bitfinex'})
  t.is(ohlcv.values().length, 1)
  t.true(ohlcv.hasProp('bitfinex'))
  t.true(ohlcv.bitfinex.hasProp('open'))
  t.regex(ohlcv.bitfinex.open.toString(), /\d+\.?\d*/)
})

test('Successfully gets historical ohlcv', async t => {
  const ohlcv = await t.context.web3data.market.getOhlcv(PAIR, {startDate: Date.now() - 604800000})
  t.true(ohlcv.hasProp('metadata'))
  t.regex(Object.values(ohlcv.data)[0].toString(), /\d+\.?\d*/)
})

test('throws exception when calling getOhlcv without pair param', async t => {
  await t.throwsAsync(async () => {
    await t.context.web3data.market.getOrders()
  }, { instanceOf: Error, message: NO_PAIR})
})

/*********** Test getOrders() ***********/
test.skip('Successfully gets orders', async t => {
  const orders = await t.context.web3data.market.getOrders(PAIR) // {startDate: Date.now() - 604800000}
  t.true(orders.hasProp('metadata'))
  t.regex(Object.values(orders.data)[0].toString(), /\d+\.?\d*/)
})

test.skip('Successfully gets orders - with filters', async t => {
  const orders = await t.context.web3data.market.getOrders(PAIR) // {startDate: Date.now() - 604800000}
  t.true(orders.hasProp('metadata'))
  t.regex(orders.data.values()[0].toString(), /\d+\.?\d*/)
})

test.skip('throws exception when calling getOrders without pair param', async t => {
  await t.throwsAsync(async () => {
    await t.context.web3data.market.getOrders()
  }, { instanceOf: Error, message: NO_PAIR})
})

/*********** Test getBbos() ***********/
// TODO: Pending API bug fix
test.skip('Pending API bug fix ---- Successfully gets latest bos', async t => {
  const bbos = await t.context.web3data.market.getBbos(PAIR)
  const exchangePairBbo = Object.values(Object.values(bbos))[0]

  t.true(exchangePairBbo.hasProp('price'))
})
test.skip('Pending API bug fix ---- Successfully gets historical bbos', async t => {
  const bbos = await t.context.web3data.market.getBbos(PAIR, {startDate: Date.now() - 604800000})

  // Check existence of historical data properties
  t.true(bbos.hasProp('metadata'))
  t.true(bbos.hasProp('data'))
  t.true(Array.isArray(bbos.data))
})

test('throws exception when calling getBbos without pair param', async t => {
  await t.throwsAsync(async () => {
    await t.context.web3data.market.getBbos()
  }, { instanceOf: Error, message: NO_PAIR})
})

/*********** Test getPrices() ***********/
const BASE = 'eth'
test('Successfully gets latest market prices', async t => {
  const prices = await t.context.web3data.market.getPrices(BASE)

  // Test the there is a price property that has a float value
  t.true(Array.isArray(prices.values()))
  t.true(prices.values()[0].hasProp('price'))
  t.regex(prices.values()[0].price.toString(), /\d+\.?\d*/)
})

test('Successfully gets latest market prices - with filters', async t => {
  const prices = await t.context.web3data.market.getPrices(BASE, {quote: 'eur'})
  t.true(prices.hasProp('eth_eur'))
  t.true(Array.isArray(Object.values(prices)))
  t.true(Object.values(prices)[0].hasProp('price'))

  // Test the there is a price property that has a float value
  t.regex(Object.values(prices)[0].price.toString(), /\d+\.?\d*/)
})

test.skip('Successfully gets historical market prices', async t => {
  const prices = await t.context.web3data.market.getPrices(BASE, {})

  t.true(prices.hasProp('eth_eur'))
  t.true(prices.values()[0].hasProp('price'))

  // Test the there is a price property that has a float value
  t.regex(prices.values()[0].price.toString(), /\d+\.?\d*/)
})

test('throws exception when calling getPrices without base param', async t => {
  await t.throwsAsync(async () => {
    await t.context.web3data.market.getPrices()
  }, { instanceOf: Error, message: NO_PAIR})
})

/*********** Test getTokenPrices() ***********/
test('Successfully gets current token price', async t => {
  const tokenPrices = (await t.context.web3data.market.getTokenPrices(TOKEN_ADDRESS))[0]
  t.true(tokenPrices.hasProp('address'))
  t.is(tokenPrices.address, TOKEN_ADDRESS)
})

test('throws exception when calling getTokenPrices without pair param', async t => {
  await t.throwsAsync(async () => {
    await t.context.web3data.market.getTokenPrices()
  }, { instanceOf: Error, message: NO_PAIR})
})

/*********** Test getVwap() ***********/
test.skip('Successfully gets current vwap prices', async t => {
  const vwap = await t.context.web3data.market.getVwap()
})

test('throws exception when calling getVwap without pair param', async t => {
  await t.throwsAsync(async () => {
    await t.context.web3data.market.getVwap()
  }, { instanceOf: Error, message: NO_PAIR})
})

/*********** Test getTickers() ***********/
test.skip('Successfully gets latest market tickers', async t => {
  const tickers = await t.context.web3data.market.getTickers()
})
test('throws exception when calling getTickers without pair param', async t => {
  await t.throwsAsync(async () => {
    await t.context.web3data.market.getTickers()
  }, { instanceOf: Error, message: NO_PAIR})
})

/*********** Test getTrades() ***********/
test.skip('Successfully gets market trades', async t => {
  const tickers = await t.context.web3data.market.getTrades()
})

test('throws exception when calling getTrades without pair param', async t => {
  await t.throwsAsync(async () => {
    await t.context.web3data.market.getTrades()
  }, { instanceOf: Error, message: NO_PAIR})
})

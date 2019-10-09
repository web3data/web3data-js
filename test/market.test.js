import test from 'ava'

import {
  getNewWeb3DataInstance
} from './constants'

import {setUpPolly} from "./utils";
import { ERROR_MESSAGE_MARKET_NO_PAIR as NO_PAIR } from "../src/constants";

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

/*********************************
 * ----------- Tests ----------- *
 *********************************/

test('Successfully gets ether price', async t => {
  const etherPrice = await t.context.web3data.market.getEtherPrice()
  t.regex(etherPrice, /\d+\.?\d*/)
})

test('Successfully gets market rankings', async t => {
  const rankings = await t.context.web3data.market.getRankings()
  t.truthy(rankings.data)
  t.true(Array.isArray(rankings.data))
  t.regex(rankings.data[0].changeInPriceDaily, /\d+\.?\d*/)
})

test('Successfully gets market rankings - with filters', async t => {
  const rankings = await t.context.web3data.market.getRankings({sortType: 'uniqueAddresses'})
  t.truthy(rankings.data)
  t.true(Array.isArray(rankings.data))
  t.regex(rankings.data[0].changeInPriceDaily, /\d+\.?\d*/)
})

test.skip('Successfully gets market features - all', async t => {
  const rankings = await t.context.web3data.market.getFeatures()
  t.truthy(rankings.data)
  t.true(Array.isArray(rankings.data))
  //t.regex(rankings.data[0].changeInPriceDaily, /\d+\.?\d*/)
})

test('Successfully gets ohlcv (latest)', async t => {
  const PAIR = 'eth_btc'
  const ohlcv = await t.context.web3data.market.getOhlcv(PAIR)
  t.regex(Object.values(ohlcv)[0].open.toString(), /\d+\.?\d*/)
})

test.only('Successfully gets ohlcv (latest) - with filters', async t => {
  const PAIR = 'eth_btc'
  const ohlcv = await t.context.web3data.market.getOhlcv(PAIR, {exchange: 'bitfinex'})
  console.log(ohlcv)
  t.regex(Object.values(ohlcv)[0].open.toString(), /\d+\.?\d*/)
})

test('throws exception when calling getOhlcv without pair param', async t => {
  await t.throwsAsync(async () => {
    await t.context.web3data.market.getOhlcv()
  }, { instanceOf: Error, message: NO_PAIR})
})

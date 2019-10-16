import test from 'ava'

import {
  getNewWeb3DataInstance
} from './constants'

import {setUpPolly} from "./utils";
import { LTC_METHODS as METHODS } from "../src/constants";

/***********************************
 * -------- Tests Setup ---------- *
 **********************************/
test.before(t => {
  t.context.polly = setUpPolly('ltc')
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

test('Check the ltc namespace contains all defined methods', t => {
  for(const namespace of Object.keys(METHODS)) {
    for (const method of METHODS[namespace]) {
      t.truthy(t.context.web3data.ltc[namespace][method])
    }
  }
})

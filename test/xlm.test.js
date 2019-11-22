import test from 'ava'
import {setUpPolly, getNewWeb3DataInstance} from "./utils";
import { XLM_METHODS as METHODS } from "../src/constants";

/***********************************
 * -------- Tests Setup ---------- *
 **********************************/
test.before(t => {
  t.context.polly = setUpPolly('xlm')
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

test('Check the xlm namespace contains all defined methods', t => {
  for(const namespace of Object.keys(METHODS)) {
    for (const method of METHODS[namespace]) {
      t.truthy(t.context.web3data.xlm[namespace][method])
    }
  }
})

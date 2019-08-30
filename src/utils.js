const crypto = require('crypto')
const {ETH_METHODS} = require('./constants')
/**
 * Builds the endpoint url to pass to .rawQuery(). Checks for non empties and appends
 * the appropriate parameter(s) where applicable.
 * @param {object} web3data instance on which to call .rawQuery()
 * @param {string} subendpoint The sub-endpoint
 * @param {string} endpoint The endpoint
 * @param {string} hash The address hash
 * @param {string} pathParam The path parameter
 * @param {object} filterOptions The filters associated with a given endpoint
 * @return returns a Promise of the rawQuery request from web3data
 */
const get = (
  web3data,
  {
    endpoint = '',
    subendpoint = '',
    hash = '',
    pathParam: pathParam = '',
    filterOptions = {}
  }
) => {
  const filters = is.nonEmptyObject(filterOptions)
    ? '?' + buildFilterUrl(filterOptions)
    : ''

  hash = hash ? '/' + hash : ''
  pathParam = pathParam ? '/' + pathParam : ''
  subendpoint = subendpoint ? '/' + subendpoint : ''
  return web3data.rawQuery(
    `${endpoint}${hash || pathParam}${subendpoint}${filters}`
  )
}

const buildFilterUrl = filterOptions => {
  let filterUrl = ''
  for (const filter in filterOptions) {
    if ({}.hasOwnProperty.call(filterOptions, filter)) {
      filterUrl += `${filter}=${filterOptions[filter]}&`
    }
  }

  return filterUrl
}

const throwIf = (bool, message) => {
  if (bool) throw new Error(message)
}

const throwNow = message => throwIf(true, message)

const onFullfilled = response =>
  response.error ? throwIf(true, response.message) : response.payload
const onError = error => throwIf(true, error.response.data.message)

const rejectPromiseIf = (condition, message) => {
  if (condition) return Promise.reject(new Error(message))
}

const is = () => {}

is.string = value => typeof value === 'string'
is.bool = value => typeof value === 'boolean'
is.emptyString = value => is.string(value) && value.length === 0
is.emptyObject = object => Object.keys(object).length === 0
is.inObject = (object, property) =>
  Object.prototype.hasOwnProperty.call(object, property)
is.undefined = value => typeof value === 'undefined'
is.null = value => value === null

is.notHash = hash => is.undefined(hash) || is.emptyString(hash)
is.notUndefined = value => !is.undefined(value)
is.nonEmptyObject = object => !is.emptyObject(object)
is.nonEmptyString = value => !is.emptyString(value)
is.notInObject = (object, property) => !is.inObject(object, property)

const uuid = data =>
  crypto
    .createHash('sha1')
    .update(JSON.stringify(data))
    .digest('base64')

/**
 * Creates an object containing Ethereum based methods.
 * @param web3data { object } the web3data instance
 * @returns methods { object } an object containing Ethereum based methods.
 */
const ethFactory = function(web3data) {
  const methods = {}

  for (const method in ETH_METHODS) {
    /*  Assigns function bound to it's class instance
        Ex: getBlockNumber = web3data.block.getBlockNumber.bind(web3data.block) */
    if ({}.hasOwnProperty.call(ETH_METHODS, method)) {
      methods[method] = web3data[ETH_METHODS[method]][method].bind(
        web3data[ETH_METHODS[method]]
      )
    }
  }

  return methods
}

module.exports = {
  buildFilterUrl,
  is,
  throwIf,
  get,
  rejectPromiseIf,
  uuid,
  ethFactory,
  throwNow,
  onFulfilled: onFullfilled,
  onError
}

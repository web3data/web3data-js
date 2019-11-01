const _uuid = require('uuid/v5')
const {ETH_METHODS} = require('./constants')

/**
 * Builds the endpoint url to pass to .rawQuery(). Checks for non empties and appends
the appropriate parameter(s) where applicable.
 *
 * @param web3data - Instance on which to call .rawQuery().
 * @param subendpoint - The sub-endpoint.
 * @param endpoint - The endpoint.
 * @param hash - The address hash.
 * @param pathParam - The path parameter.
 * @param filterOptions - The filters associated with a given endpoint.
 * @returns Returns a Promise of the rawQuery request from web3data.
 * @example
 * @private
 */
const get = (
  web3data,
  {
    endpoint = '',
    subendpoint = '',
    hash = '',
    pathParam = '',
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

/**
 * Handler for all request responses.
 *
 * @param response - The Axios response object.
 * @returns The data from the response.
 * @private
 * @example
 */
const onFulfilled = function(response) {
  throwIf(response.error, response.message)
  return this && this.formatter
    ? this.formatter(response.payload)
    : response.payload
}

const onError = ({response: {data}}) =>
  throwNow(data.message || data.description)

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

/**
 * Generates a uuid see [this gist]() for more details.
 *
 * @param data
 * @example
 * @private
 */
const uuid = data =>
  _uuid(JSON.stringify(data), 'ccfeca02-f0e9-4433-a740-b830cceb3d2d')

/**
 * Returns an array of methods defined on the object.
 *
 * @param obj - The object from which get methods.
 * @returns An array of method names.
 * @private
 * @example
 */
const getMethods = obj =>
  Object.getOwnPropertyNames(obj).filter(
    item => typeof obj[item] === 'function' && item !== 'constructor'
  )

/**
 * Creates an object containing Ethereum based methods.
 *
 * @param web3data - { object } The web3data instance.
 * @returns methods { object } an object containing Ethereum based methods.
 * @private
 * @example
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

/**
 * Appends blockchain specific methods to an instance of Web3Data under it's
correct namespacing.
 *
 * @param _this - Instance of Web3Data to append methods.
 * @param includeMethods
 * @private
 * @example
 */
const methodFactory = (_this, includeMethods) => {
  Object.keys(includeMethods).forEach(namespace => {
    getMethods(Object.getPrototypeOf(_this.web3data[namespace])).forEach(
      method => {
        if (includeMethods[namespace].includes(method)) {
          _this[namespace] = _this[namespace] ? _this[namespace] : {}
          _this[namespace][method] = _this.web3data[namespace][method].bind(
            _this
          )
        }
      }
    )
  })
  return _this
}

/**
 * Creates a string in json rpc format.
 *
 * @param options - The json rpc options.
 * @returns The json rpc formatted string.
 * @private
 * @example
 *
 */
const formatJsonRpc = options => {
  if (!options) return ''
  if (options.params) {
    options.params = Array.isArray(options.params)
      ? options.params
      : [options.params]
  }

  return JSON.stringify({
    jsonrpc: options.version || '2.0',
    method: options.method || 'subscribe',
    id: options.id || 0,
    params: options.params || []
  })
}

const defaultFormatter = (response, field) => {
  return response[field] ? response[field] : null
}

const recordsFormatter = response => defaultFormatter(response, 'records')

module.exports = {
  buildFilterUrl,
  is,
  throwIf,
  get,
  rejectPromiseIf,
  uuid,
  ethFactory,
  methodFactory,
  throwNow,
  onFulfilled,
  onError,
  formatJsonRpc,
  getMethods,
  recordsFormatter
}

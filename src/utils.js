const crypto = require('crypto')

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
    path_param: pathParam = '',
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

const rejectPromiseIf = (condition, message) => {
  if (condition) return Promise.reject(new Error(message))
}

const is = () => {}

// TODO: Assess lodash && treeshaking
is.string = value => typeof value === 'string'
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

module.exports = {buildFilterUrl, is, throwIf, get, rejectPromiseIf, uuid}

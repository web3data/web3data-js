/**
 * Builds the endpoint url to pass to .rawQuery(). Checks for non empties and appends
 * the appropriate parameter(s) where applicable.
 * @param {object} web3data instance on which to call .rawQuery()
 * @param {string} subendpoint
 * @param {string} endpoint The subendpoint
 * @param {string} hash The address hash
 * @param {object} filterOptions The filters associated with a given endpoint
 */
let get = (web3data, {endpoint = '', subendpoint = '', hash = '', filterOptions = {}}) => {
  const filters = is.nonEmptyObject(filterOptions) ? '?'  + buildFilterUrl(filterOptions) : ''
  hash = hash ? '/' + hash : ''
  subendpoint = subendpoint ? '/' + subendpoint : ''
  return web3data.rawQuery(
      `${endpoint}${hash}${subendpoint}${filters}`
  )
}

let buildFilterUrl = (filterOptions) => {
  let filterUrl = ''
  for (const filter in filterOptions) {
    if ({}.hasOwnProperty.call(filterOptions, filter)) {
      filterUrl += `${filter}=${filterOptions[filter]}&`
    }
  }

  return filterUrl
}

const checkHash = (hash) => {throwIf(is.undefined(hash) || is.emptyString(hash), 'No address hash supplied'); return hash}

const throwIf = (bool, message) => {
  if (bool) throw new Error(message)
}

let is = () => {}
is.string = value => typeof value === 'string'
is.emptyString = value => is.string(value) && value.length === 0
is.nonEmptyString = value => !is.emptyString(value)
is.emptyObject = (object) => {
  for (let key in object) {
    if (object.hasOwnProperty(key))
      return false;
  }
  return true;
}
is.nonEmptyObject = (object) => !is.emptyObject(object)
is.undefined = value => typeof value === 'undefined'
is.notUndefined = value => !is.undefined(value)
is.null = value => value === null

export {buildFilterUrl, is, throwIf, checkHash, get}


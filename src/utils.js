let buildFilterUrl = (filterOptions) => {
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

export {buildFilterUrl, is, throwIf}


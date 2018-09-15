import got from 'got'
async function retrieve() {
  // Remove '?' if there are no params
  if(this.params.length == 1) {
    this.params = ''
  }
  try {
    const response = await got(this.url + this.params, {
      baseUrl: this.baseUrl,
      headers: this.headers,
      json: true,
    })
    return response.body
  } catch (error) {
    console.log('error ' + error)
    return error.response
  }
}
export default retrieve

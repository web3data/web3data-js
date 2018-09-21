import ky from '../../test/kympiled' // Pre-transpiled ky

async function retrieve() {
  try {
    const response = await ky(this.baseUrl + this.url + this.params, {
      headers: this.headers
    }).json()
    return response
  } catch (error) {
    return error
  }
}
export default retrieve

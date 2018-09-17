import ky from '../test/kympiled.js' // Pre-transpiled ky

async function retrieve() {
    let response = await ky(this.baseUrl + this.url + this.params, {
      headers: this.headers
    }).json()
    return response
}
export default retrieve

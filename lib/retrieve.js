import ky from '../test/kympiled' // Pre-transpiled ky

async function retrieve() {
  const response = await ky(this.baseUrl + this.url + this.params, {
    headers: this.headers
  }).json()
  return response
}
export default retrieve

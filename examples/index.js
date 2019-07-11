const Web3Data = require('../src/web3data').default
console.log('Web3Data', Web3Data)

function getAddressInfo() {
  let address = document.getElementById('address-input').value
  let apiKey = document.getElementById("apikey-input").value
  // let web3data = new window.Web3Data({"apiKey":apiKey, "blockchainId": "1c9c969065fcd1cf"})

  // web3data.addresses(address).info().retrieve().then( (info) => {
  //   document.getElementById('output').innerHTML = '<pre id="json">' + JSON.stringify(info.payload[0], undefined, 2) + '</pre>'
  // })

  // websockets!!!!!!
  const w3d = new Web3Data(apiKey)

  w3d.connect(status => {
    console.log('the status -> ', status.type)
  })
  w3d.on({eventName: 'block'}, data => {
    console.log('callback A', data)
  })
}

window.getAddressInfo = getAddressInfo

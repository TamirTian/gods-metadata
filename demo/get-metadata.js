const Metadata = require('../src')
const metadata = new Metadata('<ETH_RPC>')

async function main () {
  const m = await metadata.get('70983020')
  console.log(m)
}

main()

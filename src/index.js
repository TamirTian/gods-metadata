const axios = require('./axios-wrapper');
const ethers = require('ethers');
const config = require('./config');
const abi = ["function getProto(uint _tokenId) public view returns (uint16)"];


class Metadata {
  constructor (eth_rpc) {
    const provider = new ethers.providers.JsonRpcProvider(eth_rpc);
    this.contract = new ethers.Contract(config.contract, abi, provider);
  }

  getProtoId (tokenId) {
    return this.contract.getProto(tokenId)
  }

  async get (tokenId) {
    const protoId = await this.getProtoId(tokenId);
    const { data } = await axios.get(`https://api.godsunchained.com/v0/proto/${protoId}`);
    const attributes = {};

    ['god', 'rarity', 'tribe', 'mana', 'attack', 'health', 'type', 'set']
      .forEach(filed => {
        const value = data[filed];
        const valueType = typeof value;

        if (['string', 'number'].includes(valueType)) {
          attributes[filed] = value;
          return
        }
        if (['object'].includes(valueType) && value.Valid) {
          attributes[filed] = value['Int64'] || value['String'] || undefined
        }

      });
    if (data.god) attributes['god'] = data.god;

    return {
      name: data.name,
      description: data.effect,
      image: `https://images.godsunchained.com/cards/250/${protoId}.png`,
      attributes
    }
  }
}


module.exports = Metadata;

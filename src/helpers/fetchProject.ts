import { utils } from 'ethers'
import { formatUnits } from '@ethersproject/units'
import { fetchIpfs } from 'helpers'
import { getContract } from 'contracts'


const formatETH = (value, fix = 4) => {
  value = Number(value)

  if (!value) {
    return value
  }

  const rValue = parseFloat(Number(value).toFixed(fix))

  if (rValue) {
    return rValue
  }

  return formatETH(value, fix + 1)
}

const fetchProject = async (tokenAddress: string) => {
  try {
    const eligibleContract = getContract('eligible')

    const { totalCap, distribution, endingAt, ipfsHash: ipfsHashHex, maxDeposit, totalDeposits, root, state } = await eligibleContract.sales(tokenAddress)

    const ipfsHashArr = utils.arrayify(ipfsHashHex)
    const ipfsHash = utils.base58.encode([ 18, 32, ...ipfsHashArr ])

    const ipfsData = await fetchIpfs(ipfsHash)

    console.log('IPFS data:', ipfsData)

    const { name, about, cover, logo, tokenSymbol } = ipfsData

    const tokenPrice = distribution.div(totalCap)

    return {
      name,
      about,
      cover,
      logo,
      tokenAddress,
      tokenSymbol,
      poolSize: formatETH(formatUnits(totalCap, 18)),
      hardCap: formatETH(formatUnits(distribution, 18)),
      tokenPrice: formatETH(formatUnits(tokenPrice, 18)),
      endingAt: parseInt(endingAt.toString()) * 1000,
    }
  }
  catch (err) {
    console.error(err)
    return null
  }
}


export default fetchProject

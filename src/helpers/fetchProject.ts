import { utils } from 'ethers'
import { formatUnits } from '@ethersproject/units'
import { fetchIpfs, formatETH } from 'helpers'
import { getContract } from 'contracts'


const fetchProject = async (tokenAddress: string) => {
  try {
    const eligibleContract = getContract('eligible')

    let { totalCap, distribution, endingAt, ipfsHash: ipfsHashHex, maxDeposit, totalDeposits, initiator, state, root } = await eligibleContract.sales(tokenAddress)

    const ipfsHashArr = utils.arrayify(ipfsHashHex)
    const ipfsHash = utils.base58.encode([ 18, 32, ...ipfsHashArr ])

    console.log('IPFS hash:', ipfsHash)

    const ipfsData = await fetchIpfs(ipfsHash)

    console.log('IPFS data:', ipfsData)

    const { name, about, cover, logo, tokenSymbol } = ipfsData

    const poolSize = formatETH(formatUnits(totalCap, 18))
    const hardCap = formatETH(formatUnits(distribution, 18))
    const allocation = formatETH(formatUnits(maxDeposit, 18))
    const tokenPrice = parseFloat((hardCap / poolSize).toFixed(7))

    endingAt = parseInt(endingAt.toString()) * 1000 as any
    totalDeposits = parseInt(totalDeposits.toString()) as any
    state = parseInt(state.toString())

    const project = {
      owner: initiator,
      name,
      about,
      cover,
      logo,
      tokenAddress,
      tokenSymbol,
      poolSize,
      hardCap,
      tokenPrice,
      allocation,
      endingAt,
      totalDeposits,
      state,
    }

    console.log('project:', project)

    return project
  }
  catch (err) {
    console.error(err)
    return null
  }
}


export default fetchProject

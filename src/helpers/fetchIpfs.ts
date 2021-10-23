import axios from 'axios'
import axiosRetry from 'axios-retry'
import { setupCache } from 'axios-cache-adapter'


const cache = setupCache({
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
})

const api = axios.create({
  adapter: cache.adapter,
  timeout: 1200,
})

axiosRetry(api, { retries: 3 })

export const getIpfsData = async (ipfsHash): Promise<any> => {
  try {
    // const { data } = await api.get(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`)
    const { data } = await api.get(`https://ipfs.io/ipfs/${ipfsHash}`)

    return data
  }
  catch (err) {
    console.error(err)
    return {}
  }
}


export default getIpfsData

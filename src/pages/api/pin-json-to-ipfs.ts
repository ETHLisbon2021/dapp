import pinataSDK from '@pinata/sdk'


const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET)

export default async function handler(req, res) {
  try {
    const { IpfsHash, Timestamp } = await pinata.pinJSONToIPFS(req.body)

    res.json({
      ipfsHash: IpfsHash,
      createdAt: Timestamp,
    })
  }
  catch (err) {
    console.error(err)

    res.status(500)
    res.send(err)
  }
}

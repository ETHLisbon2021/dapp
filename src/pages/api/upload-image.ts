import pinataSDK from '@pinata/sdk'
import { Readable } from 'stream'
import sharp from 'sharp'


// Hacked https://github.com/PinataCloud/Pinata-SDK/issues/28#issuecomment-816439078
const streamHack = async (stream: Readable) => {
  // @ts-ignore
  stream.path = 'image.jpg'
  return stream
}

const resizeImage = async (base64: string, width: number, height: number) => {
  const parts = base64.split(';')
  const imageData = parts[1].split(',')[1]
  const buffer = new Buffer(imageData, 'base64')
  const stream = Readable.from(await sharp(buffer).resize(width, height).toBuffer())

  return streamHack(stream)
}

const resizeAndUpload = async (base64: string, width: number, height: number) => {
  const readableStream = await resizeImage(base64, width, height)

  return pinata.pinFileToIPFS(readableStream)
}

const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET)

export default async function handler(req, res) {
  try {
    const [ width, height ] = [ 328, 328 ]

    const [ { IpfsHash: large }, { IpfsHash: small } ] = await Promise.all([
      resizeAndUpload(req.body.file, width * 2, height * 2),
      resizeAndUpload(req.body.file, width, height),
    ])

    res.json({ large, small })
  }
  catch (err) {
    console.error(err)

    res.status(500)
    res.send({ message: err.toString() })
  }
}

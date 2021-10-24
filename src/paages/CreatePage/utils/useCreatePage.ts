import axios from 'axios'
import { useRouter } from 'next/router'
import { parseUnits } from '@ethersproject/units'
import { utils } from 'ethers'
import { useForm } from 'formular'
import { useReducerState } from 'hooks'
import { required } from 'helpers/validators'
import { sharableStore, formatETH } from 'helpers'
import { getContract } from 'contracts'


type FormFields = {
  cover: string
  logo: string
  tokenAddress: string
  tokenSymbol: string
  name: string
  about: string
  poolSize: number
  hardCap: number
  allocation: number
  endingAt: number
}

const useCreatePage = () => {
  const router = useRouter()
  const [ state, setState ] = useReducerState({ isSubmitting: false })

  const { isSubmitting } = state

  const form = useForm<FormFields>({
    fields: {
      cover: [ required ],
      logo: [ required ],
      tokenAddress: [ required ],
      tokenSymbol: [ required ],
      name: [ required ],
      about: [ required ],
      poolSize: [ required ],
      hardCap: [ required ],
      allocation: [ required ],
      endingAt: [ required ],
    },
  })

  const prefill = () => {

    form.setValues({
      cover: '/ipfs-files/cover.jpg',
      logo: '/ipfs-files/logo.jpg',
      tokenAddress: process.env.NEXT_PUBLIC_TOKEN,
      tokenSymbol: 'AZURO',
      name: 'Azuro',
      about: 'Azuro is the decentralized infrastructure needed to increase transparency, efficiency, responsibility and fairness, and share more value with more participants in betting, globally.',
      poolSize: 400_000,
      hardCap: 600_000 / 3900,
      allocation: 1000,
      endingAt: 1635328944659,
    })
  }

  const submit = async () => {
    if (isSubmitting) {
      return
    }

    try {
      const { values, errors } = await form.submit()

      if (errors) {
        return
      }

      setState({ isSubmitting: true })

      const eligibleContract = getContract('eligible', true)

      const { tokenAddress, tokenSymbol, poolSize, hardCap, allocation, endingAt, name, about, cover, logo } = values

      const ipfsValues = {
        name,
        about,
        cover,
        logo,
        tokenSymbol,
      }

      const { data: { ipfsHash } } = await (axios.post('/api/pin-json-to-ipfs', ipfsValues) as Promise<{ data: { ipfsHash: string } }>)

      const ipfsHashHex = utils.hexlify(utils.base58.decode(ipfsHash).slice(2))

      const hardCapBN = parseUnits(String(hardCap), 18)
      const poolSizeBN = parseUnits(String(poolSize), 18)
      const allocationBN = parseUnits(String(allocation), 18)
      const endingAtSec = parseInt(String(endingAt / 1000))

      console.log('data:', {
        tokenAddress,
        hardCap,
        poolSize,
        allocation,
        endingAt,
        ipfsHashHex,
      })

      const receipt = await eligibleContract.initSale(
        tokenAddress,
        poolSizeBN,
        hardCapBN,
        allocationBN,
        endingAtSec,
        ipfsHashHex
      )

      const trxHash = await receipt.wait()

      setState({ isSubmitting: false })

      sharableStore.addProject({
        name,
        about,
        cover,
        logo,
        tokenAddress,
        tokenSymbol,
        poolSize,
        hardCap,
        tokenPrice: formatETH(hardCap / poolSize),
        endingAt,
      })

      router.push('/projects')
    }
    catch (err) {
      console.error(err)
      setState({ isSubmitting: false })
      // TODO show error notification - added on 8/24/21 by grammka
    }
  }

  return {
    form,
    prefill,
    submit,
    isSubmitting,
  }
}


export default useCreatePage

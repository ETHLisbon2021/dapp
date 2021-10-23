import axios from 'axios'
import { utils } from 'ethers'
import { useForm } from 'formular'
import { useReducerState } from 'hooks'
import { required } from 'helpers/validators'


type FormFields = {
  image: string
  logo: string
  name: string
  description: string
  raise: number
  allocation: number
}

const useCreatePage = () => {
  const [ state, setState ] = useReducerState({ isSubmitting: false })

  const { isSubmitting } = state

  const form = useForm<FormFields>({
    fields: {
      image: [ required ],
      logo: [ required ],
      name: [ required ],
      description: [ required ],
      raise: [ required ],
      allocation: [ required ],
    },
  })

  const submit = async () => {
    try {
      const { values, errors } = await form.submit()

      if (errors) {
        return
      }

      setState({ isSubmitting: true })

      const  { data: { large, small } } = await axios.post('/api/upload-image', {
        file: values.logo,
      })

      const { data: { ipfsHash } } = await axios.post('/api/pin-json-to-ipfs', { ...values, logo: { large, small } })

      const ipfsHashHex = utils.hexlify(utils.base58.decode(ipfsHash).slice(2))

      // const receipt = await stakingContract.addManager(ipfsHashHex, values.symbol.toUpperCase())
      // const trxHash = await receipt.wait()
    }
    catch (err) {
      console.error(err)
      setState({ isSubmitting: false })
      // TODO show error notification - added on 8/24/21 by grammka
    }
  }

  return {
    form,
    submit,
    isSubmitting,
  }
}


export default useCreatePage

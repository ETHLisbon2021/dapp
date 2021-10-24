import { useEffect } from 'react'
import { useConnect } from 'web3'
import { useReducerState } from 'hooks'
import { utils } from 'ethers'
import { api } from 'helpers'


const usePresets = ({ tokenAddress }) => {
  const { library, account } = useConnect()

  const [ state, setState ] = useReducerState({
    isFetching: true,
    presets: null,
    selectingIndex: null,
    selectedIndex: null,
  })

  const fetch = async () => {
    try {
      const { data: presets } = await api.get('/presets')

      console.log('presets:', presets)

      setState({ isFetching: false, presets })
    }
    catch (err) {
      console.error(err)
      setState({ isFetching: false })
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const select = async (index) => {
    if (!library || !account || index === state.selectedIndex) {
      return
    }

    try {
      setState({ selectingIndex: index })

      const presetId = state.presets[index].id
      const rawMessage = 'Sign this message to authorize to Eligible'

      const signature = await library.send('personal_sign', [
        utils.hexlify(utils.toUtf8Bytes(rawMessage)),
        account.toLowerCase()
      ])

      const verified = utils.verifyMessage(rawMessage, signature)

      if (verified === account) {
        await api.post('/sales/calculate', {
          id: tokenAddress,
          preset: presetId,
          signature,
        })

        setState({ selectingIndex: null, selectedIndex: index })
      }
    }
    catch (err) {
      console.error(err)
      setState({ selectingIndex: null })
    }
  }

  return {
    ...state,
    select,
  }
}


export default usePresets

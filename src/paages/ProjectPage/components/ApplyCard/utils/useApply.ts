import { useEffect } from 'react'
import { useConnect } from 'web3'
import { utils } from 'ethers'
import { useForm } from 'formular'
import { getContract } from 'contracts'
import { useReducerState } from 'hooks'
import { formatUnits, parseUnits } from '@ethersproject/units'
import { required } from 'helpers/validators'
import { formatETH } from 'helpers'


type FormFields = {
  account: string
  amount: number
}

const useApply = ({ tokenAddress, allocation }) => {
  const { library, account } = useConnect()

  const storageKey = `eligible-applied-for-${tokenAddress}`

  const [ state, setState ] = useReducerState({
    isFetching: true,
    balance: null,
    isSubmitting: false,
    isApplied: window.localStorage.getItem(storageKey) === 'true',
  })

  const form = useForm<FormFields>({
    fields: {
      account: [ required ],
      amount: [ required ],
    },
  })

  const fetch = async () => {
    try {
      const balance = await library.getBalance(account)

      setState({
        isFetching: false,
        balance: formatETH(formatUnits(balance, 18)),
      })
    }
    catch (err) {
      console.error(err)
      setState({ isFetching: false })
    }
  }

  useEffect(() => {
    if (library && account && !state.isApplied) {
      fetch()
    }
  }, [ library, account ])

  const submit = async () => {
    if (state.isSubmitting) {
      return
    }

    const eligibleContract = getContract('eligible', true)
    const account = form.fields.account.state.value
    const amount = form.fields.amount.state.value

    if (!utils.isAddress(account) || !amount || amount > allocation) {
      return
    }

    try {
      setState({ isSubmitting: true })

      const value = parseUnits(String(amount), 18)
      const receipt = await eligibleContract.deposit(tokenAddress, account, { value })
      const trx = await receipt.wait()

      window.localStorage.setItem(storageKey, 'true')
      setState({ isSubmitting: false, isApplied: true })
    }
    catch (err) {
      console.error(err)
      setState({ isSubmitting: false })
    }
  }

  return {
    ...state,
    form,
    submit,
  }
}


export default useApply

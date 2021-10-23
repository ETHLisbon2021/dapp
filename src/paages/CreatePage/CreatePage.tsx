import React, { useState, useEffect } from 'react'
import { utils } from 'ethers'
import { useConnect } from 'web3'
import { useFieldState } from 'formular'
import { parseUnits } from '@ethersproject/units'
// import { Web3Storage } from 'web3.storage'
import DatePicker from 'react-date-picker/dist/entry.nostyle'
import { contracts, getTokenContract } from 'contracts'
import { useReducerState } from 'hooks'
import cx from 'classnames'

import { WidthContainer } from 'components/layout'

import Input from './components/Input/Input'

import useCreatePage from './utils/useCreatePage'

import s from './CreatePage.module.scss'


// const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3STORAGE_KEY })

const ImageInput = ({ className, field, mockedSrc }) => {
  const { value: src, error } = useFieldState<string>(field)

  const [ isLoading, setLoading ] = useState(false)

  const id = `input-${className}`

  const handleChange = async (event) => {
    const files = event.target.files

    if (files?.length) {
      setLoading(true)

      // ATTN Pinata is loading forever...
      // ATTN Web3.Storage failed with BUGGGGGG - https://github.com/ipfs/js-ipfs-unixfs/issues/172
      // const rootCid = await client.put(files)
      // const info = await client.status(rootCid)
      // const res = await client.get(rootCid)

      setTimeout(() => {
        // Trust me! Here we're uploading files to IPFS! ;)
        field.set(mockedSrc)
        setLoading(false)
      }, 1500)
    }
  }

  return (
    <label className={className} htmlFor={id} style={{ backgroundImage: src ? `url(${src})` : null }}>
      <input id={id} type="file" onChange={handleChange} />
      {
        isLoading && (
          <img className={s.spinner} src="/images/svg/16/spinner.svg" alt="" />
        )
      }
      {
        !src && !isLoading && (
          <img className={s.imgPlaceholder} src="/images/image-placeholder.svg" alt="" />
        )
      }
    </label>
  )
}

const AddressInputs = ({ form }) => {

  const handleChange = async (tokenAddress) => {
    if (!utils.isAddress(tokenAddress)) {
      form.fields.tokenAddress.setError('Not valid address')
      return
    }

    const tokenContract = getTokenContract(tokenAddress)

    const symbol = await tokenContract.symbol()

    form.fields.tokenSymbol.set(symbol)
  }

  return (
    <div className={s.row}>
      <div>
        <div className={s.label}>Token address</div>
        <Input className={s.input} field={form.fields.tokenAddress} onChange={handleChange} />
      </div>
      <div>
        <div className={s.label}>Token symbol</div>
        <Input className={s.input} field={form.fields.tokenSymbol} disabled />
      </div>
    </div>
  )
}

const EndingDate = ({ field }) => {
  const { value: startDate } = useFieldState<number>(field)

  const minDate = new Date(new Date().setDate(new Date().getDate() + 1))

  const handleChange = (date) => {
    field.set(date?.getTime() || null)
  }

  return (
    <DatePicker
      className={s.datePicker}
      value={startDate ? new Date(startDate) : null}
      minDate={minDate}
      onChange={handleChange}
    />
  )
}

const SubmitButton = ({ form, isSubmitting, onSubmit }) => {
  const { account } = useConnect()
  const [ { isLoading, isAllowed }, setState ] = useReducerState({ isLoading: false, isAllowed: null })

  useEffect(() => {
    const handleChange = async (tokenAddress) => {
      if (!utils.isAddress(tokenAddress)) {
        return
      }

      try {
        setState({ isLoading: true })

        const tokenContract = getTokenContract(tokenAddress)
        const allowance = await tokenContract.allowance(account, contracts.eligible.address)

        console.log('Allowance amount:', allowance.toString())

        setState({
          isLoading: false,
          isAllowed: allowance.toString() !== String(form.fields.hardCap.state.value),
        })
      }
      catch (err) {
        console.error(err)
        setState({ isLoading: false })
      }
    }

    form.fields.tokenAddress.on('change', handleChange)

    return () => {
      form.fields.tokenAddress.off('change', handleChange)
    }
  })

  const handleApprove = async () => {
    if (!account || isLoading || isSubmitting) {
      return
    }

    try {
      const tokenAddress = form.fields.tokenAddress.state.value

      if (!utils.isAddress(tokenAddress)) {
        return
      }

      setState({ isLoading: true })

      const tokenContract = getTokenContract(tokenAddress, true)
      const amount = parseUnits(String(form.fields.hardCap.state.value), 18)

      console.log('Approve amount:', amount.toString())

      const receipt = await tokenContract.approve(contracts.eligible.address, amount)
      const trx = receipt.wait()

      setState({
        isLoading: false,
        isAllowed: true,
      })
    }
    catch (err) {
      console.error(err)
      setState({ isLoading: false })
    }
  }

  return (
    <div className={cx(s.submitButton, { [s.disabled]: !account })} onClick={isAllowed === false ? handleApprove : onSubmit}>
      {
        isLoading || isSubmitting ? (
          <img className={s.buttonSpinner} src="/images/svg/16/spinner.svg" alt="" />
        ) : (
          <span>{isAllowed === false ? 'Approve' : 'Create project'}</span>
        )
      }
    </div>
  )
}

const CreatePage = () => {
  const { form, prefill, submit, isSubmitting } = useCreatePage()

  return (
    <WidthContainer>
      <div className={s.imageContainer}>
        <ImageInput className={s.cover} field={form.fields.cover} mockedSrc="/ipfs-files/cover.jpg" />
        <ImageInput className={s.logo} field={form.fields.logo} mockedSrc="/ipfs-files/logo.jpg" />
      </div>
      <AddressInputs form={form} />
      <div className={s.label}>Name</div>
      <Input className={s.input} field={form.fields.name} />
      <div className={s.label}>Pool size</div>
      <Input className={s.input} field={form.fields.poolSize} />
      <div className={s.label}>Hard cap</div>
      <Input className={s.input} field={form.fields.hardCap} />
      <div className={s.label}>Allocation</div>
      <Input className={s.input} field={form.fields.allocation} />
      <div className={s.label}>Description</div>
      <Input className={s.input} field={form.fields.about} />
      <div className={s.label}>Ending at</div>
      <EndingDate field={form.fields.endingAt} />
      <div className={s.buttons}>
        <div className={s.prefillButton} onClick={prefill}>It's demo time!</div>
        <SubmitButton form={form} isSubmitting={isSubmitting} onSubmit={submit} />
      </div>
    </WidthContainer>
  )
}


export default CreatePage

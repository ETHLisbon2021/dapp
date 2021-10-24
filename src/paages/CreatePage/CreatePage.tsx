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

import { WidthContainer, Card } from 'components/layout'
import { Title } from 'components/dataDisplay'
import FundedProjects from 'compositions/FundedProjects/FundedProjects'

import Input from './components/Input/Input'

import useCreatePage from './utils/useCreatePage'

import s from './CreatePage.module.scss'


// const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3STORAGE_KEY })

const FileInput = ({ id, field, placeholder, mockedSrc }) => {
  const { value: src, error } = useFieldState<string>(field)

  const [ isLoading, setLoading ] = useState(false)

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
    <div className={s.fileInput}>
      <div className={s.placeholder}>{src || placeholder}</div>
      <label htmlFor={id}>
        <input id={id} type="file" onChange={handleChange} />
        {
          isLoading ? (
            <img className={s.spinner} src="/images/svg/16/spinner.svg" alt="" />
          ) : (
            Boolean(src) ? (
              <span>Selected!</span>
            ) : (
              <span>Select file</span>
            )
          )
        }
      </label>
    </div>
  )
}

const TokenSymbol = ({ field, isLoading }) => {
  const { value } = useFieldState(field)

  return (
    <div className={s.tokenSymbol}>
      {
        isLoading ? (
          <img className={s.spinner} src="/images/svg/16/spinner.svg" alt="" />
        ) : (
          <span>{value}</span>
        )
      }
    </div>
  )
}

const AddressInputs = ({ form }) => {
  const [ isLoading, setLoading ] = useState(false)

  const handleChange = async (tokenAddress) => {
    if (!utils.isAddress(tokenAddress)) {
      form.fields.tokenAddress.setError('Not valid address')
      return
    }

    setLoading(true)

    try {
      const tokenContract = getTokenContract(tokenAddress)

      const symbol = await tokenContract.symbol()

      form.fields.tokenSymbol.set(symbol)
    }
    catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  return (
    <div className={s.addressInputs}>
      <Input className={s.input} field={form.fields.tokenAddress} placeholder="Token address" onChange={handleChange} />
      <TokenSymbol field={form.fields.tokenSymbol} isLoading={isLoading} />
    </div>
  )
}

const EndingDate = ({ field, placeholder }) => {
  const { value: startDate } = useFieldState<number>(field)

  const minDate = new Date(new Date().setDate(new Date().getDate() + 1))

  const handleChange = (date) => {
    field.set(date?.getTime() || null)
  }

  return (
    <div className={s.datePicker}>
      {
        Boolean(!startDate) && (
          <div className={s.placeholder}>{placeholder}</div>
        )
      }
      <DatePicker
        value={startDate ? new Date(startDate) : null}
        minDate={minDate}
        onChange={handleChange}
      />
    </div>
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
        console.log('Required amount:', String(form.fields.hardCap.state.value))

        setState({
          isLoading: false,
          isAllowed: allowance.toString() === String(form.fields.hardCap.state.value),
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
    <>
      <WidthContainer>
        <Title className={s.title}>Create your own project</Title>
        <Card className={s.card}>
          <div className={s.formTitle}>Fill all fields to proceed to the next step</div>
          <div className={s.form}>
            <AddressInputs form={form} />
            <Input className={s.input} field={form.fields.name} placeholder="Name" />
            <Input className={s.input} field={form.fields.poolSize} placeholder="Pool size" />
            <Input className={s.input} field={form.fields.hardCap} placeholder="Hard cap" />
            <Input className={s.input} field={form.fields.allocation} placeholder="Allocation" />
            <Input className={s.input} field={form.fields.about} placeholder="Description" />
            <EndingDate field={form.fields.endingAt} placeholder="Ending at" />
            <FileInput id="input-cover" field={form.fields.cover} placeholder="Cover image" mockedSrc="/ipfs-files/cover.jpg" />
            <FileInput id="input-logo" field={form.fields.logo} placeholder="Project logo" mockedSrc="/ipfs-files/logo.jpg" />
          </div>
          <div className={s.buttons}>
            <SubmitButton form={form} isSubmitting={isSubmitting} onSubmit={submit} />
            <div className={cx(s.prefillButton, { [s.disabled]: isSubmitting })} onClick={prefill}>It's demo time!</div>
          </div>
        </Card>
      </WidthContainer>
      <FundedProjects title="Your projects" />
    </>
  )
}


export default CreatePage

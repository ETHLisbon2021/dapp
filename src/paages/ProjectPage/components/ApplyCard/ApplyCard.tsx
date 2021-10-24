import React from 'react'
import cx from 'classnames'

import { Card } from 'components/layout'

import useApply from './utils/useApply'

import s from './ApplyCard.module.scss'


const Input = ({ field, ...rest }) => {
  const handleChange = (event) => {
    field.set(event.target.value)
  }

  return (
    <input {...rest} type="text" onChange={handleChange} />
  )
}

const ApplyCard = ({ tokenAddress }) => {
  const { isFetching, form, balance, submit, isSubmitting, isApplied } = useApply({ tokenAddress })

  if (isApplied) {
    return (
      <Card className={s.card}>
        <div className={s.content}>
          <div className={s.applied}>You've already applied to this project.</div>
        </div>
      </Card>
    )
  }

  return (
    <Card className={s.card}>
      <div className={s.content}>
        <div className={s.title}>Submit your application</div>
        <Input
          className={s.addressInput}
          field={form.fields.account}
          placeholder="ETH WALLET ADDRESS"
        />
        <div className={s.inputContainer}>
          <Input
            className={s.input}
            field={form.fields.amount}
            placeholder="AMOUNT"
          />
          <div className={s.maxButton}>Max</div>
        </div>
        <div className={s.balance}>
          <span>You balance:</span>&nbsp;
          {
            isFetching ? (
              <img className={s.spinner} src="/images/svg/16/spinner.svg" alt="" />
            ) : (
              <b>{balance} ETH</b>
            )
          }
        </div>
      </div>
      <div className={cx(s.button, { [s.disabled]: isSubmitting })} onClick={submit}>
        {
          isSubmitting ? (
            <img className={s.spinner} src="/images/svg/16/spinner.svg" alt="" />
          ) : (
            <span>Submit application</span>
          )
        }
      </div>
    </Card>
  )
}


export default ApplyCard

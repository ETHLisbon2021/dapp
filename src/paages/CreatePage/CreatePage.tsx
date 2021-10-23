import React, { useRef } from 'react'
import { useFieldState } from 'formular'

import { WidthContainer } from 'components/layout'

import Input from './components/Input/Input'

import useCreatePage from './utils/useCreatePage'

import s from './CreatePage.module.scss'


const ImageInput = ({ className, field }) => {
  const { value: src, error } = useFieldState<string>(field)

  const id = `input-${className}`

  const handleChange = (event) => {
    const file = event.target.files?.[0]

    if (file) {
      const fr = new FileReader()

      fr.addEventListener('load', async (event) => {
        field.set(event.target.result.toString())
      })

      fr.readAsDataURL(file)
    }
  }

  return (
    <label className={className} htmlFor={id} style={{ backgroundImage: src ? `url(${src})` : null }}>
      <input id={id} type="file" onChange={handleChange} />
      {
        Boolean(src) ? (
          <button className={s.changeButton}>Change</button>
        ) : (
          <img className={s.imgPlaceholder} src="/images/image-placeholder.svg" alt="" />
        )
      }
    </label>
  )
}

const CreatePage = () => {
  const { form, submit, isSubmitting } = useCreatePage()

  return (
    <WidthContainer>
      <div className={s.imageContainer}>
        <ImageInput className={s.image} field={form.fields.image} />
        <ImageInput className={s.logo} field={form.fields.logo} />
      </div>
      <Input className={s.input} label="Name" field={form.fields.name} />
      <Input className={s.input} label="Raise" field={form.fields.raise} />
      <Input className={s.input} label="Allocation" field={form.fields.allocation} />
      <Input className={s.input} label="Description" field={form.fields.description} />
      <div className={s.submitButton} onClick={submit}>Submit</div>
    </WidthContainer>
  )
}


export default CreatePage

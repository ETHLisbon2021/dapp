import React, { useRef } from 'react'
import { useFieldState } from 'formular'

import useCreatePage from './utils/useCreatePage'

import s from './CreatePage.module.scss'


const ImageInput = ({ field }) => {
  const { value: managerLogo, error } = useFieldState<string>(field)

  const logoPlaceholder = '/images/image-placeholder.svg'

  const imgRef = useRef<HTMLImageElement>()

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
    <div>
      <img
        ref={imgRef}
        className={s.image}
        src={managerLogo || logoPlaceholder}
        alt=""
      />
      <label className={s.fileButton} htmlFor="fileInput">
        <input id="fileInput" type="file" onChange={handleChange} />
        <button>Deploy</button>
      </label>
    </div>
  )
}

const CreatePage = () => {
  const { form, submit, isSubmitting } = useCreatePage()

  return (
    <div>
      <ImageInput field={form.fields.logo} />
      <button onClick={submit}>Submit</button>
    </div>
  )
}


export default CreatePage

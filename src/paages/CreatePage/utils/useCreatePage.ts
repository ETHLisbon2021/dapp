import axios from 'axios'
import { useForm } from 'formular'
import { useReducerState } from 'hooks'
import { required } from 'helpers/validators'


type FormFields = {
  logo: string
}

const useCreatePage = () => {
  const [ state, setState ] = useReducerState({ isSubmitting: false })

  const { isSubmitting } = state

  const form = useForm<FormFields>({
    fields: {
      logo: [ required ],
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

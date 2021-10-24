import { useEffect } from 'react'
import { useReducerState } from 'hooks'
import { fetchProject, sharableStore } from 'helpers'


const useProjectPage = (tokenAddress: string) => {
  const [ state, setState ] = useReducerState({ isFetching: true, project: null })

  const fetch = async () => {
    try {
      let project = sharableStore.getProject(tokenAddress)

      if (!project) {
        project = await fetchProject(tokenAddress)

        sharableStore.addProject(project)
      }

      setState({ isFetching: false, project })
    }
    catch (err) {
      console.error(err)
      setState({ isFetching: false })
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return state
}


export default useProjectPage

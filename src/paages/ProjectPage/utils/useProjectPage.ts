import { useEffect } from 'react'
import { useReducerState } from 'hooks'
import { fetchProject, sharableStore, api } from 'helpers'


const useProjectPage = (tokenAddress: string) => {
  const [ state, setState ] = useReducerState({ isFetching: true, project: null, users: null })

  const fetch = async () => {
    try {
      const promises = [
        api.get(`/sales/${tokenAddress}`),
      ] as Promise<any>[]

      let project = sharableStore.getProject(tokenAddress)

      if (project) {
        promises.push(Promise.resolve(project))
      }
      else {
        promises.push(fetchProject(tokenAddress))
      }

      const [ { data: { users } }, projectData ] = await Promise.all(promises)

      console.log('project:', projectData)
      console.log('users:', users)

      project = projectData

      sharableStore.addProject(projectData)

      setState({ isFetching: false, project, users })
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

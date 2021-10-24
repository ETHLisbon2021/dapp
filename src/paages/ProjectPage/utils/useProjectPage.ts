import { useEffect } from 'react'
import { useReducerState } from 'hooks'
import { formatUnits } from '@ethersproject/units'
import { fetchProject, sharableStore, api } from 'helpers'


const useProjectPage = (tokenAddress: string) => {
  const [ state, setState ] = useReducerState({ isFetching: true, project: null, presetState: null, users: null })

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

      const [ { data: { users, calculated, preset: presetId, saleId } }, projectData ] = await Promise.all(promises)

      console.log('project:', projectData)
      console.log('users:', users)

      project = projectData

      sharableStore.addProject(projectData)

      setState({
        isFetching: false,
        project,
        presetState: {
          presetId,
          calculated,
        },
        users: users.map(({ address, allocation, amount, score }) => ({
          address,
          allocation: parseFloat(formatUnits(allocation, 18)),
          amount: parseFloat(formatUnits(amount, 18)),
          score,
        })),
      })
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

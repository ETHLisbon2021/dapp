import { useEffect } from 'react'
import { useReducerState } from 'hooks'
import { getContract } from 'contracts'
import { fetchProject, sharableStore } from 'helpers'


const useUpcomingProjects = () => {
  const [ state, setState ] = useReducerState({ isFetching: true, projects: null })

  const fetch = async () => {
    try {
      const eligibleContract = getContract('eligible')
      const filter = eligibleContract.filters.SaleInitiated()

      const data = await eligibleContract.queryFilter(filter)

      let projects = await Promise.all(data.map(({ args }) => {
        return fetchProject(args.tokenAddress)
      }))

      projects = projects.filter((v) => v).filter(({ name }) => name)

      sharableStore.setProjects(projects)

      setState({ isFetching: false, projects })
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


export default useUpcomingProjects

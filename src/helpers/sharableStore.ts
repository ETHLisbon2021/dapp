let sharableStore = {}

const setProjects = (projects: any[]) => {
  sharableStore = projects.reduce((acc, project) => {
    acc[project.tokenAddress] = project
    return acc
  }, {})
}

const addProject = (project) => {
  sharableStore[project.tokenAddress] = project
}

const getProject = (tokenAddress) => {
  return sharableStore[tokenAddress]
}


export default {
  setProjects,
  addProject,
  getProject,
}

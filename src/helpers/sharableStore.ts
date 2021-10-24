let sharableStore = {}

const setProjects = (projects: any[]) => {
  sharableStore = projects.reduce((acc, project) => {
    acc[project.tokenAddress] = project
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

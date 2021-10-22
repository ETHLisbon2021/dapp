const isEmpty = (value: any): boolean => (
  typeof value === 'undefined'
  || value === null
  || value === ''
  || /^\s+$/.test(value)
)

export const required = (value: any) => {
  if (isEmpty(value)) {
    return 'Required'
  }
}

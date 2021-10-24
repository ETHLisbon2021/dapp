const formatETH = (value, fix = 4) => {
  value = Number(value)

  if (!value) {
    return value
  }

  const rValue = parseFloat(Number(value).toFixed(fix))

  if (rValue) {
    return rValue
  }

  return formatETH(value, fix + 1)
}


export default formatETH

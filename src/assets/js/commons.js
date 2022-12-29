function orderObj (obj, preset) {
  const order = preset.split(',')
  const orderedObj = order.map(i => obj[i])
  return orderedObj
}

export default orderObj
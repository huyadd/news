module.exports = function createGridVariables(prefix, layout, grid, range, suffix){
  return Object.assign(...Array.from(Array(range), (v, k) => ({[prefix + k + suffix]: (k / (layout / grid) * 100) + 'vw' })))
}
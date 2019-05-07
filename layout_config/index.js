'use strict'
const createGridVariables = require('./createGridVariables.js')
const {layoutSize, gridSize, range} = require('./config.js')

module.exports = (prefix, suffix='') => createGridVariables(prefix, layoutSize, gridSize, range, suffix)
import GetQuery from './getQuery.js'

export default (to, from) => {
    let toVal = GetQuery(to).loginBox ? 1 : 0
    let fromVal = GetQuery(from).loginBox ? 1 : 0
    return toVal - fromVal
}
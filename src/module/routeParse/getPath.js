import ClearUrl from './clearUrl.js'
export default url => url.indexOf('?') == -1 ? ClearUrl(url) : ClearUrl(url.substr(0, url.indexOf('?')))

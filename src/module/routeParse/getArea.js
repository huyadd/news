export default path => path.split('/').filter(x => x)[0] ? path.split('/').filter(x => x)[0].match(/(\w+)/g)[0] : 'news'

// export default path => path.split('/')[0] ? path.match(/(\w+)/g)[0] : 'news'
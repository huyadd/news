let structure = {
    main: {
        name: 'news',
        children:{
            detail:{
                name: 'detail'
            }
        }
    },
    subsidiary: {
        name: 'user',
        children: {
            info: {
                name: 'info'
            },
            history: {
                name: 'history'
            },
            favorites: {
                name: 'favorites'
            },
        }
    }
}

export default [structure.main.name, structure.subsidiary.name]
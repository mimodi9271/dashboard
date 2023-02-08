const initalValues = {
    Posts : [] ,
    PostError : null
}

const PostRedux = (state = initalValues , action) => {
    switch(action.type){
        case "LoadData":
            return {...state , Posts : [...action.payload]};
        case "errpostdis" :
            return {...state , Posts : [] , PostError : action.payload}
        case "Addpost":
            return {...state , Posts : [...state.Posts , action.payload]}
        default :
        return state
    }
}

export default PostRedux;
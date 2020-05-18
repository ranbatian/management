const defaultState ={
    title:'首页'
}

export default (state=defaultState,action)=>{
    if(action.type === 'changeTitle'){
         let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
         newState.title = action.value
         console.log(newState)
         return newState
    }
    return state
}
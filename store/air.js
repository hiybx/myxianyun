export const state=()=>{
    return {
        myhistory:[]
    }
}
export const mutations={
    setHistory(state,data){
        state.myhistory=data
        console.log(state.myhistory)
    }
}
export const actions={}
import { combineReducers } from 'redux'

function album(state, action) {
    console.log(action.type)
    switch (action.type) {
        case "REQUEST_ALBUM" :
            return Object.assign({}, state)
        case "RECEIVE_ALBUM":
            //Copies current albumData object from store
            let newData = Object.assign({}, state.albumData)
            //Inserts new data
            newData[action.id] = action.data
            return Object.assign({}, state,
            {
                albumData: newData
            }
            )
        case "RECEIVE_TOKEN":
            console.log(action.token)
            return Object.assign({}, state, {token : action.token})
    }
    return state
}

const reducer = album

export default reducer;
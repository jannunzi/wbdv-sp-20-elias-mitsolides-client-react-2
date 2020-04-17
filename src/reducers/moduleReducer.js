//reducer is how we implement FSM/an index of the history of states
//a folder for all reducers, a file for each reducer, each keeps track
//of its own state
//actions are dispatched to reducers which return a new state based on
//some utilization of new info from view/the reducers parameters

import {CREATE_MODULE, DELETE_MODULE, SHOW_COURSE_MODULES, UPDATE_MODULE} from "../actions/moduleActions";

const initialState = {
    module:{},
    modules: []
}

// calc next state, redux takes this fsm/reducer, prov with cur state and actions, prove next state
// undo could be, traverse this history by some backward index
// a new state causes the provider to be run again, so the connects are run again, so the new state is shown
// via mappers
const moduleReducer = (state = initialState, action) => {

    switch (action.type){
        case SHOW_COURSE_MODULES:
            return{
                modules: action.modules
            }
        case CREATE_MODULE: // good to use a variable, compiler will catch that better than misspelling a string
            return {
                modules: [
                    ...state.modules,
                    action.newModule
                ]
            }

        case DELETE_MODULE:
            return {
                modules: state.modules.filter(module => module._id !== action.moduleId)
            }
        case UPDATE_MODULE:
            //action.module.editing = false;
            return {
                modules: [
                    ...state.modules
                ]
            }
        default:
            return state
    }
}

export default moduleReducer
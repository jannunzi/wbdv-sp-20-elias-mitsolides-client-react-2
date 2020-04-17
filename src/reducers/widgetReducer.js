import {
    CREATE_WIDGET,
    DELETE_WIDGET,
    FIND_ALL_WIDGETS,
    SHOW_TOPIC_WIDGETS,
    UPDATE_WIDGET
} from "../actions/widgetActions";

const initialState = {
    widget:{},
    widgets:[]
}

const widgetReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_TOPIC_WIDGETS:
            return {
                widgets: action.widgets
            }
        case CREATE_WIDGET:
            console.log("CREATE_WIDGET", action.widget)
            return {
                widgets: [
                    ...state.widgets,
                    action.widget
                ]
            }
        case DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(widget => widget.id !== action.widgetId)
            }
        case UPDATE_WIDGET:
            return {
                widgets: [...state.widgets]
            }
        case FIND_ALL_WIDGETS:
            return {
                widgets: action.widgets
            }
            //Idea from TA Priyanka
        // case "UP":
        //      let upIndex = state.widgets.indexOf(action.widget) - 1;
        //      const orderedWidgets = reorderWidget(state.widgets, upIndex + 1, upIndex)
        //     return{
        //        widgets: orderedWidgets
        //     }
        // case "DOWN":
        //      let downIndex = state.widgets.indexOf(action.widget) + 1;
        //      const orderedWidgets = reorderWidget(state.widgets, downIndex - 1, downIndex)
        //     return{
        //        widgets: orderedWidgets
        //     }
        //  .map then switch
        default:
            return state
    }
}

export default  widgetReducer
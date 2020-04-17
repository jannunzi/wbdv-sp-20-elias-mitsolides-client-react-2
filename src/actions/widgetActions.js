export const CREATE_WIDGET = "CREATE_WIDGET"
export const createWidget = (newWidget) => ({
    type: CREATE_WIDGET,
    widget: newWidget

})

export const DELETE_WIDGET = "DELETE_WIDGET"
export const deleteWidget = (widgetId) => ({
    type: DELETE_WIDGET,
    widgetId: widgetId
})

export const SHOW_TOPIC_WIDGETS = "SHOW_TOPIC_WIDGETS"
export const findAllWidgetsForTopic = (widgets) => ({
    type: SHOW_TOPIC_WIDGETS,
    widgets: widgets
})

export const FIND_ALL_WIDGETS = "FIND_ALL_WIDGETS"
export const findAllWidgets = (widgets) => ({
    type: FIND_ALL_WIDGETS,
    widgets: widgets
})

export const UPDATE_WIDGET = "UPDATE_WIDGET"
export const updateWidget = (widgetId, widget) => ({
    type: UPDATE_WIDGET,
    widgetId: widgetId,
    widget: widget
})


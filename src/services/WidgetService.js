export const findWidgetsForTopic = (topicid) =>
    fetch(`http://localhost:8080/api/topics/${topicid}/widgets`) //`https://lit-harbor-62519.herokuapp.com/api/topics/${topicid}/widgets`
        .then(response => {
            return response.json()
        })

export const updateWidget = (wid, widget) =>

    fetch(`http://localhost:8080/api/widgets/${wid}`, { // `https://lit-harbor-62519.herokuapp.com/api/widgets/${wid}`
        method: "PUT",
        body: JSON.stringify(widget),
        headers: {
            'content-type': "application/json"
        }
    }).then(response => response.json())

export const findAllWidgets = () =>
    fetch("http://localhost:8080/api/widgets")  //"https://lit-harbor-62519.herokuapp.com/api/widgets"
        .then(response => response.json())

export const deleteWidget = (widgetId) =>
    fetch(`http://localhost:8080/api/widgets/${widgetId}`, { //`https://lit-harbor-62519.herokuapp.com/api/widgets/${widgetId}`
        method: "DELETE"
    }).then(response => response.json())

export const createWidget = (topicId, widget) =>
    fetch(`http://localhost:8080/api/topics/${topicId}/widgets`, { //`https://lit-harbor-62519.herokuapp.com/api/topics/${topicId}/widgets`
        method: "POST",
        body: JSON.stringify(widget),
        headers: {
            'content-type': "application/json"
        }
    }).then(response => response.json())

export default {
    createWidget: createWidget,
    deleteWidget: deleteWidget,
    findAllWidgets: findAllWidgets,
    updateWidget: updateWidget,
    findWidgetsForTopic: findWidgetsForTopic
}
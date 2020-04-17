export const createTopic = (lessonId, topic) =>
    fetch(`http://localhost:8080/api/lessons/${lessonId}/topics`, { // `https://wbdv-generic-server.herokuapp.com/api/jannunzi/lessons/${lessonId}/topics`
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(topic)
    })
        .then(response =>response.json())


export const findTopicsForLesson = (lessonId) =>
    fetch(`http://localhost:8080/api/lessons/${lessonId}/topics`) // `https://wbdv-generic-server.herokuapp.com/api/jannunzi/lessons/${lessonId}/topics`
        .then(response =>response.json())

// export const findAllModules = () =>
//     fetch("https://wbdv-generic-server.herokuapp.com/api/jannunzi/modules")
//         .then(response =>response.json())

export const updateTopic = async (topicId, topic) =>
{
    const response = await
        fetch(`http://localhost:8080/api/topics/${topicId}`, { // `https://wbdv-generic-server.herokuapp.com/api/jannunzi/topics/${topicId}`
            method: 'PUT',
            body: JSON.stringify(topic),
            headers: {
                'content-type': 'application/json'
            }
        })
    return await response.json()
}

export const deleteTopic = (topicId) =>
    fetch(`http://localhost:8080/api/topics/${topicId}`, { // `https://wbdv-generic-server.herokuapp.com/api/jannunzi/topics/${topicId}`
        method: "DELETE"
    }).then(response => response.json())

export default {
    createTopic: createTopic,
    findTopicsForLesson: findTopicsForLesson,
    updateTopic: updateTopic,
    deleteTopic: deleteTopic

}
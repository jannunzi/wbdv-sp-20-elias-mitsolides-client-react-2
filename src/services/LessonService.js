export const createLesson = (moduleId, lesson) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/jannunzi/modules/${moduleId}/lessons`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(lesson)
    })
        .then(response =>response.json())


export const findLessonsForModule = (moduleId) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/jannunzi/modules/${moduleId}/lessons`)
        .then(response =>response.json())

// export const findAllModules = () =>
//     fetch("https://wbdv-generic-server.herokuapp.com/api/jannunzi/modules")
//         .then(response =>response.json())

export const updateLesson = async (lessonId, lesson) =>
{
    const response = await
        fetch(`https://wbdv-generic-server.herokuapp.com/api/jannunzi/lessons/${lessonId}`, {
            method: 'PUT',
            body: JSON.stringify(lesson),
            headers: {
                'content-type': 'application/json'
            }
        })
    return await response.json()
}

export const deleteLesson = (lessonId) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/jannunzi/lessons/${lessonId}`, {
        method: "DELETE"
    }).then(response => response.json())

export default {
    createLesson: createLesson,
    findLessonsForModule: findLessonsForModule,
    updateLesson: updateLesson,
    deleteLesson: deleteLesson

}